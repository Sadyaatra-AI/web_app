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
      'Pachmarhi brings together waterfalls, forest trails, viewpoints, caves, and historic sites in one compact hill-station destination.',

    poeticTagline: "For mornings when you don't want to rush anywhere.",
    featureTags: ['Forests', 'Waterfalls', 'Caves', 'Slow mornings'],

    heroImage:
      '/images/pachmarhi/Chitrakoot.jpeg',

    secondaryImage:
      '/images/pachmarhi/pexels-mohit-khare-3592184-36664317.jpg.jpeg',

    galleryImages: [
      '/images/pachmarhi/pexels-baskheecho-10346735.jpg.jpeg',
      '/images/pachmarhi/pexels-2429272-39044399.jpg.jpeg',
      '/images/pachmarhi/pexels-mohit-khare-3592184-36664317.jpg.jpeg',
      '/images/pachmarhi/Chitrakoot.jpeg'
    ],

    shortDescription:
      'A forested hill station in Madhya Pradesh’s Satpura Range, Pachmarhi is known for waterfalls, caves, viewpoints, and scenic trails. Its cooler climate and relaxed pace make it a popular getaway for nature lovers, families, and weekend travellers.',

    fullDescription:
      'A forested hill station in Madhya Pradesh’s Satpura Range, Pachmarhi is known for waterfalls, caves, viewpoints, and scenic trails. Its cooler climate and relaxed pace make it a popular getaway for nature lovers, families, and weekend travellers.',

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
          '/images/pachmarhi/pexels-baskheecho-10346735.jpg.jpeg'
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
          '/images/pachmarhi/beeFalls.jpeg'
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
          '/images/pachmarhi/dhoopgarh.jpg'
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
          '/images/pachmarhi/dhoopgarh.jpg',
        tag: 'Highest Point'
      },
      {
        id: 'bee-falls',
        name: 'Bee Falls',
        description:
          'One of Pachmarhi’s most popular waterfalls, cascading through dense forest into a refreshing natural pool.',
        image:
          '/images/pachmarhi/beeFalls.jpeg',
        tag: 'Waterfall'
      },
      {
        id: 'jatta-shankar',
        name: 'Jata Shankar Cave',
        description:
          'A naturally formed cave complex surrounded by rugged rock formations and deep forest, known for its spiritual significance.',
        image:
          '/images/pachmarhi/jatashankar.jpeg',
        tag: 'Sacred Cave'
      },
      {
        id: 'handi-khoh',
        name: 'Handi Khoh',
        description:
          'A dramatic forested gorge surrounded by steep sandstone cliffs and panoramic Satpura landscapes.',
        image:
          '/images/pachmarhi/HandiKhoh.jpeg',
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
