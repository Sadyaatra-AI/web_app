export const STUDIO_CONTENT = {
  hero: {
    eyebrow: 'SADHYAATRA / THE STUDIO',
    title: 'There is more to travel than choosing where to go.',
    intro: '[ADD INTRODUCTION]',
    scrollLabel: 'THE IDEA',
  },
  gap: {
    eyebrow: 'THE GAP',
    subheading: '[ADD PROBLEM EXPLANATION]',
    centerLabel: 'SADHYAATRA',
    centerText: 'Connecting intention with experience.',
  },
  building: {
    eyebrow: "WHAT WE'RE BUILDING",
    stages: [
      { number: '01', title: 'DISCOVER', short: '[ADD FEATURE DESCRIPTION]', long: '[ADD LONG DESCRIPTION]', tag: '[ADD FEATURE TAG]' },
      { number: '02', title: 'UNDERSTAND', short: '[ADD FEATURE DESCRIPTION]', long: '[ADD LONG DESCRIPTION]', tag: '[ADD FEATURE TAG]' },
      { number: '03', title: 'CURATE', short: '[ADD FEATURE DESCRIPTION]', long: '[ADD LONG DESCRIPTION]', tag: '[ADD FEATURE TAG]' },
      { number: '04', title: 'JOURNEY', short: '[ADD FEATURE DESCRIPTION]', long: '[ADD LONG DESCRIPTION]', tag: '[ADD FEATURE TAG]' },
    ],
  },
  careers: {
    eyebrow: 'CAREERS',
    title: 'Build journeys worth taking.',
    intro: '[ADD CAREERS INTRODUCTION]',
  },
  final: {
    statement: 'The journey begins long before the destination.',
  },
} as const;

export const FEATURES = [
  { name: 'AI JOURNEY COMPANION', status: 'IN DEVELOPMENT', description: '[ADD FEATURE DESCRIPTION]', date: '[ADD LAUNCH DATE]', cta: '[ADD CTA]' },
  { name: 'PERSONALISED DISCOVERY', status: 'COMING SOON', description: '[ADD FEATURE DESCRIPTION]', date: '[ADD LAUNCH DATE]', cta: '[ADD CTA]' },
  { name: 'MOOD-BASED EXPLORATION', status: 'READY TO LAUNCH', description: '[ADD FEATURE DESCRIPTION]', date: '[ADD LAUNCH DATE]', cta: '[ADD CTA]' },
  { name: 'CURATED JOURNEYS', status: 'IN DEVELOPMENT', description: '[ADD FEATURE DESCRIPTION]', date: '[ADD LAUNCH DATE]', cta: '[ADD CTA]' },
  { name: 'AGENCY NETWORK', status: 'COMING SOON', description: '[ADD FEATURE DESCRIPTION]', date: '[ADD LAUNCH DATE]', cta: '[ADD CTA]' },
  { name: '[FEATURE PLACEHOLDER]', status: 'COMING SOON', description: '[ADD FEATURE DESCRIPTION]', date: '[ADD LAUNCH DATE]', cta: '[ADD CTA]' },
] as const;

export const FOUNDERS = [
  { name: '[Founder Name]', role: '[Role]', image: '/images/founders/founder-1.jpg', bio: '[ADD FOUNDER BIO]', philosophy: '[ADD PERSONAL PHILOSOPHY]', link: '#' },
  { name: '[Founder Name]', role: '[Role]', image: '/images/founders/founder-2.jpg', bio: '[ADD FOUNDER BIO]', philosophy: '[ADD PERSONAL PHILOSOPHY]', link: '#' },
  { name: '[Founder Name]', role: '[Role]', image: '/images/founders/founder-3.jpg', bio: '[ADD FOUNDER BIO]', philosophy: '[ADD PERSONAL PHILOSOPHY]', link: '#' },
] as const;

export const ROADMAP = [
  { label: 'NOW', name: '[ROADMAP ITEM]', description: '[ADD ROADMAP DESCRIPTION]', status: 'READY TO LAUNCH', date: '[ADD DATE]', visual: '[ADD VISUAL]' },
  { label: 'NEXT', name: '[ROADMAP ITEM]', description: '[ADD ROADMAP DESCRIPTION]', status: 'COMING SOON', date: '[ADD DATE]', visual: '[ADD VISUAL]' },
  { label: 'EXPLORING', name: '[ROADMAP ITEM]', description: '[ADD ROADMAP DESCRIPTION]', status: 'EXPLORING', date: '[ADD DATE]', visual: '[ADD VISUAL]' },
] as const;

export const CAREER_ROLES = [
  { title: 'PRODUCT DESIGNER', location: '[LOCATION]', type: '[EMPLOYMENT TYPE]', description: '[ADD ROLE DESCRIPTION]', requirements: '[ADD REQUIREMENTS]', link: '#' },
  { title: 'FRONTEND ENGINEER', location: '[LOCATION]', type: '[EMPLOYMENT TYPE]', description: '[ADD ROLE DESCRIPTION]', requirements: '[ADD REQUIREMENTS]', link: '#' },
  { title: 'TRAVEL CURATOR', location: '[LOCATION]', type: '[EMPLOYMENT TYPE]', description: '[ADD ROLE DESCRIPTION]', requirements: '[ADD REQUIREMENTS]', link: '#' },
  { title: '[ROLE PLACEHOLDER]', location: '[LOCATION]', type: '[EMPLOYMENT TYPE]', description: '[ADD ROLE DESCRIPTION]', requirements: '[ADD REQUIREMENTS]', link: '#' },
] as const;
