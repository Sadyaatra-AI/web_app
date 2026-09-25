import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { DESTINATIONS } from '../data/destinations.js';
import { Destination, FilterState } from '../types.js';

let prisma: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prisma) {
    try {
      if (process.env.DATABASE_URL) {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        prisma = new PrismaClient({ adapter });
      } else {
        // Safe mock instantiation when DATABASE_URL is not set
        prisma = new PrismaClient({
          adapter: {
            name: 'mock',
            provider: 'postgres',
            adapterName: 'mock',
            executeRaw: async () => 0,
            queryRaw: async () => ({ rows: [], fields: [] }),
            transactionContext: async () => ({} as any),
          } as any,
        });
      }
    } catch {
      prisma = new PrismaClient({
        adapter: {
          name: 'mock',
          provider: 'postgres',
          adapterName: 'mock',
          executeRaw: async () => 0,
          queryRaw: async () => ({ rows: [], fields: [] }),
          transactionContext: async () => ({} as any),
        } as any,
      });
    }
  }
  return prisma;
}

// In-memory persistent fallback cache in case DB server is not active
const memoryDestinationsStore: Destination[] = [...DESTINATIONS];
const memoryConversationsStore: Map<string, { id: string; visitorId: string; messages: any[] }> = new Map();
const memoryPreviewsStore: any[] = [];
const memorySavedSet: Set<string> = new Set(['gokarna', 'udaipur']);

/**
 * Seeds initial curated destinations into Prisma database if table is empty.
 */
export async function seedDatabaseIfEmpty() {
  try {
    const db = getPrisma();
    const count = await db.destination.count();
    if (count === 0) {
      console.log('Seeding initial destinations into database...');
      for (const d of DESTINATIONS) {
        await db.destination.create({
          data: {
            id: d.id,
            name: d.name,
            country: d.country,
            state: d.state,
            description: d.fullDescription || d.shortDescription,
            latitude: d.coordinates?.lat ?? 20.0,
            longitude: d.coordinates?.lng ?? 78.0,
            averageBudget: d.budgetTypical,
            popularityScore: d.matchScore || 90,
            status: 'active',
            interests: {
              create: d.featureTags?.map((tag) => ({
                interest: tag,
                relevanceScore: 1.0,
              })) || [],
            },
            attractions: {
              create: d.attractions?.map((a) => ({
                name: a.name,
                description: a.description,
                category: a.tag || 'Attraction',
              })) || [],
            },
            media: {
              create: [
                { mediaType: 'hero', objectKey: d.heroImage },
                ...(d.secondaryImage ? [{ mediaType: 'secondary', objectKey: d.secondaryImage }] : []),
              ],
            },
          },
        });
      }
      console.log('Database successfully seeded with destinations!');
    }
  } catch (err) {
    console.warn('Prisma seed fallback (using in-memory data):', (err as Error).message);
  }
}

/**
 * Fetch destinations with filtering and sorting support
 */
export async function getDestinations(filters?: Partial<FilterState>): Promise<Destination[]> {
  try {
    const db = getPrisma();
    const dbDestinations = await db.destination.findMany({
      include: {
        attractions: true,
        localExperiences: true,
        interests: true,
        media: true,
      },
    });

    if (dbDestinations.length > 0) {
      // Map DB schema records back to full frontend Destination interface
      const mapped = dbDestinations.map((dbItem) => {
        const matchingLocal = DESTINATIONS.find((d) => d.id === dbItem.id);
        if (matchingLocal) {
          return matchingLocal;
        }
        const heroMedia = dbItem.media.find((m) => m.mediaType === 'hero')?.objectKey || '';
        const secMedia = dbItem.media.find((m) => m.mediaType === 'secondary')?.objectKey || '';

        return {
          id: dbItem.id,
          name: dbItem.name,
          slug: dbItem.id,
          state: dbItem.state || 'India',
          country: dbItem.country,
          region: 'Central' as const,
          tag: dbItem.description?.slice(0, 30) || 'Destination',
          coordinates: { lat: dbItem.latitude, lng: dbItem.longitude, formatted: `${dbItem.latitude}° N, ${dbItem.longitude}° E` },
          shortDescription: dbItem.description?.slice(0, 120) || '',
          fullDescription: dbItem.description || '',
          destinationTypes: ['Nature', 'Slow Travel'] as any,
          travelMoods: ['Slow & Peaceful', 'Nature Escape'] as any,
          budgetTypical: dbItem.averageBudget || 15000,
          budgetFormatted: `₹${(dbItem.averageBudget || 15000).toLocaleString('en-IN')} / person`,
          idealDuration: '3–4 days',
          bestTime: 'October to March',
          whyGo: [dbItem.description || 'Discover destination beauty'],
          bestFor: ['Nature Lovers', 'Explorers'],
          attractions: dbItem.attractions.map((a) => ({
            id: a.id,
            name: a.name,
            description: a.description || '',
            image: heroMedia,
            tag: a.category || 'Attraction',
          })),
          budgetBreakdown: {
            stay: { min: 4000, max: 8000, label: 'Heritage Stay' },
            food: { min: 2000, max: 4000, label: 'Dining' },
            travel: { min: 2000, max: 4000, label: 'Transit' },
            currency: '₹',
          },
          thingsToSkip: 'Avoid mid-day rush hours.',
          gettingThere: { road: 'Connected by scenic highway.' },
          knowBeforeYouGo: ['Book heritage stays in advance.'],
          matchScore: dbItem.popularityScore,
          defaultPrompts: ['What is the best itinerary here?', 'What are the food highlights?'],
          heroImage: heroMedia || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
          secondaryImage: secMedia,
        };
      });

      return applyFilters(mapped, filters);
    }
  } catch (err) {
    console.warn('Prisma getDestinations query notice:', (err as Error).message);
  }

  return applyFilters(memoryDestinationsStore, filters);
}

