import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

import {
  saveChatMessage,
} from '@/lib/db';

let groqClient: Groq | null = null;

function getGroq(): Groq | null {
  if (!groqClient && process.env.GROQ_API_KEY) {
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  return groqClient;
}

export async function POST(request: Request) {
  try {
    const {
      message,
      destinationContext,
      history,
      visitorId,
      conversationId,
    } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const currentVisitor = visitorId || 'anonymous_visitor';

    await saveChatMessage({
      visitorId: currentVisitor,
      conversationId,
      role: 'user',
      message,
      metadata: {
        destinationContext,
      },
    });

    const groq = getGroq();

    let replyText = '';

    const systemInstruction = `You are the Sadyaatra Travel Companion — sharp, practical, culturally aware.
STRICT RULES: Keep answers SHORT. Maximum 5 bullet points. No intros, no filler, no long essays. Get straight to the point — like a knowledgeable local friend texting you.
${destinationContext
        ? `Context: ${destinationContext.name}, ${destinationContext.state || ''}, ${destinationContext.country || ''}. Answer ONLY about this place unless asked otherwise.`
        : 'Answer about Indian travel destinations concisely.'}
Use bullet points. Bold key terms. No padding.`;

    if (groq) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: systemInstruction,
            },
            {
              role: 'user',
              content: message,
            },
          ],
          model: 'openai/gpt-oss-120b',
        });

        replyText =
          completion.choices[0]?.message?.content ||
          "I apologize, I couldn't generate a response at this moment.";
      } catch (groqError) {
        console.warn(
          'Groq AI error, attempting fallback:',
          groqError
        );
      }
    }

    if (!replyText) {
      const query = message.toLowerCase();

      if (
        query.includes('itinerary') ||
        query.includes('day') ||
        query.includes('plan')
      ) {
        replyText =
          `Here is a curated itinerary tailored for **${destinationContext?.name || 'your journey'}**:\n\n` +
          `• **Day 1: Arrival & Grounding** — Settle in, explore local lanes at twilight, and enjoy a slow welcome dinner with local regional delicacies.\n` +
          `• **Day 2: Cultural Immersion & Landmarks** — Dawn start to experience key sanctuaries before the heat and crowds. Afternoon respite at a shaded artisan courtyard.\n` +
          `• **Day 3: Scenic Escapes & Golden Hour** — A gentle hike or boat excursion followed by a panoramic sunset view.\n\n` +
          `*Tip: Would you like me to fine-tune this for a relaxed pace, adventure focus, or culinary journey?*`;
      } else if (
        query.includes('budget') ||
        query.includes('cost') ||
        query.includes('price')
      ) {
        replyText =
          `For **${destinationContext?.name || 'this trip'}**, a comfortable 3–4 day trip typically ranges between **${destinationContext?.budgetFormatted || '₹15,000 – ₹25,000 per person'}**.\n\n` +
          `• **Boutique Stay / Heritage Guesthouse:** 50% of budget\n` +
          `• **Dining & Specialties:** 25% of budget\n` +
          `• **Local Transit & Entries:** 25% of budget\n\n` +
          `*Pro-tip: Booking 3 weeks in advance secures the finest heritage homestays at sensible rates.*`;
      } else if (
        query.includes('eat') ||
        query.includes('food') ||
        query.includes('cafe')
      ) {
        replyText =
          `Culinary highlights for **${destinationContext?.name || 'this region'}**:\n\n` +
          `• Seek out historic family-run eateries for authentic traditional thalis and breakfast specialties.\n` +
          `• Indulge in sunset herbal teas or filter coffee at scenic rooftop vantage points.\n` +
          `• Sample fresh local seasonal produce and signature street delicacies from verified heritage stalls.`;
      } else {
        replyText =
          `Greetings! As your **Sadyaatra Curator**, I am here to guide your discovery of **${destinationContext?.name || 'exceptional travel destinations'}**.\n\n` +
          `Feel free to ask me for custom day-by-day itineraries, secluded viewpoints, boutique stay recommendations, seasonal weather insights, or transport routes.`;
      }
    }

    const savedResult = await saveChatMessage({
      visitorId: currentVisitor,
      conversationId,
      role: 'assistant',
      message: replyText,
    });

    return NextResponse.json({
      reply: replyText,
      conversationId: savedResult.conversationId,
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    return NextResponse.json(
      {
        error: 'Failed to process chat query',
        reply:
          'I encountered an issue connecting to the travel intelligence service. Please try again in a moment.',
      },
      { status: 500 }
    );
  }
}
