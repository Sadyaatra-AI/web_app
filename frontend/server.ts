import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import { GoogleGenAI } from '@google/genai';
import {
  getDestinations,
  getDestinationById,
  saveChatMessage,
  savePlanPreview,
  getSavedDestinations,
  toggleSavedDestination,
  seedDatabaseIfEmpty,
} from './src/lib/db';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize seed data on startup
seedDatabaseIfEmpty().catch((err) => console.warn('Seed init warning:', err));

// Lazy-initialized Groq client
let groqClient: Groq | null = null;
function getGroq(): Groq | null {
  if (!groqClient && process.env.GROQ_API_KEY) {
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Sadyaatra' });
});

// GET /api/destinations (supports search, region, mood, type, duration, sortBy)
app.get('/api/destinations', async (req, res) => {
  try {
    const filters = {
      search: req.query.search as string,
      region: req.query.region as any,
      maxBudget: req.query.maxBudget ? Number(req.query.maxBudget) : undefined,
      mood: req.query.mood as string,
      type: req.query.type as string,
      duration: req.query.duration as string,
      sortBy: req.query.sortBy as any,
    };

    const destinations = await getDestinations(filters);
    res.json({ destinations, count: destinations.length });
  } catch (error: any) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
});

// GET /api/destinations/:id
app.get('/api/destinations/:id', async (req, res) => {
  try {
    const dest = await getDestinationById(req.params.id);
    if (!dest) {
      return res.status(404).json({ error: 'Destination not found' });
    }
    res.json(dest);
  } catch (error: any) {
    console.error('Error fetching destination by id:', error);
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
});

// POST /api/chat with Prisma DB message & conversation persistence
app.post('/api/chat', async (req, res) => {
  try {
    const { message, destinationContext, history, visitorId, conversationId } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const currentVisitor = visitorId || 'anonymous_visitor';

    // Save user message to database
    await saveChatMessage({
      visitorId: currentVisitor,
      conversationId,
      role: 'user',
      message,
      metadata: { destinationContext },
    });

    const groq = getGroq();
    const ai = getGenAI();
    let replyText = '';

    const systemInstruction = `You are the Sadyaatra Intelligent Travel Companion — a discerning, culturally attuned, and deeply knowledgeable travel curator.
Tone: Sophisticated, poetic yet grounded, highly practical, and respectful of local traditions.
If destinationContext is provided: Focus specifically on ${destinationContext?.name || 'the destination'} (${destinationContext?.state || ''}, ${destinationContext?.country || ''}).
Provide recommendations including hidden gems, mindful timings (dawn/dusk to avoid crowds), local culinary staples, and realistic budget expectations.
Structure your answers with clean paragraphs and bullet points for readability.`;

    if (groq) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: message },
          ],
          model: 'llama-3.3-70b-versatile',
        });
        replyText = completion.choices[0]?.message?.content || "I apologize, I couldn't generate a response at this moment.";
      } catch (groqErr) {
        console.warn('Groq AI error, attempting fallback:', groqErr);
      }
    }

    if (!replyText && ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] }
          ]
        });
        replyText = response.text || '';
      } catch (geminiErr) {
        console.warn('Gemini AI error, attempting fallback:', geminiErr);
      }
    }

    if (!replyText) {
      // High-quality contextual fallback responses
      const query = message.toLowerCase();

      if (query.includes('itinerary') || query.includes('day') || query.includes('plan')) {
        replyText = `Here is a curated itinerary tailored for **${destinationContext?.name || 'your journey'}**:\n\n` +
          `• **Day 1: Arrival & Grounding** — Settle in, explore local lanes at twilight, and enjoy a slow welcome dinner with local regional delicacies.\n` +
          `• **Day 2: Cultural Immersion & Landmarks** — Dawn start to experience key sanctuaries before the heat and crowds. Afternoon respite at a shaded artisan courtyard.\n` +
          `• **Day 3: Scenic Escapes & Golden Hour** — A gentle hike or boat excursion followed by a panoramic sunset view.\n\n` +
          `*Tip: Would you like me to fine-tune this for a relaxed pace, adventure focus, or culinary journey?*`;
      } else if (query.includes('budget') || query.includes('cost') || query.includes('price')) {
        replyText = `For **${destinationContext?.name || 'this trip'}**, a comfortable 3–4 day trip typically ranges between **${destinationContext?.budgetFormatted || '₹15,000 – ₹25,000 per person'}**.\n\n` +
          `• **Boutique Stay / Heritage Guesthouse:** 50% of budget\n` +
          `• **Dining & Specialties:** 25% of budget\n` +
          `• **Local Transit & Entries:** 25% of budget\n\n` +
          `*Pro-tip: Booking 3 weeks in advance secures the finest heritage homestays at sensible rates.*`;
      } else if (query.includes('eat') || query.includes('food') || query.includes('cafe')) {
        replyText = `Culinary highlights for **${destinationContext?.name || 'this region'}**:\n\n` +
          `• Seek out historic family-run eateries for authentic traditional thalis and breakfast specialties.\n` +
          `• Indulge in sunset herbal teas or filter coffee at scenic rooftop vantage points.\n` +
          `• Sample fresh local seasonal produce and signature street delicacies from verified heritage stalls.`;
      } else {
        replyText = `Greetings! As your **Sadyaatra Curator**, I am here to guide your discovery of **${destinationContext?.name || 'exceptional travel destinations'}**.\n\n` +
          `Feel free to ask me for custom day-by-day itineraries, secluded viewpoints, boutique stay recommendations, seasonal weather insights, or transport routes.`;
      }
    }

    // Save assistant reply to database
    const savedResult = await saveChatMessage({
      visitorId: currentVisitor,
      conversationId,
      role: 'assistant',
      message: replyText,
    });

    return res.json({ reply: replyText, conversationId: savedResult.conversationId });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Failed to process chat query',
      reply: 'I encountered an issue connecting to the travel intelligence service. Please try again in a moment.'
    });
  }
});

// POST /api/quiz-match - saves WebPlanPreview
app.post('/api/quiz-match', async (req, res) => {
  try {
    const { mood, budget, duration, destination, previewData } = req.body;
    const result = await savePlanPreview({
      destination: destination || 'Gokarna',
      travelStyle: mood,
      budget: budget ? parseInt(budget) : 20000,
      previewData: { mood, budget, duration, previewData },
    });
    res.json({ success: true, preview: result });
  } catch (error: any) {
    console.error('Error saving quiz match:', error);
    res.status(500).json({ error: 'Failed to process quiz match' });
  }
});

// GET /api/saved & POST /api/saved/toggle
app.get('/api/saved', (req, res) => {
  res.json({ saved: getSavedDestinations() });
});

app.post('/api/saved/toggle', (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: 'ID is required' });
  const updated = toggleSavedDestination(id);
  res.json({ saved: updated });
});

// Vite middleware in development vs Static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else if (process.env.NODE_ENV === 'production') {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Sadyaatra server listening on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();

