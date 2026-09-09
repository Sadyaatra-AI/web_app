import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'pachmarhi',
    name: 'Pachmarhi',
    slug: 'pachmarhi',
    state: 'Madhya Pradesh',
    country: 'India',
    region: 'Central',
    tag: 'Queen of the Satpuras',
    coordinates: {
      lat: 22.4674,
      lng: 78.4331,
      formatted: '22.4674° N, 78.4331° E'
    },
    elevation: '1,067 m MSL',

    curatorNotes:
      'A rare Central Indian hill station where sandstone plateaus, dense sal forests, ancient caves, cascading waterfalls, and sweeping Satpura viewpoints converge.',

    heroImage:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',

    secondaryImage:
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',

    galleryImages: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80'
    ],

    shortDescription:
      'Misty Satpura forests, ancient sandstone caves, cascading waterfalls, and panoramic viewpoints hidden in the heart of Central India.',

    fullDescription:
      'Perched high in the Satpura Range, Pachmarhi is Madhya Pradesh’s most celebrated hill station and a sanctuary of forests, waterfalls, caves, and dramatic sandstone landscapes. Known as the Queen of the Satpuras, it offers a slower kind of mountain escape—morning mist over sal forests, ancient rock shelters, quiet colonial lanes, and sunsets stretching across the rugged Central Indian plateau.',

    destinationTypes: [
      'Mountains',
      'Nature',
      'Adventure',
      'Heritage',
      'Slow Travel'
    ],

    travelMoods: [
      'Slow & Peaceful',
      'Nature Escape',
      'Adventurous',
      'Solo Reflection'
    ],

    budgetTypical: 14000,
    budgetFormatted: '₹12,000 – ₹20,000 / person',
    idealDuration: '3–4 days',
    bestTime: 'October to June',

    whyGo: [
      'Watch the sun disappear behind endless Satpura ridges from Dhoopgarh, the highest point in Madhya Pradesh.',
      'Explore waterfalls, forest trails, and natural pools including Bee Falls and Apsara Vihar.',
      'Discover ancient rock shelters and caves such as Pandav Caves surrounded by dense greenery.'
    ],

    bestFor: [
      'Nature Lovers',
      'Couples',
      'Families',
      'Photographers',
      'Weekend Explorers'
    ],

    itineraryDays: [
      {
        day: 1,
        title: 'Hill Station Arrival & Pandav Caves',
        timing: 'Afternoon to Sunset',
        description:
          'Arrive in Pachmarhi and settle into a forest-side stay. Spend the afternoon exploring the historic Pandav Caves before walking through the quiet hill-station roads and colonial-era surroundings.',
        highlight:
          'Golden evening light filtering through the sal and teak forests',
        photo:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 2,
        title: 'Bee Falls & Forest Waterfalls Circuit',
        timing: 'Morning to Afternoon',
        description:
          'Begin early with a forest drive and descend towards Bee Falls. Continue exploring nearby viewpoints and natural pools, stopping for quiet breaks surrounded by the sounds of flowing water and dense jungle.',
        highlight:
          'Standing beside cascading water surrounded by thick Satpura forest',
        photo:
          'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 3,
        title: 'Handi Khoh, Jata Shankar & Dhoopgarh Sunset',
        timing: 'Full Day',
        description:
          'Explore the dramatic gorge of Handi Khoh and the naturally formed Jata Shankar cave before heading toward Dhoopgarh in the evening for sweeping views from the highest point in Madhya Pradesh.',
        highlight:
          'Sunset spreading across the layered ridges of the Satpura Range',
        photo:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
      },
      {
        day: 4,
        title: 'Slow Forest Morning & Departure',
        timing: 'Morning',
        description:
          'Enjoy an unhurried morning surrounded by cool hill air. Have breakfast at a local cafe or heritage stay before beginning your return journey through the Satpura forests.',
        highlight:
          'Morning mist drifting between the forested hills'
      }
    ],

    matchFactors: [
      {
        persona: 'Nature & Waterfall Explorer',
        matchPct: 97,
        reason:
          'Dense forests, waterfalls, natural pools, caves, and viewpoints offer a complete Central Indian wilderness escape.'
      },
      {
        persona: 'Peaceful Weekend Traveler',
        matchPct: 94,
        reason:
          'Cooler weather, quiet roads, forest stays, and scenic viewpoints make Pachmarhi ideal for a relaxed short trip.'
      },
      {
        persona: 'Extreme Adventure Seeker',
        matchPct: 68,
        reason:
          'Excellent for hiking and exploration, but better suited to nature experiences than technical mountain adventure.'
      }
    ],

    attractions: [
      {
        id: 'dhoopgarh',
        name: 'Dhoopgarh',
        description:
          'The highest point in Madhya Pradesh, offering expansive views across the rolling Satpura Range and dramatic sunsets.',
        image:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        tag: 'Highest Point'
      },
      {
        id: 'bee-falls',
        name: 'Bee Falls',
        description:
          'One of Pachmarhi’s most popular waterfalls, cascading through dense forest into a refreshing natural pool.',
        image:
          'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80',
        tag: 'Waterfall'
      },
      {
        id: 'jatta-shankar',
        name: 'Jata Shankar Cave',
        description:
          'A naturally formed cave complex surrounded by rugged rock formations and deep forest, known for its spiritual significance.',
        image:
          'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
        tag: 'Sacred Cave'
      },
      {
        id: 'handi-khoh',
        name: 'Handi Khoh',
        description:
          'A dramatic forested gorge surrounded by steep sandstone cliffs and panoramic Satpura landscapes.',
        image:
          'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80',
        tag: 'Scenic Gorge'
      }
    ],

    budgetBreakdown: {
      stay: {
        min: 4000,
        max: 9000,
        label: 'Forest resort / heritage hotel / hill cottage'
      },
      food: {
        min: 2500,
        max: 5000,
        label: 'Local Madhya Pradesh cuisine & hotel dining'
      },
      travel: {
        min: 3000,
        max: 6000,
        label: 'Train / road journey + local sightseeing vehicle'
      },
      currency: 'INR'
    },

    thingsToSkip:
      'Avoid trying to cover every waterfall and viewpoint in a single day; Pachmarhi is best experienced slowly because several attractions involve forest drives and walking.',

    gettingThere: {
      flight:
        'Bhopal Raja Bhoj Airport (BHO) is the nearest major airport, followed by a road journey to Pachmarhi.',
      train:
        'Pipariya Railway Station is the nearest major railhead, approximately 50 km from Pachmarhi.',
      road:
        'Well connected by road from Pipariya, Bhopal, Jabalpur, Nagpur, and other cities across Madhya Pradesh.'
    },

    knowBeforeYouGo: [
      'Several attractions are located within forest areas, so local transport and entry permissions may be required.',
      'Carry comfortable walking shoes because waterfalls, caves, and viewpoints often involve stairs or uneven trails.',
      'Evenings can feel noticeably cooler than the surrounding plains, especially during winter months.',
      'Start waterfall and viewpoint visits early to avoid crowds and maximize daylight.'
    ],

    matchScore: 93,

    defaultPrompts: [
      'Create a relaxed 3-day Pachmarhi itinerary covering waterfalls, caves, and Dhoopgarh sunset.',
      'What is the best way to travel from Pipariya Railway Station to Pachmarhi?',
      'Which forest resorts and scenic stays are best for a peaceful Pachmarhi trip?'
    ]
  }
];
