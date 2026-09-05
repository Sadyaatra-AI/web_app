import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'gokarna',
    name: 'Gokarna',
    slug: 'gokarna',
    state: 'Karnataka',
    country: 'India',
    region: 'South',
    tag: 'Coastal Sanctuary',
    coordinates: { lat: 14.5479, lng: 74.3188, formatted: '14.5479° N, 74.3188° E' },
    elevation: '10 m MSL',
    curatorNotes: 'Preserves the rare duality of an ancient Vedic pilgrimage hub alongside tranquil crescent beaches bordered by rocky laterite cliffs.',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Unspoiled palm-fringed cliffside trails meeting the Arabian Sea, where temple chants drift into the ocean breeze.',
    fullDescription: 'Where forested cliffs tumble abruptly into pristine crescent coves, Gokarna remains an unhurried sanctuary on the Konkan coast. Far from the commercial rush of Goa, it preserves a twin soul: an ancient pilgrimage hub sacred to Lord Shiva and a tranquil coastline where time moves with the tide.',
    destinationTypes: ['Beach', 'Spiritual', 'Nature', 'Slow Travel'],
    travelMoods: ['Slow & Peaceful', 'Solo Reflection', 'Wellness'],
    budgetTypical: 12000,
    budgetFormatted: '₹12,000 – ₹18,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'October to March',
    whyGo: [
      'Hike the scenic cliff path connecting Kudle, Om, Half Moon, and Paradise beaches.',
      'Peaceful barefoot evenings watching crimson sunsets over cliffside cafes.',
      'Centuries-old Mahabaleshwar Temple with Dravidian architecture and serene dawn chants.'
    ],
    bestFor: ['Solo Travelers', 'Mindful Couples', 'Budget Explorers', 'Nature Lovers'],
    itineraryDays: [
      {
        day: 1,
        title: 'Arrival & The Golden Hour of Kudle',
        timing: 'Morning to Sunset',
        description: 'Check in to a clifftop eco-cottage. Spend the afternoon resting in hammocks before walking down to Kudle Beach for an unhurried sunset and fresh coastal dinner.',
        highlight: 'Sunset reflection on Kudle Bay waters',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'The Four-Beach Cliff Traverse',
        timing: 'Dawn to Mid-afternoon',
        description: 'Set out at 6:30 AM along the rocky trail from Kudle to Om Beach, past Half Moon cove, reaching secluded Paradise Beach. Return by traditional fishing boat.',
        highlight: 'Panoramic ocean views from Half Moon cliff ridge',
        photo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Vedic Heritage & Yana Caves Excursion',
        timing: 'Full Day',
        description: 'Dawn visit to the ancient Mahabaleshwar Temple sanctum. Take an afternoon scenic drive inland into the Sahyadri rainforest to witness the surreal monolithic black limestone karst formations of Yana.',
        highlight: 'Chambered rock monoliths of Yana surrounded by evergreen canopies'
      },
      {
        day: 4,
        title: 'Slow Morning & Coastal Departure',
        timing: 'Morning',
        description: 'Early morning swim at Main Beach, followed by South Indian filter coffee and Neer Dosa at a quiet local heritage mess before your homeward transit.',
        highlight: 'Quiet morning meditation by the Arabian tide'
      }
    ],
    matchFactors: [
      { persona: 'Solo Contemplative', matchPct: 96, reason: 'Safe, walkable cliff trails, tranquil beach shacks, and zero commercial party noise.' },
      { persona: 'Nature & Coastal Trekker', matchPct: 93, reason: 'Continuous clifftop trail linking 5 pristine coves directly against the sea.' },
      { persona: 'Fast-Paced Luxury Tourist', matchPct: 62, reason: 'Intentionally rustic and unpretentious; limited 5-star hotel chains.' }
    ],
    attractions: [
      {
        id: 'kudle-beach',
        name: 'Kudle Beach & Cliffs',
        description: 'A wide golden-sand bay backed by gentle hills, ideal for morning yoga and evening dining by candlelight.',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        tag: 'Sunset Point'
      },
      {
        id: 'om-beach',
        name: 'Om Beach & Cliff Trail',
        description: 'Naturally shaped like the auspicious Om symbol, featuring dramatic rock formations and secluded coves.',
        image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80',
        tag: 'Coastal Trek'
      },
      {
        id: 'paradise-beach',
        name: 'Paradise Beach',
        description: 'Accessible primarily on foot or by fishing boat, this raw, peaceful cove is pristine and quiet.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        tag: 'Secluded'
      }
    ],
    budgetBreakdown: {
      stay: { min: 3500, max: 8000, label: 'Beach shack / Eco-cottage' },
      food: { min: 2500, max: 4500, label: 'Coastal fish curry, thalis & cafes' },
      travel: { min: 2000, max: 4500, label: 'Overnight train / local auto' },
      currency: 'INR'
    },
    thingsToSkip: 'Avoid visiting during peak monsoon (July–August) when cliff trails become hazardous and beach shacks close.',
    gettingThere: {
      flight: 'Goa Dabolim or MOPA Airport (approx. 3.5 hrs drive / scenic train).',
      train: 'Gokarna Road railway station on the Konkan Railway network.',
      road: 'Well connected via NH66 from Mangalore, Goa, and Bangalore.'
    },
    knowBeforeYouGo: [
      'Cash is still preferred at many remote beach shacks; keep some offline notes.',
      'Bring a small flashlight for evening cliffside walks between beaches.',
      'Modest attire is required when visiting the inner sanctum of Mahabaleshwar Temple.'
    ],
    matchScore: 94,
    defaultPrompts: [
      'Can you craft a 3-day cliff hiking and quiet relaxation itinerary for Gokarna?',
      'What are the best boutique stays or beach shacks overlooking the sea?',
      'How do I travel smoothly from Goa airport to Gokarna by train?'
    ]
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    slug: 'udaipur',
    state: 'Rajasthan',
    country: 'India',
    region: 'West',
    tag: 'The City of Lakes',
    coordinates: { lat: 24.5854, lng: 73.7125, formatted: '24.5854° N, 73.7125° E' },
    elevation: '598 m MSL',
    curatorNotes: 'A sublime convergence of Mewari stone architecture, tranquil lake waters, and dramatic Aravalli mountain backdrops.',
    heroImage: 'https://images.unsplash.com/photo-1609137144822-4916a9bcce15?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1609137144822-4916a9bcce15?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'White marble palaces shimmering upon tranquil lake waters, framed by the oldest fold mountains in India.',
    fullDescription: 'Udaipur is an enduring masterpiece of Mewar royal heritage. Surrounded by the undulating Aravalli range and centered on the mirror-like waters of Lake Pichola, this historic royal capital invites travelers into intricately carved havelis, rooftop courtyards, and artisan alleys.',
    destinationTypes: ['Heritage', 'Culture', 'Romantic', 'City'],
    travelMoods: ['Romantic', 'Cultural', 'Slow & Peaceful'],
    budgetTypical: 22000,
    budgetFormatted: '₹20,000 – ₹35,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'October to March',
    whyGo: [
      'Sunset boat ride on Lake Pichola gliding past Jag Mandir and the Lake Palace.',
      'Explore the multi-level City Palace complex with courtyards and stained-glass alcoves.',
      'Sip spiced Mewari tea atop heritage haveli terraces overlooking the ghats.'
    ],
    bestFor: ['Couples', 'Heritage Enthusiasts', 'Photographers', 'Art Connoisseurs'],
    itineraryDays: [
      {
        day: 1,
        title: 'Old Town Arrival & Ghat Reflections',
        timing: 'Afternoon & Dusk',
        description: 'Settle into a lake-facing heritage haveli. Stroll through the cobblestone lanes of Lal Ghat and witness the evening lamps glowing at Gangaur Ghat.',
        highlight: 'Twilight reflection of palaces on Lake Pichola',
        photo: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'City Palace Citadel & Private Boat Charter',
        timing: 'Full Day',
        description: 'Morning guided tour of the four-century-old City Palace complex before tourist crowds peak. In late afternoon, board a silent wooden boat to Jag Mandir island.',
        highlight: 'Peacock courtyard (Mor Chowk) glass mosaic craft',
        photo: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Monsoon Palace Sunset & Artisan Workshops',
        timing: 'Full Day',
        description: 'Visit miniature painting masters in the old quarters. In the late afternoon, wind up the Aravalli hills to Sajjangarh (Monsoon Palace) for a 360-degree sunset over the desert lakes.',
        highlight: 'Golden sun sinking behind the Aravalli mountain horizon'
      }
    ],
    matchFactors: [
      { persona: 'Romantic & Culturalist', matchPct: 97, reason: 'Exceptional rooftop dining, haveli architecture, and serene boat cruises.' },
      { persona: 'Architecture & History Buff', matchPct: 94, reason: 'Centuries of unbroken Mewari dynasty monuments and artisan heritage.' },
      { persona: 'Extreme High-Altitude Hiker', matchPct: 48, reason: 'Gentle historic hills rather than technical alpine mountaineering.' }
    ],
    attractions: [
      {
        id: 'city-palace',
        name: 'City Palace Complex',
        description: 'A grand four-century-old stone citadel offering breathtaking views of Lake Pichola and the old quarter.',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
        tag: 'Architectural Icon'
      },
      {
        id: 'lake-pichola',
        name: 'Lake Pichola & Ghats',
        description: 'The poetic heart of Udaipur, vibrant during evening aartis at Gangaur Ghat.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tag: 'Boat Cruise'
      },
      {
        id: 'saheliyon-ki-bari',
        name: 'Saheliyon-ki-Bari',
        description: 'Historic royal gardens with lotus pools, marble pavilions, and gentle rain fountains.',
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
        tag: 'Royal Garden'
      }
    ],
    budgetBreakdown: {
      stay: { min: 8000, max: 18000, label: 'Boutique Haveli on Lake Pichola' },
      food: { min: 4000, max: 8000, label: 'Traditional Mewari Dal Baati & rooftop dinners' },
      travel: { min: 3500, max: 7000, label: 'Flight / AC Train & Auto rickshaws' },
      currency: 'INR'
    },
    thingsToSkip: 'Avoid overpriced auto tours that take you to sponsored souvenir shops instead of genuine artisan studios.',
    gettingThere: {
      flight: 'Maharana Pratap Airport (UDR), 22 km from the city center.',
      train: 'Udaipur City Railway Station connected to Delhi, Mumbai, and Jaipur.',
      road: 'Smooth expressways connecting from Ahmedabad, Jodhpur, and Jaipur.'
    },
    knowBeforeYouGo: [
      'Pre-book the sunset boat cruise at City Palace jetty to secure prime golden-hour slots.',
      'Old city streets are very narrow; walking or tuk-tuks are far superior to private cars.'
    ],
    matchScore: 91,
    defaultPrompts: [
      'Plan a 3-day romantic Udaipur itinerary with rooftop dining recommendations.',
      'What are the best authentic textile and miniature painting workshops in Udaipur?',
      'How can I budget for a luxury heritage stay on a reasonable budget?'
    ]
  },
  {
    id: 'spiti-valley',
    name: 'Spiti Valley',
    slug: 'spiti-valley',
    state: 'Himachal Pradesh',
    country: 'India',
    region: 'North',
    tag: 'The Middle Land',
    coordinates: { lat: 32.2461, lng: 78.0349, formatted: '32.2461° N, 78.0349° E' },
    elevation: '3,800 m MSL',
    curatorNotes: 'A transcendent high-altitude cold desert offering cosmic night skies, fossil hamlets, and 1,000-year-old Buddhist monasteries.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Cold mountain desert with cliffside Tibetan monasteries, fossil villages, and cosmic starry skies.',
    fullDescription: 'Sandwiched between Tibet and India, Spiti is a rugged, barren high-altitude wonderland of stark beauty. Perched above 3,500 meters, this remote trans-Himalayan valley is home to thousand-year-old Buddhist monasteries, warm homestays, and some of the clearest night skies on Earth.',
    destinationTypes: ['Mountains', 'Adventure', 'Spiritual', 'Slow Travel'],
    travelMoods: ['Adventurous', 'Solo Reflection', 'Cultural'],
    budgetTypical: 26000,
    budgetFormatted: '₹22,000 – ₹38,000 / person',
    idealDuration: '7–9 days',
    bestTime: 'June to September',
    whyGo: [
      'Visit Key Monastery, a thousand-year-old fortress of peace perched on a conical hill.',
      'Stargazing and Milky Way astrophotography from Langza, the village of prehistoric fossils.',
      'Send a postcard from Hikkim, the world’s highest operational post office at 14,567 ft.'
    ],
    bestFor: ['Adventure Seekers', 'Road Trippers', 'Photographers', 'Offbeat Explorers'],
    itineraryDays: [
      {
        day: 1,
        title: 'Shimla to Kalpa: Acclimatization Gateway',
        timing: 'Full Day Drive',
        description: 'Drive along the dramatic Hindustan-Tibet Highway through Kinnaur gorge, resting in Kalpa with sweeping views of the sacred Kinner Kailash range.',
        highlight: 'Kinnaur Cliff road cutting through rock overhangs'
      },
      {
        day: 2,
        title: 'Nako Lake to Tabo Monastery (996 AD)',
        timing: 'Full Day',
        description: 'Cross into Spiti territory. Visit the serene high lake at Nako and explore the mud monastery of Tabo, often called the Ajanta of the Himalayas.',
        highlight: 'Ancient thousand-year stucco statues in Tabo sanctum'
      },
      {
        day: 3,
        title: 'Dhankar Cliff Gompa & Arrival in Kaza',
        timing: 'Full Day',
        description: 'Hike up to the dramatically balanced Dhankar Monastery above the confluence of the Spiti and Pin rivers before arriving in Kaza base.',
        highlight: 'Precipitous perch of Dhankar fort over the canyon'
      },
      {
        day: 4,
        title: 'Highest Villages Circuit: Langza, Komic & Hikkim',
        timing: 'Full Day',
        description: 'Discover Langza with its giant golden Buddha statue, visit Komic (highest motorable village), and mail hand-written postcards from Hikkim post office.',
        highlight: 'Unobstructed Milky Way arches over Langza Buddha statue'
      },
      {
        day: 5,
        title: 'Key Gompa & Crescent Waters of Chandra Taal',
        timing: 'Full Day',
        description: 'Morning prayer chants at Key Monastery. Cross the 14,931 ft Kunzum Pass to pitch camp near the crystalline moon-lake of Chandra Taal.',
        highlight: 'Turquoise reflections of snow peaks in Chandra Taal'
      }
    ],
    matchFactors: [
      { persona: 'Rugged Explorer & Astrophotographer', matchPct: 98, reason: 'Zero light pollution, extreme Himalayan geography, and rare Tibetan culture.' },
      { persona: 'Solo Soul Seeker', matchPct: 94, reason: 'Unplugged high-desert solitude with deeply hospitable local homestays.' },
      { persona: 'Short Weekend Leisure Traveler', matchPct: 35, reason: 'Requires minimum 7 days due to high altitude acclimatization and road distances.' }
    ],
    attractions: [
      {
        id: 'key-monastery',
        name: 'Key Gompa',
        description: 'Iconic Tibetan Buddhist monastery overlooking the winding Spiti River.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: '11th-Century Monastery'
      },
      {
        id: 'chandratal',
        name: 'Chandra Taal (Moon Lake)',
        description: 'A crescent-shaped alpine lake that dramatically shifts colors from turquoise to deep navy.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        tag: 'High Altitude Lake'
      }
    ],
    budgetBreakdown: {
      stay: { min: 7000, max: 14000, label: 'Traditional mud homestays & glamping' },
      food: { min: 4000, max: 8000, label: 'Tibetan thukpa, momos & local barley bread' },
      travel: { min: 11000, max: 18000, label: 'Dedicated 4x4 SUV / High clearance vehicle' },
      currency: 'INR'
    },
    thingsToSkip: 'Never rush your ascent; avoid speeding through Rohtang or Kunzum without proper acclimatization.',
    gettingThere: {
      flight: 'Bhuntar Airport (Kullu) or Chandigarh Airport.',
      train: 'Shimla or Chandigarh Railway Station.',
      road: 'Via Shimla-Kinnaur route (open year-round) or Manali-Kaza route (open summer only).'
    },
    knowBeforeYouGo: [
      'Acclimatize for at least 48 hours at mid-altitudes to avoid acute mountain sickness.',
      'BSNL / Jio postpaid are the only networks with intermittent connectivity.'
    ],
    matchScore: 88,
    defaultPrompts: [
      'Help me map an optimal 8-day Spiti circuit starting from Shimla.',
      'What are the essential health and packing tips for high-altitude Spiti?',
      'Can you explain the difference between the Shimla and Manali routes?'
    ]
  },
  {
    id: 'munnar',
    name: 'Munnar',
    slug: 'munnar',
    state: 'Kerala',
    country: 'India',
    region: 'South',
    tag: 'Emerald Hills of Western Ghats',
    coordinates: { lat: 10.0889, lng: 77.0595, formatted: '10.0889° N, 77.0595° E' },
    elevation: '1,600 m MSL',
    curatorNotes: 'Contoured velvet tea hills, mountain mist ribbons, and endemic biodiversity including the Nilgiri Tahr and wild cardamom.',
    heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Rolling carpet of misty tea plantations, spice-scented valleys, and cool mountain peaks.',
    fullDescription: 'Perched at 1,600 meters above sea level in Kerala’s Western Ghats, Munnar was once the summer resort of the British administration. Today, endless rolling hills of manicured tea bushes glisten under morning mist, accompanied by the fragrance of cardamom, cloves, and wild eucalyptus.',
    destinationTypes: ['Mountains', 'Nature', 'Slow Travel', 'Wellness'],
    travelMoods: ['Slow & Peaceful', 'Romantic', 'Wellness'],
    budgetTypical: 16000,
    budgetFormatted: '₹14,000 – ₹24,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'September to March',
    whyGo: [
      'Wander through organic tea gardens with views across misty mountain ridges.',
      'Spot the endangered Nilgiri Tahr at Eravikulam National Park.',
      'Stay in plantation estate bungalows with fresh locally sourced Kerala cuisine.'
    ],
    bestFor: ['Nature Enthusiasts', 'Couples', 'Tea Lovers', 'Peace Seekers'],
    itineraryDays: [
      {
        day: 1,
        title: 'Plantation Check-in & Old Munnar Town',
        timing: 'Afternoon',
        description: 'Arrive via the scenic Cheeyappara waterfalls route. Unpack at a private plantation bungalow surrounded by cardamom groves.',
        highlight: 'Fresh evening tea brewed from estate leaves'
      },
      {
        day: 2,
        title: 'Sunrise at Kolukkumalai & World Record Tea Ridge',
        timing: 'Dawn (4:30 AM)',
        description: 'Take a rugged 4x4 jeep up to Kolukkumalai, the highest organic tea estate in the world at 7,900 ft. Watch the sea of clouds unfold beneath the peaks.',
        highlight: 'Sea of clouds sunrise piercing the Western Ghats'
      },
      {
        day: 3,
        title: 'Eravikulam Wilderness & Spice Garden Trail',
        timing: 'Morning to Afternoon',
        description: 'Explore the high-altitude grasslands of Eravikulam National Park, home to the Nilgiri Tahr, followed by an aromatic tour of an organic spice farm.',
        highlight: 'Spotting the Nilgiri Tahr against mountain cliffs'
      }
    ],
    matchFactors: [
      { persona: 'Mindful Couple / Relaxer', matchPct: 95, reason: 'Cool mountain air, private veranda stays, and tranquil tea estate scenery.' },
      { persona: 'Botanical & Wildlife Naturalist', matchPct: 91, reason: 'High endemic biodiversity of the UNESCO Western Ghats hotspot.' }
    ],
    attractions: [
      {
        id: 'kolukkumalai',
        name: 'Kolukkumalai Tea Estate',
        description: 'The highest organic tea plantation in the world, famed for dramatic sunrise clouds.',
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
        tag: 'World Record'
      },
      {
        id: 'eravikulam',
        name: 'Eravikulam National Park',
        description: 'Sanctuary for the rare Nilgiri Tahr and home to Anamudi, the highest peak in South India.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'Wildlife Habitat'
      }
    ],
    budgetBreakdown: {
      stay: { min: 5000, max: 12000, label: 'Plantation Bungalow / Eco Resort' },
      food: { min: 3000, max: 6000, label: 'Appam, stew, and traditional banana leaf thalis' },
      travel: { min: 3500, max: 6000, label: 'Cochin taxi / KSRTC scenic bus' },
      currency: 'INR'
    },
    thingsToSkip: 'Skip the generic commercial boating points during peak noon hours when queues are long.',
    gettingThere: {
      flight: 'Cochin International Airport (COK), approx. 3.5 hrs scenic drive.',
      train: 'Aluva or Ernakulam Junction Railway Station.',
      road: 'Scenic ghat roads with cascading waterfalls along the route.'
    },
    knowBeforeYouGo: [
      'Pack warm layers, as evening temperatures can drop noticeably in the hills.',
      'Book Kolukkumalai 4x4 sunrise jeep permits one day in advance.'
    ],
    matchScore: 89,
    defaultPrompts: [
      'What is the best route for a sunrise trip to Kolukkumalai Tea Estate?',
      'Recommend plantation stays with private verandas in Munnar.',
      'How many days are needed to combine Munnar and Alleppey backwaters?'
    ]
  },
  {
    id: 'hampi',
    name: 'Hampi',
    slug: 'hampi',
    state: 'Karnataka',
    country: 'India',
    region: 'South',
    tag: 'City of Ruins & Granite Boulders',
    coordinates: { lat: 15.3350, lng: 76.4600, formatted: '15.3350° N, 76.4600° E' },
    elevation: '467 m MSL',
    curatorNotes: 'Surreal monolithic boulders balancing across riverside landscapes, preserving the monumental UNESCO ruins of the Vijayanagara Empire.',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f443834f?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600100397608-f010f443834f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Surreal granite boulder landscapes sheltering the UNESCO World Heritage ruins of the Vijayanagara Empire.',
    fullDescription: 'Scattered across a surreal boulder-strewn moonscape beside the Tungabhadra River, Hampi was once the thriving capital of the Vijayanagara Empire in the 14th century. Today, majestic temple towers, stone royal baths, and musical pillars sit in harmonious balance with unhurried bohemian riverside life.',
    destinationTypes: ['Heritage', 'Culture', 'Nature', 'Adventure'],
    travelMoods: ['Cultural', 'Slow & Peaceful', 'Solo Reflection'],
    budgetTypical: 13000,
    budgetFormatted: '₹11,000 – ₹17,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'October to February',
    whyGo: [
      'Cycle through the ruins of Virupaksha Temple, Lotus Mahal, and the iconic Stone Chariot.',
      'Watch sunset atop Matanga Hill offering a 360-degree vista over the ancient city.',
      'Cross the river on a traditional circular coracle boat.'
    ],
    bestFor: ['History Buffs', 'Backpackers', 'Photographers', 'Cyclists'],
    itineraryDays: [
      {
        day: 1,
        title: 'Sacred Centre & Virupaksha Dawn',
        timing: 'Morning to Sunset',
        description: 'Begin at the active 7th-century Virupaksha Temple. Explore the Hemakuta Hill cluster of shrines and climb Matanga Hill for a golden-amber sunset.',
        highlight: 'Matanga Hill sunset over the boulder horizon'
      },
      {
        day: 2,
        title: 'The Royal Enclosure & Stone Chariot of Vittala',
        timing: 'Full Day',
        description: 'Rent a bicycle to explore the Lotus Mahal, Elephant Stables, Queen’s Bath, and the musical stone pillars of the iconic Vijaya Vittala temple complex.',
        highlight: 'Intricately carved monolithic stone chariot'
      },
      {
        day: 3,
        title: 'Anegundi & Sanapur Lake Coracle Ride',
        timing: 'Full Day',
        description: 'Cross the Tungabhadra river to the peaceful Anegundi side. Ride circular coracle boats across Sanapur Lake surrounded by balancing granite boulders.',
        highlight: 'Floating peacefully on Sanapur Lake beneath stone hills'
      }
    ],
    matchFactors: [
      { persona: 'Historical & Architectural Explorer', matchPct: 97, reason: 'One of the world’s largest open-air historic archaeological sites.' },
      { persona: 'Free-Spirited Cyclist / Backpacker', matchPct: 92, reason: 'Easy cycling trails, scenic river crossings, and laid-back cafes.' }
    ],
    attractions: [
      {
        id: 'virupaksha',
        name: 'Virupaksha Temple',
        description: 'An active, continuously worshiped 7th-century Dravidian temple complex.',
        image: 'https://images.unsplash.com/photo-1600100397608-f010f443834f?auto=format&fit=crop&w=800&q=80',
        tag: 'UNESCO Monument'
      },
      {
        id: 'matanga-hill',
        name: 'Matanga Hill Sunset',
        description: 'The highest point in central Hampi with panoramic vistas over the boulder valleys.',
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
        tag: 'Panoramic Sunset'
      }
    ],
    budgetBreakdown: {
      stay: { min: 3500, max: 7500, label: 'Heritage guesthouse or riverside retreat' },
      food: { min: 2500, max: 4500, label: 'South Indian banana leaf meals & woodfired pizza' },
      travel: { min: 2500, max: 5000, label: 'Hampi Express train & rented bicycles/mopeds' },
      currency: 'INR'
    },
    thingsToSkip: 'Avoid exploring the unshaded ruins during mid-afternoon heat; schedule site visits for dawn and late afternoon.',
    gettingThere: {
      flight: 'Jindal Vijayanagar Airport (VDY) or Hubli Airport.',
      train: 'Hospet Junction Railway Station (13 km away).',
      road: 'Overnight luxury buses directly from Bangalore, Goa, and Hyderabad.'
    },
    knowBeforeYouGo: [
      'Rent a bicycle or electric scooter to explore the vast 25 sq. km ruins at your own pace.',
      'Carry refillable water bottles and sun protection.'
    ],
    matchScore: 90,
    defaultPrompts: [
      'Create a 3-day cycling itinerary covering both the sacred and royal centers in Hampi.',
      'Where are the best spots to watch sunrise and sunset in Hampi?',
      'What are the travel logistics for getting from Bangalore to Hampi?'
    ]
  },
  {
    id: 'ziro-valley',
    name: 'Ziro Valley',
    slug: 'ziro-valley',
    state: 'Arunachal Pradesh',
    country: 'India',
    region: 'East',
    tag: 'Pine Valleys of the Apatani',
    coordinates: { lat: 27.5450, lng: 93.8340, formatted: '27.5450° N, 93.8340° E' },
    elevation: '1,500 m MSL',
    curatorNotes: 'A UNESCO-tentative valley renowned for the indigenous Apatani sustainable paddy-cum-pisciculture farming and bamboo architecture.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Gentle green pine hills cradling the unique sustainable rice-fish culture of the indigenous Apatani tribe.',
    fullDescription: 'Tucked away in the gentle hills of Lower Subansiri in Arunachal Pradesh, Ziro is a plateau of rare ecological grace. The indigenous Apatani people have sustained an ancient organic paddy-cum-pisciculture farming system without machinery or synthetic fertilizers for generations, creating an idyllic visual harmony of tiered fields and pine forests.',
    destinationTypes: ['Culture', 'Nature', 'Slow Travel', 'Heritage'],
    travelMoods: ['Cultural', 'Slow & Peaceful', 'Solo Reflection'],
    budgetTypical: 18000,
    budgetFormatted: '₹16,000 – ₹26,000 / person',
    idealDuration: '4–5 days',
    bestTime: 'March to October',
    whyGo: [
      'Walk through Hong and Hari villages to learn indigenous Apatani bamboo architecture and traditions.',
      'Trek through the pine-scented trails of Talley Valley Wildlife Sanctuary.',
      'Sip local organic millet beverage (Apong) by woodfire hearths in traditional homestays.'
    ],
    bestFor: ['Cultural Anthropologists', 'Slow Explorers', 'Eco-Travelers', 'Photographers'],
    itineraryDays: [
      {
        day: 1,
        title: 'Guwahati to Ziro via Naharlagun',
        timing: 'Full Day Transit',
        description: 'Take the scenic Donyi Polo express to Naharlagun followed by an uphill drive through mist-shrouded rainforest into Ziro plateau.',
        highlight: 'Emerging into the wide, emerald Apatani plateau'
      },
      {
        day: 2,
        title: 'Apatani Heritage Villages: Hong & Hari',
        timing: 'Full Day',
        description: 'Slow walking tour of Hong (one of Asia’s largest traditional villages), observing the intricate sustainable canal irrigation networks.',
        highlight: 'Intricate bamboo fencing and sacred Lapang community platforms'
      },
      {
        day: 3,
        title: 'Talley Valley Rainforest Trek',
        timing: 'Full Day',
        description: 'Guided nature walk into the sub-tropical and temperate cloud forests of Talley Valley, home to rare giant bamboo and clouded leopards.',
        highlight: 'Walking under moss-covered giant oak canopies'
      }
    ],
    matchFactors: [
      { persona: 'Indigenous Culture & Anthropologist', matchPct: 97, reason: 'Living, untouched Apatani ecological traditions and welcoming homestays.' },
      { persona: 'Commercial Luxury Vacationer', matchPct: 50, reason: 'Requires Inner Line Permits (ILP) and offers authentic homestays rather than resort chains.' }
    ],
    attractions: [
      {
        id: 'hong-village',
        name: 'Hong & Hari Villages',
        description: 'Traditional Apatani settlement with stilt houses and ancient communal wood platforms.',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        tag: 'Cultural Heritage'
      }
    ],
    budgetBreakdown: {
      stay: { min: 4500, max: 9000, label: 'Traditional Apatani bamboo homestay' },
      food: { min: 2500, max: 5000, label: 'Organic smoked bamboo shoot dishes, herbs & rice' },
      travel: { min: 5000, max: 9000, label: 'ILP permit fees & shared/private hill cab' },
      currency: 'INR'
    },
    thingsToSkip: 'Avoid photographing village elders without asking for polite permission first.',
    gettingThere: {
      flight: 'Hollongi (Donyi Polo) Airport, Itanagar (approx. 3.5 hrs drive) or Guwahati.',
      train: 'Naharlagun Railway Station (approx. 3 hrs drive to Ziro).',
      road: 'Scenic mountain highways from Assam border.'
    },
    knowBeforeYouGo: [
      'An Inner Line Permit (ILP) is mandatory for Indian travelers; PAP for foreign nationals.',
      'Warm woolens are essential even during summer evenings.'
    ],
    matchScore: 92,
    defaultPrompts: [
      'How do I obtain the Inner Line Permit for visiting Ziro Valley?',
      'What is the best month to experience the green vs golden rice harvesting seasons?',
      'Recommend authentic Apatani homestays in Hong village.'
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    slug: 'varanasi',
    state: 'Uttar Pradesh',
    country: 'India',
    region: 'North',
    tag: 'The Eternal City of Light',
    coordinates: { lat: 25.3176, lng: 82.9739, formatted: '25.3176° N, 82.9739° E' },
    elevation: '80 m MSL',
    curatorNotes: 'Continuously inhabited for over 3,000 years along the sacred crescent curve of the Ganges River.',
    heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Ancient stone ghats illuminated by brass oil lamps along the sacred crescent curve of the Mother Ganga.',
    fullDescription: 'One of the oldest continuously inhabited cities in human history, Varanasi is the spiritual core of India. Along its iconic stone ghats overlooking the sacred Ganges, life and eternity dance in timeless rhythm—from dawn rowboat chants through morning mist to the resplendent evening Maha Aarti.',
    destinationTypes: ['Spiritual', 'Heritage', 'Culture'],
    travelMoods: ['Cultural', 'Solo Reflection', 'Spiritual'],
    budgetTypical: 15000,
    budgetFormatted: '₹12,000 – ₹22,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'October to March',
    whyGo: [
      'Silent dawn boat ride along Dashashwamedh, Assi, and Manikarnika ghats.',
      'Evening Ganga Aarti with brass tiered lamps, incense, and Vedic chanting.',
      'Wander through ancient medieval alleys (galis) tasting Banarasi lassi, paan, and silk weaves.'
    ],
    bestFor: ['Spiritual Seekers', 'Photographers', 'Writers & Philosophers', 'Culture Explorers'],
    itineraryDays: [
      {
        day: 1,
        title: 'Assi Ghat Welcome & Evening Maha Aarti',
        timing: 'Afternoon to Dusk',
        description: 'Settle into a heritage riverfront haveli. At dusk, take a position on the stone steps of Dashashwamedh Ghat for the synchronized Vedic Maha Aarti ceremony.',
        highlight: 'Clamour of conch shells and sacred fires glowing on the river'
      },
      {
        day: 2,
        title: 'Dawn Subah-e-Banaras & Gali Exploration',
        timing: 'Dawn (5:30 AM)',
        description: 'Row across the mist-covered Ganges at sunrise. Spend the afternoon exploring ancient silk weaving quarters, historic music schools, and the Kashi Vishwanath corridor.',
        highlight: 'Morning sun casting golden light over the riverside palatial ghats'
      },
      {
        day: 3,
        title: 'Sarnath Excursion (The First Sermon)',
        timing: 'Half Day',
        description: 'Drive 10 km to Sarnath, where Lord Buddha gave his first sermon at the Deer Park. Visit the Dhamek Stupa and the ancient Ashokan lion capital.',
        highlight: 'Ancient brick Dhamek Stupa radiating quiet peace'
      }
    ],
    matchFactors: [
      { persona: 'Spiritual & Philosophical Seeker', matchPct: 99, reason: 'Unmatched intensity of sacred ritual, music, and ancient philosophy.' },
      { persona: 'Street & Documentary Photographer', matchPct: 96, reason: 'Incredible texture of light, stone ghats, mist, and vibrant devotion.' }
    ],
    attractions: [
      {
        id: 'dashashwamedh',
        name: 'Dashashwamedh Ghat & Aarti',
        description: 'The main vibrant ghat where the daily world-renowned twilight Aarti takes place.',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        tag: 'Sacred Ritual'
      }
    ],
    budgetBreakdown: {
      stay: { min: 4000, max: 10000, label: 'Riverside Heritage Haveli / Ashram' },
      food: { min: 2000, max: 4000, label: 'Banarasi Kachori-Jalebi, Malaiyyo & street chaat' },
      travel: { min: 2500, max: 5000, label: 'Vande Bharat train / Airport taxi & boat charters' },
      currency: 'INR'
    },
    thingsToSkip: 'Avoid aggressive touts offering unauthorized boat rides; negotiate directly at recognized government ghat kiosks.',
    gettingThere: {
      flight: 'Lal Bahadur Shastri Airport (VNS), 25 km away.',
      train: 'Varanasi Junction (BSB) / Banaras (BSBS) / Pt. Deen Dayal Upadhyaya Junction.',
      road: 'Connected via NH19 from Delhi, Kolkata, and Lucknow.'
    },
    knowBeforeYouGo: [
      'Dawn (5:30 AM) is the most peaceful time to experience the river before ambient city noise begins.',
      'Dress modestly with shoulders and knees covered when exploring temple zones.'
    ],
    matchScore: 93,
    defaultPrompts: [
      'How do I arrange a quiet dawn boat ride on the Ganges in Varanasi?',
      'What are the culinary breakfast secrets in the ancient galis of Varanasi?',
      'Can you recommend a 3-day itinerary blending spirituality and photography?'
    ]
  },
  {
    id: 'tirthan-valley',
    name: 'Tirthan Valley',
    slug: 'tirthan-valley',
    state: 'Himachal Pradesh',
    country: 'India',
    region: 'North',
    tag: 'The Gateway to Great Himalayan National Park',
    coordinates: { lat: 31.6420, lng: 77.3480, formatted: '31.6420° N, 77.3480° E' },
    elevation: '1,600 m MSL',
    curatorNotes: 'A pristine Himalayan river sanctuary preserving untouched deodar forests, traditional Kath-Kuni woodcraft, and wild trout streams.',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Babbling glacial rivers flowing through dense deodar forests, wooden hamlets, and alpine meadows.',
    fullDescription: 'Located at the threshold of the UNESCO World Heritage Great Himalayan National Park, Tirthan Valley remains one of the quietest havens in the Himalayas. With crystalline waters teeming with trout, fragrant apple orchards, and traditional stone-and-timber Kath-Kuni chalets, it is a haven for slow living.',
    destinationTypes: ['Mountains', 'Nature', 'Slow Travel', 'Wellness'],
    travelMoods: ['Slow & Peaceful', 'Wellness', 'Solo Reflection'],
    budgetTypical: 15000,
    budgetFormatted: '₹13,000 – ₹20,000 / person',
    idealDuration: '3–5 days',
    bestTime: 'March to June & September to November',
    whyGo: [
      'Trek into the buffer zone of the Great Himalayan National Park to pristine forest waterfalls.',
      'Stay in handcrafted wooden cottages directly on the banks of the rushing Tirthan River.',
      'Hike up to the ancient Chehni Kothi, an extraordinary 1,500-year-old wooden fortress tower.'
    ],
    bestFor: ['Nature Lovers', 'Solo Seekers', 'Couples', 'Anglers & Birdwatchers'],
    itineraryDays: [
      {
        day: 1,
        title: 'Riverside Arrival & Pine Orchard Walk',
        timing: 'Afternoon',
        description: 'Arrive at your wooden riverside homestay in Gushaini. Listen to the river lullaby while walking through surrounding apple orchards.',
        highlight: 'Sunset tea by the crystal glacial waters of Tirthan'
      },
      {
        day: 2,
        title: 'Great Himalayan National Park Waterfall Trail',
        timing: 'Full Day',
        description: 'Gentle 8 km day hike along the river into the GHNP buffer zone, passing traditional slate-roof hamlets to a hidden forest waterfall.',
        highlight: 'Deep deodar forest scents and crystal mountain springs'
      },
      {
        day: 3,
        title: 'Chehni Kothi Ancient Wood Tower & Serolsar Lake',
        timing: 'Full Day',
        description: 'Hike to the towering Chehni Kothi stone-timber structure, followed by a scenic drive to Jalori Pass (10,800 ft) and a forest walk to sacred Serolsar Lake.',
        highlight: 'Panoramic Himalayan peaks viewed from Jalori Pass'
      }
    ],
    matchFactors: [
      { persona: 'Peace & Mindfulness Seeker', matchPct: 98, reason: 'Zero commercial congestion, pure mountain air, and restorative river sounds.' },
      { persona: 'Forest Trekker & Birdwatcher', matchPct: 94, reason: 'Direct access to UNESCO Great Himalayan National Park trails.' }
    ],
    attractions: [
      {
        id: 'ghnp-trail',
        name: 'Great Himalayan National Park Buffer Trail',
        description: 'Pristine oak and cedar forests with crystal clear stream crossings.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        tag: 'UNESCO Nature'
      }
    ],
    budgetBreakdown: {
      stay: { min: 4000, max: 8500, label: 'Riverside wood cottage / orchard homestay' },
      food: { min: 2500, max: 4500, label: 'Himachali Siddu, fresh trout & home-cooked meals' },
      travel: { min: 3500, max: 6000, label: 'Volvo bus to Aut tunnel + local private taxi' },
      currency: 'INR'
    },
    thingsToSkip: 'Do not attempt driving through Jalori Pass during heavy winter snowfall without 4x4 chains.',
    gettingThere: {
      flight: 'Bhuntar Airport (Kullu), 50 km away.',
      train: 'Chandigarh Railway Station, followed by scenic road drive.',
      road: 'Overnight luxury Volvo buses from Delhi to Aut tunnel, then 1 hr local taxi to Gushaini.'
    },
    knowBeforeYouGo: [
      'Carry adequate cash as ATMs are located 15 km away in Banjar market.',
      'Wear sturdy waterproof hiking shoes for forest trails and stream banks.'
    ],
    matchScore: 95,
    defaultPrompts: [
      'How to plan a 4-day slow living retreat in Tirthan Valley?',
      'What is the trail difficulty for reaching Serolsar Lake from Jalori Pass?',
      'Which riverside cottages offer reliable Wi-Fi for remote work?'
    ]
  },
  {
    id: 'pondicherry',
    name: 'Pondicherry (Puducherry)',
    slug: 'pondicherry',
    state: 'Puducherry',
    country: 'India',
    region: 'South',
    tag: 'French Colonial Coast & Auroville',
    coordinates: { lat: 11.9416, lng: 79.8083, formatted: '11.9416° N, 79.8083° E' },
    elevation: '3 m MSL',
    curatorNotes: 'A poetic blend of mustard-yellow French colonial architecture, Tamil maritime quarters, and spiritual consciousness.',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Mustard-yellow French colonial villas, bougainvillea-draped balconies, and peaceful spiritual communities.',
    fullDescription: 'Where French colonial elegance gracefully meets the vibrant coastal soul of Tamil Nadu, Pondicherry is a sensory delight. Walk along cobblestone avenues lined with 18th-century mansions in White Town, savor freshly baked croissants and artisanal sourdough, and discover the experimental spiritual vision of Auroville.',
    destinationTypes: ['Heritage', 'Culture', 'Beach', 'Slow Travel', 'Wellness'],
    travelMoods: ['Slow & Peaceful', 'Romantic', 'Cultural'],
    budgetTypical: 14000,
    budgetFormatted: '₹12,000 – ₹20,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'October to March',
    whyGo: [
      'Cycle through the historic French Quarter (White Town) under shaded bougainvillea arches.',
      'Meditate in the silence of the Matrimandir golden sphere in Auroville.',
      'Evening seaside promenade along Goubert Avenue, closed to motor vehicles at dusk.'
    ],
    bestFor: ['Couples', 'Solo Seekers', 'Architecture Aficionados', 'Foodies & Cafe Lovers'],
    itineraryDays: [
      {
        day: 1,
        title: 'White Town Heritage Stroll & Seaside Promenade',
        timing: 'Afternoon to Night',
        description: 'Check into a boutique French colonial mansion. Stroll down Rue Dumas, visit Sri Aurobindo Ashram, and enjoy the car-free evening ocean breeze on Promenade Beach.',
        highlight: 'Sunset glow over the rocky Bay of Bengal coastline'
      },
      {
        day: 2,
        title: 'Auroville & Matrimandir Contemplation',
        timing: 'Full Day',
        description: 'Spend the day in the experimental universal township of Auroville. Visit the Visitor’s Pavilion, organic solar kitchens, and sit in silence near the Matrimandir.',
        highlight: 'The golden disc sphere of Matrimandir surrounded by amphitheatre gardens'
      },
      {
        day: 3,
        title: 'Tamil Quarter Heritage & Serenity Beach Surf',
        timing: 'Morning to Afternoon',
        description: 'Discover the distinct verandah architecture of the Tamil Quarter. In the afternoon, head to Serenity Beach for a gentle surf lesson or seaside cafe espresso.',
        highlight: 'Fresh croissants and artisanal filter coffee in leafy courtyard cafes'
      }
    ],
    matchFactors: [
      { persona: 'Cafe Connoisseur & Slow Stroller', matchPct: 97, reason: 'Superb bakery culture, walkable heritage grid, and breezy promenade.' },
      { persona: 'Spiritual & Consciousness Explorer', matchPct: 94, reason: 'Profound heritage of Sri Aurobindo, The Mother, and Auroville community.' }
    ],
    attractions: [
      {
        id: 'white-town',
        name: 'French Quarter (White Town)',
        description: 'Colonial mansions with pastel facades, boutique cafes, and leafy cobblestone streets.',
        image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
        tag: 'Heritage District'
      }
    ],
    budgetBreakdown: {
      stay: { min: 4000, max: 9500, label: 'Heritage French villa / boutique guesthouse' },
      food: { min: 3000, max: 6000, label: 'French bakeries, seafood crepes & Tamil thalis' },
      travel: { min: 2000, max: 4500, label: 'Chennai ECR taxi / East Coast bus & rented scooter' },
      currency: 'INR'
    },
    thingsToSkip: 'Do not visit Auroville without booking Matrimandir inner chamber meditation passes in advance online.',
    gettingThere: {
      flight: 'Chennai International Airport (MAA), 2.5 hrs via scenic East Coast Road (ECR).',
      train: 'Puducherry Railway Station (PDY) connected to Bangalore, Chennai, and Delhi.',
      road: 'Scenic East Coast Road driving past coastal salt pans and casuarina groves.'
    },
    knowBeforeYouGo: [
      'Renting a vintage bicycle or electric moped is the best way to navigate White Town.',
      'Promenade Beach is closed to all vehicular traffic between 6:00 PM and 7:30 AM daily.'
    ],
    matchScore: 92,
    defaultPrompts: [
      'What are the best boutique colonial stays and courtyards in White Town?',
      'How do I book meditation passes for the Matrimandir in Auroville?',
      'Recommend a 3-day itinerary covering both French and Tamil quarters.'
    ]
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    slug: 'kyoto',
    state: 'Kansai',
    country: 'Japan',
    region: 'International',
    tag: 'The Cultural Heart of Japan',
    coordinates: { lat: 35.0116, lng: 135.7681, formatted: '35.0116° N, 135.7681° E' },
    elevation: '50 m MSL',
    curatorNotes: 'The imperial capital for over 1,000 years, embodying Zen simplicity, wooden machiya architecture, and living tea culture.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Thousands of classical wooden temples, moss gardens, bamboo groves, and traditional tea ceremonies.',
    fullDescription: 'The imperial capital of Japan for over a millennium, Kyoto is a living museum of traditional Japanese aesthetic and philosophical culture. From quiet Zen rock gardens and vermilion shrine gates in Arashiyama to serene machiya townhouse alleys in Gion, Kyoto embodies timeless refinement.',
    destinationTypes: ['Heritage', 'Culture', 'Spiritual', 'Slow Travel'],
    travelMoods: ['Cultural', 'Slow & Peaceful', 'Wellness'],
    budgetTypical: 95000,
    budgetFormatted: '¥140,000 – ¥220,000 / person',
    idealDuration: '4–6 days',
    bestTime: 'March to May & October to November',
    whyGo: [
      'Walk through the thousands of vermilion torii gates at Fushimi Inari Taisha at dawn.',
      'Experience a silent Zen matcha tea ceremony in a centuries-old garden pavilion.',
      'Stroll the Philosopher’s Path under cherry blossoms or fiery autumn maple leaves.'
    ],
    bestFor: ['Culture Seekers', 'Photographers', 'Architecture Enthusiasts', 'Couples'],
    itineraryDays: [
      {
        day: 1,
        title: 'Gion Machiya Alleys & Twilight Temples',
        timing: 'Afternoon & Dusk',
        description: 'Arrive via Shinkansen. Walk through the preserved wooden merchant streets of Shirakawa and Gion, ending with dusk lantern reflections at Yasaka Shrine.',
        highlight: 'Paper lanterns glowing in the cobblestone alleyways of Gion'
      },
      {
        day: 2,
        title: 'Dawn at Fushimi Inari & Higashiyama Zen Gardens',
        timing: 'Early Morning (6:30 AM)',
        description: 'Hike through the 10,000 vermilion torii gates at dawn without tourist crowds. Afternoon contemplation at Nanzen-ji and the dry landscape rock garden of Ryoan-ji.',
        highlight: 'Quiet morning light filtering through the red torii arches'
      },
      {
        day: 3,
        title: 'Arashiyama Bamboo Grove & Tenryu-ji Pond',
        timing: 'Full Day',
        description: 'Early morning walk through the rustling bamboo groves of Arashiyama, followed by matcha tea overlooking the 14th-century pond garden of Tenryu-ji.',
        highlight: 'Wind whispering through emerald bamboo culms'
      }
    ],
    matchFactors: [
      { persona: 'Zen Aesthetics & Cultural Connoisseur', matchPct: 98, reason: 'World capital of tea culture, dry landscape gardens, and temple craftsmanship.' }
    ],
    attractions: [
      {
        id: 'fushimi-inari',
        name: 'Fushimi Inari Shrine',
        description: 'Winding forest trails lined with over 10,000 bright vermilion torii gates.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
        tag: 'Iconic Shrine'
      }
    ],
    budgetBreakdown: {
      stay: { min: 45000, max: 90000, label: 'Traditional Machiya / Modern Ryokan' },
      food: { min: 25000, max: 50000, label: 'Kaiseki dining, matcha, and ramen stalls' },
      travel: { min: 15000, max: 30000, label: 'Shinkansen bullet train & Kyoto subway pass' },
      currency: 'JPY'
    },
    thingsToSkip: 'Avoid visiting major shrines like Kinkaku-ji during tour bus hours (10:30 AM to 3:30 PM).',
    gettingThere: {
      flight: 'Kansai International Airport (KIX), 75 min by Haruka Express.',
      train: 'Kyoto Station via Tokaido Shinkansen (2 hrs 15 min from Tokyo).',
      road: 'High-speed highway buses connecting Kansai and Kanto.'
    },
    knowBeforeYouGo: [
      'Reserve traditional Kaiseki and tea ceremonies at least two weeks ahead.',
      'Early mornings (6:30 AM – 8:30 AM) offer peaceful, crowd-free experiences.'
    ],
    matchScore: 96,
    defaultPrompts: [
      'Design a 5-day mindful itinerary in Kyoto with quiet morning temple visits.',
      'What are the best authentic Machiya stays in Kyoto?',
      'How to do a day trip to Uji for premium matcha tea from Kyoto?'
    ]
  }
];