function applyFilters(destinations: Destination[], filters?: Partial<FilterState>): Destination[] {
  if (!filters) return destinations;

  return destinations.filter((d) => {
    if (filters.region && filters.region !== 'All' && d.region !== filters.region) {
      return false;
    }
    if (filters.mood && filters.mood !== 'All Moods') {
      const match = d.travelMoods.some((m) =>
        m.toLowerCase().includes((filters.mood || '').toLowerCase()) ||
        (filters.mood || '').toLowerCase().includes(m.toLowerCase())
      );
      if (!match) return false;
    }
    if (filters.type && filters.type !== 'All Types') {
      const match = d.destinationTypes.some((t) =>
        t.toLowerCase().includes((filters.type || '').toLowerCase()) ||
        (filters.type || '').toLowerCase().includes(t.toLowerCase())
      );
      if (!match) return false;
    }
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const match =
        d.name.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.shortDescription.toLowerCase().includes(q) ||
        d.tag.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'budget-asc') return a.budgetTypical - b.budgetTypical;
    if (filters.sortBy === 'budget-desc') return b.budgetTypical - a.budgetTypical;
    return b.matchScore - a.matchScore;
  });
}

/**
 * Get single destination by ID or slug
 */
export async function getDestinationById(id: string): Promise<Destination | null> {
  const all = await getDestinations();
  return all.find((d) => d.id === id || d.slug === id) || null;
}

/**
 * Log or store AI Chat Message and Conversation
 */
export async function saveChatMessage(params: {
  visitorId: string;
  conversationId?: string;
  role: 'user' | 'assistant';
  message: string;
  metadata?: any;
}) {
  const { visitorId, role, message, metadata } = params;
  const conversationId = params.conversationId || `conv_${visitorId}_${Date.now()}`;

  try {
    const db = getPrisma();
    let conv = await db.webChatConversation.findUnique({
      where: { id: conversationId },
    });

    if (!conv) {
      conv = await db.webChatConversation.create({
        data: {
          id: conversationId,
          visitorId,
          status: 'active',
        },
      });
    }

    const msg = await db.webChatMessage.create({
      data: {
        conversationId: conv.id,
        role,
        message,
        metadata: metadata ? JSON.stringify(metadata) : undefined,
      },
    });

    return { conversationId: conv.id, messageId: msg.id };
  } catch (err) {
    // In-memory fallback
    if (!memoryConversationsStore.has(conversationId)) {
      memoryConversationsStore.set(conversationId, { id: conversationId, visitorId, messages: [] });
    }
    const conv = memoryConversationsStore.get(conversationId)!;
    conv.messages.push({ role, message, metadata, timestamp: new Date().toISOString() });
    return { conversationId, messageId: `msg_${Date.now()}` };
  }
}

/**
 * Save Plan Preview / Quiz Match
 */
export async function savePlanPreview(params: {
  conversationId?: string;
  destination: string;
  durationDays?: number;
  budget?: number;
  interests?: string[];
  travelStyle?: string;
  previewData?: any;
}) {
  const conversationId = params.conversationId || `conv_quiz_${Date.now()}`;
  try {
    const db = getPrisma();
    let conv = await db.webChatConversation.findUnique({
      where: { id: conversationId },
    });
    if (!conv) {
      conv = await db.webChatConversation.create({
        data: {
          id: conversationId,
          visitorId: 'quiz_visitor',
          status: 'active',
        },
      });
    }
    const preview = await db.webPlanPreview.create({
      data: {
        conversationId: conv.id,
        destination: params.destination,
        durationDays: params.durationDays,
        budget: params.budget,
        interests: params.interests || [],
        travelStyle: params.travelStyle,
        previewData: params.previewData ? JSON.stringify(params.previewData) : undefined,
      },
    });
    return preview;
  } catch (err) {
    memoryPreviewsStore.push({ conversationId, ...params });
    return { id: `prev_${Date.now()}`, ...params };
  }
}

/**
 * Manage Saved Sanctuaries
 */
export function getSavedDestinations(): string[] {
  return Array.from(memorySavedSet);
}

export function toggleSavedDestination(id: string): string[] {
  if (memorySavedSet.has(id)) {
    memorySavedSet.delete(id);
  } else {
    memorySavedSet.add(id);
  }
  return Array.from(memorySavedSet);
}
