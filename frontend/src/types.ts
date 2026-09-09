export type Region = 'All' | 'North' | 'South' | 'West' | 'East' | 'Central' | 'International';

export type DestinationType =
  | 'Beach'
  | 'Mountains'
  | 'Heritage'
  | 'Nature'
  | 'City'
  | 'Spiritual'
  | 'Adventure'
  | 'Slow Travel'
  | 'Culture'
  | 'Romantic'
  | 'Wellness';

export type TravelMood =
  | 'Slow & Peaceful'
  | 'Nature Escape'
  | 'Adventurous'
  | 'Romantic'
  | 'Cultural'
  | 'Wellness'
  | 'Solo Reflection'
  | 'Social'
  | 'Spiritual'
  | 'Heritage'
  | 'Mountains'
  | 'Beach'
  | 'Contemplative';

export interface AttractionItem {
  id: string;
  name: string;
  description: string;
  image: string;
  tag?: string;
}

export interface BudgetBreakdown {
  stay: { min: number; max: number; label: string };
  food: { min: number; max: number; label: string };
  travel: { min: number; max: number; label: string };
  currency: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  timing: string;
  description: string;
  highlight: string;
  photo?: string;
}

export interface MatchFactor {
  persona: string;
  matchPct: number;
  reason: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  state: string;
  country: string;
  region: Region;
  tag: string;
  heroImage: string;
  secondaryImage?: string;
  galleryImages?: string[];
  coordinates?: { lat: number; lng: number; formatted: string };
  elevation?: string;
  curatorNotes?: string;
  shortDescription: string;
  fullDescription: string;
  destinationTypes: DestinationType[];
  travelMoods: TravelMood[];
  budgetTypical: number;
  budgetFormatted: string;
  idealDuration: string;
  bestTime: string;
  whyGo: string[];
  bestFor: string[];
  itineraryDays?: ItineraryDay[];
  matchFactors?: MatchFactor[];
  attractions: AttractionItem[];
  budgetBreakdown: BudgetBreakdown;
  thingsToSkip: string;
  gettingThere: {
    flight?: string;
    train?: string;
    road?: string;
  };
  knowBeforeYouGo: string[];
  matchScore: number;
  defaultPrompts: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structuredCard?: {
    type: 'itinerary' | 'budget' | 'quick-tip' | 'comparison';
    title: string;
    subtitle?: string;
    duration?: string;
    cost?: string;
    breakdown?: { label: string; value: string }[];
    actions?: { label: string; prompt: string }[];
  };
}

export interface FilterState {
  search: string;
  region: Region;
  maxBudget: number;
  mood: string;
  type: string;
  duration: string;
  sortBy: 'recommended' | 'budget-asc' | 'budget-desc' | 'duration';
}

export interface MatchQuizState {
  mood: string | null;
  budget: string | null;
  duration: string | null;
  completed: boolean;
  score: number;
  reasons: string[];
}
