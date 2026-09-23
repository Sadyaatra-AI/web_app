export const STUDIO_CONTENT = {
  hero: {
    eyebrow: 'SADHYAATRA / THE STUDIO',
    title: 'There is more to travel than choosing where to go.',
    intro: 'We believe travel planning shouldn’t be a source of decision fatigue. We are building a single space that handles the complexity of organizing your journey, so you can focus on the experience itself.',
    scrollLabel: 'THE IDEA',
  },
  gap: {
    eyebrow: 'THE GAP',
    subheading: 'Trip planning today is fragmented and draining. Jumping between platforms to book, compare, and manage travel takes away the joy of the journey.',

  },
  building: {
    eyebrow: "WHAT WE'RE BUILDING",
    stages: [
      { number: '01', title: 'DISCOVER', short: 'Find destinations that match your personal pace.', long: 'Instead of generic top-10 lists, we help you discover places based on your mood, travel speed, and budget preferences.', tag: 'PERSONALIZED MATCHING' },
      { number: '02', title: 'UNDERSTAND', short: 'Get context, not just booking links.', long: 'We provide deeper insights into the culture, local vibe, and the realities of a destination so you know what to expect.', tag: 'CURATED INSIGHTS' },
      { number: '03', title: 'CURATE', short: 'Organize everything in one unified portal.', long: 'No more switching between maps, booking sites, and spreadsheets. Plan collaboratively with your group in a single space.', tag: 'SEAMLESS PLANNING' },
      { number: '04', title: 'JOURNEY', short: 'Real-time assistance while you travel.', long: 'Enjoy offline access and continuous support for last-minute changes, ensuring your journey remains uninterrupted.', tag: 'ON-THE-GO SUPPORT' },
    ],
  },
  careers: {
    eyebrow: 'CAREERS',
    title: 'Build journeys worth taking.',
    intro: 'Join us in reshaping how the world travels by creating a seamless, unified, and intentional platform for modern wanderers.',
  },
  final: {
    statement: 'The journey begins long before the destination.',
  },
} as const;

export const FEATURES = [
  { name: 'AI JOURNEY COMPANION', status: 'IN DEVELOPMENT', description: 'Interact with one connected system for discovery, bookings, and navigation.', date: 'LATE 2026', cta: 'Learn more' },
  { name: 'PERSONALISED DISCOVERY', status: 'COMING SOON', description: 'Destinations tailored to your unique travel speed and budget.', date: 'EARLY 2027', cta: 'Explore matching' },
  { name: 'MOOD-BASED EXPLORATION', status: 'READY TO LAUNCH', description: 'Find destinations that match your current emotional state.', date: 'NOW LIVE', cta: 'Try it out' },
  { name: 'CURATED JOURNEYS', status: 'IN DEVELOPMENT', description: 'Actionable itineraries you can follow without starting from scratch.', date: 'MID 2027', cta: 'See preview' },
  { name: 'AGENCY NETWORK', status: 'COMING SOON', description: 'Connect directly with local experts and verified experience providers.', date: 'LATE 2027', cta: 'Join waitlist' },
  { name: 'GROUP PLANNING', status: 'COMING SOON', description: 'Plan together seamlessly without needing external messengers.', date: '2028', cta: 'Discover tools' },
] as const;

export const FOUNDERS = [
  { name: 'anushree balaji', role: 'co-founder & ceo', bio: 'backend developer & ai explorer. turning complex problems into simple, practical systems.', philosophy: 'technology should handle the complexity in the background, so the traveller can focus on the journey.', link: '#' },
  { name: 'Chahak', role: 'co-founder', bio: '', philosophy: '', link: '#' },
] as const;

export const FUTURE_PROSPECTS = [
  { name: 'travel communities', tag: 'find people who travel the way you do', description: 'discover people with similar interests and potentially find companions for your journeys.' },
  { name: 'itinerary sharing', tag: "why keep it to yourself?", description: 'make your itineraries public so others can take inspiration and clone their own version.' },
  { name: 'itinerary marketplace', tag: "your experience can become someone else's next journey", description: 'allow others to purchase your unique, well-planned itineraries.' },
  { name: 'expert marketplace', tag: "discover a place through the people who actually know it", description: 'connect with verified local guides for unconventional activities.' },
  { name: 'real-time assistance', tag: "plans change. your journey shouldn't", description: 'continuously adapt your journey to unexpected changes like weather or delays.' },
  { name: 'personalised companion', tag: 'one place to ask, discover, decide, and act', description: 'a single system for finding places, bookings, navigation, and translation.' },
  { name: 'journey passport', tag: 'every journey becomes part of your travel story', description: 'a personal passport that reflects on where you have been.' },
  { name: 'connected ecosystem', tag: 'sadhyaatra grows with the traveller', description: 'expanding ways to experience travel—before, during, and after.' },
] as const;

export const CAREER_ROLES = [
  // To add a career role, add an object here with the following structure:
  // { title: 'ROLE TITLE', location: 'LOCATION', type: 'TYPE', description: 'DESCRIPTION', requirements: 'REQUIREMENTS', link: '#' }
] as const;
