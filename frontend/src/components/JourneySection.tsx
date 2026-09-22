import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import {
  Compass,
  UserCircle,
  CalendarDays,
  Home,
  MapPin,
  Users,
  Link2,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface JourneySectionProps {
  onExploreClick?: () => void;
  onOpenAI?: (prompt: string) => void;
}

const FEATURES = [
  {
    id: 'planning',
    title: 'Personalised Planning',
    subtitle: 'understanding the traveller before planning the journey',
    description: 'sadhyaatra helps travellers plan journeys around their own preferences, interests, budget, time, travel style, and requirements. instead of starting with a fixed destination or a generic itinerary, the planning process begins with understanding what the traveller actually wants from their journey.',
    icon: UserCircle,
    color: 'from-[#e1d5c9] to-[#f4ebe1]',
    iconColor: 'text-[#8a7968]',
    accentBg: 'bg-[#e1d5c9]'
  },
  {
    id: 'discovery',
    title: 'Destination Discovery',
    subtitle: 'discover places that actually fit your kind of travel',
    description: 'explore destinations based on what you want to experience, whether that means adventure, relaxation, culture, food, nature, history, nightlife, or something completely different. sadhyaatra brings destinations, attractions, hidden gems, local experiences, and things to do together so travellers can discover possibilities without searching across multiple platforms.',
    icon: Compass,
    color: 'from-[#d4e0d9] to-[#eaf2ed]',
    iconColor: 'text-[#6a8775]',
    accentBg: 'bg-[#d4e0d9]'
  },
  {
    id: 'itinerary',
    title: 'Smart Itineraries',
    subtitle: 'turning a list of places into an actual journey',
    description: 'sadhyaatra helps travellers build practical, structured itineraries based on their preferences, available time, location, and interests. instead of simply generating a list of places, the journey is organised into a meaningful flow, connecting destinations, activities, stays, transportation, and time.',
    icon: CalendarDays,
    color: 'from-[#e2d5e5] to-[#f2ebf4]',
    iconColor: 'text-[#876a8c]',
    accentBg: 'bg-[#e2d5e5]'
  },
  {
    id: 'stay',
    title: 'Stay & Transport',
    subtitle: 'getting there and staying there are part of the journey too',
    description: 'find and plan accommodation and transportation as part of the overall journey rather than treating them as completely separate decisions. sadhyaatra aims to connect where you stay, how you move, and what you do into one coherent travel plan.',
    icon: Home,
    color: 'from-[#d5dfe5] to-[#eef4f8]',
    iconColor: 'text-[#6a8596]',
    accentBg: 'bg-[#d5dfe5]'
  },
  {
    id: 'activities',
    title: 'Local Experiences',
    subtitle: 'travel is more than just visiting places',
    description: 'discover activities, experiences, food, local attractions, and things to do that match the kind of journey you want to have. from well-known attractions to experiences beyond the usual tourist checklist, sadhyaatra helps travellers explore what a destination has to offer in a way that feels personal.',
    icon: MapPin,
    color: 'from-[#e5ded5] to-[#f6f2ee]',
    iconColor: 'text-[#96826a]',
    accentBg: 'bg-[#e5ded5]'
  },
  {
    id: 'coordination',
    title: 'Journey Coordination',
    subtitle: 'less coordination. more travelling.',
    description: 'planning with friends, family, or groups often means endless messages, shared links, changing opinions, and multiple versions of the same plan. sadhyaatra aims to bring the different aspects of a shared journey together, making it easier to coordinate plans, preferences, activities, and decisions with the people travelling with you.',
    icon: Users,
    color: 'from-[#d9e5d5] to-[#f0f6ee]',
    iconColor: 'text-[#74966a]',
    accentBg: 'bg-[#d9e5d5]'
  },
  {
    id: 'connected',
    title: 'Connected Experience',
    subtitle: 'from “where should we go?” to “let’s go.”',
    description: 'sadhyaatra brings discovery, planning, comparison, itinerary building, and journey organisation into one connected experience. the goal is not to replace every travel platform overnight, but to remove the need for travellers to constantly jump between them just to put one journey together.',
    icon: Link2,
    color: 'from-[#e5d5d5] to-[#f8eeee]',
    iconColor: 'text-[#966a6a]',
    accentBg: 'bg-[#e5d5d5]'
  },
  {
    id: 'your-way',
    title: 'Travel Your Way',
    subtitle: 'no two travellers experience a journey the same way',
    description: 'sadhyaatra is built around the idea that travel should adapt to the traveller, not the other way around. whether you travel spontaneously or plan every detail, travel solo or with a group, seek adventure or simply want to slow down, the journey should reflect your preferences, pace, and priorities.',
    icon: Heart,
    color: 'from-[#eeddd9] to-[#fdf6f4]',
    iconColor: 'text-[#a47a71]',
    accentBg: 'bg-[#eeddd9]'
  }
];

// Abstract UI Components for the Phone Screen
const PlanningUI = () => (
  <div className="flex flex-col gap-6 mt-6 px-5 w-full h-full">
    <div className="space-y-1">
      <h4 className="font-fraunces text-xl text-[#2b2728]">what's your vibe?</h4>
      <p className="text-xs font-mono-code text-[#8a8582] uppercase tracking-wide">Step 1 of 3</p>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {['Culture', 'Nature', 'Food', 'Relaxation', 'Adventure', 'Nightlife', 'Art'].map((tag, i) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, type: "spring" }}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${i === 1 || i === 2 || i === 4 ? 'bg-[#8a7968] text-white border-[#8a7968] shadow-sm' : 'bg-white/60 text-[#4a4542] border-black/10 hover:bg-white'}`}
        >
          {tag}
        </motion.div>
      ))}
    </div>

    <div className="mt-2 space-y-3">
      <div className="flex justify-between items-end">
        <h4 className="font-fraunces text-lg text-[#2b2728]">pace</h4>
        <span className="text-[10px] text-[#8a8582] font-mono-code">Balanced</span>
      </div>
      <div className="w-full h-10 bg-white/60 rounded-full border border-black/5 p-1 relative flex items-center shadow-inner">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: 80 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="w-1/3 h-full bg-white rounded-full shadow-sm border border-black/5 absolute"
        />
        <div className="w-full flex justify-between px-4 text-[10px] text-black/40 z-10 font-medium">
          <span>Chill</span>
          <span>Balanced</span>
          <span>Packed</span>
        </div>
      </div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
      className="mt-auto mb-6 w-full py-3 bg-[#2b2728] text-white rounded-2xl text-xs font-medium text-center shadow-md flex items-center justify-center gap-2"
    >
      Next <ChevronRight className="w-3 h-3" />
    </motion.div>
  </div>
);

const DiscoveryUI = () => (
  <div className="grid grid-cols-2 gap-3 mt-6 px-4 w-full h-full content-start">
    {[
      { title: 'Kyoto', desc: 'temples & gardens', h: 'h-40', col: 'col-span-2', img: 'bg-[#e1d5c9]', rating: '4.9' },
      { title: 'Bali', desc: 'beaches', h: 'h-32', col: 'col-span-1', img: 'bg-[#d4e0d9]', rating: '4.7' },
      { title: 'Swiss Alps', desc: 'mountains', h: 'h-32', col: 'col-span-1', img: 'bg-[#d5dfe5]', rating: '4.8' },
      { title: 'Rome', desc: 'history', h: 'h-32', col: 'col-span-2', img: 'bg-[#eeddd9]', rating: '4.6' },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className={`${item.h} ${item.col} ${item.img} rounded-3xl shadow-sm border border-white/60 p-4 flex flex-col justify-between relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
        <div className="flex justify-end relative z-10">
          <div className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center border border-white/40">
             <Heart className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <h4 className="text-white font-medium text-lg leading-tight drop-shadow-md">{item.title}</h4>
            <p className="text-white/90 text-[9px] font-mono-code uppercase tracking-wider">{item.desc}</p>
          </div>
          <div className="flex items-center gap-1 bg-black/20 backdrop-blur-md px-1.5 py-0.5 rounded text-white text-[9px]">
            <Sparkles className="w-2 h-2" /> {item.rating}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ItineraryUI = () => (
  <div className="flex flex-col gap-0 mt-4 px-5 w-full h-full">
    <div className="flex justify-between items-end mb-5 px-1">
      <h4 className="font-fraunces text-2xl text-[#2b2728]">Day 1</h4>
      <span className="text-[10px] font-mono-code text-[#8a8582] bg-white/50 px-2 py-1 rounded-md border border-black/5">Oct 12</span>
    </div>
    
    <div className="w-full h-24 rounded-2xl bg-white/40 border border-white/60 mb-6 overflow-hidden relative shadow-inner">
       <div className="absolute inset-0 bg-[#e2d5e5]/20" />
       {/* Fake map line */}
       <svg className="absolute inset-0 w-full h-full text-[#876a8c]/40" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M10 80 Q 40 20 60 50 T 90 10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
       </svg>
       <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md text-[8px] font-medium shadow-sm">Map View</div>
    </div>

    {[
      { time: '09:00 AM', title: 'Morning Coffee', loc: 'Cafe de Flore', icon: '☕' },
      { time: '11:00 AM', title: 'Museum Visit', loc: 'The Louvre', icon: '🏛️' },
      { time: '01:30 PM', title: 'Lunch', loc: 'Le Relais', icon: '🍽️' },
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        className="flex gap-4 relative pb-5"
      >
        {i !== 2 && <div className="absolute top-6 left-[9px] bottom-0 w-px bg-black/10" />}
        <div className="w-5 h-5 rounded-full bg-white border-[1.5px] border-[#876a8c] shadow-sm shrink-0 z-10 mt-1 flex items-center justify-center text-[8px]">{i+1}</div>
        <div className="flex-1">
          <div className="text-[9px] font-mono-code text-[#8a8582] mb-1 tracking-wider">{item.time}</div>
          <div className="w-full bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/60 p-3 flex justify-between items-center">
            <div>
              <h5 className="font-medium text-[#2b2728] text-xs mb-0.5">{item.title}</h5>
              <div className="flex items-center gap-1 text-[10px] text-[#8a8582]">
                <MapPin className="w-2.5 h-2.5" />
                {item.loc}
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-black/5 flex items-center justify-center text-sm">{item.icon}</div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

const StayTransportUI = () => (
  <div className="flex flex-col gap-4 mt-6 px-4 w-full h-full">
    <h4 className="font-fraunces text-xl text-[#2b2728] px-2">logistics</h4>
    
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-white p-5 flex flex-col gap-4 relative"
    >
      <div className="flex justify-between items-center text-xs font-mono-code text-[#8a8582]">
        <div className="flex flex-col"><span className="text-sm font-bold text-black">JFK</span><span className="text-[8px]">New York</span></div>
        <div className="flex-1 border-t border-dashed border-black/20 mx-3 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black/40 text-[10px] bg-[#f8f6f1] px-1 rounded-full">✈</div>
        </div>
        <div className="flex flex-col items-end"><span className="text-sm font-bold text-black">CDG</span><span className="text-[8px]">Paris</span></div>
      </div>
      <div className="flex justify-between items-end mt-2">
        <div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-[#2b2728]">
             <div className="w-4 h-4 bg-blue-900 rounded-sm" /> Air France
          </div>
          <div className="text-[10px] text-[#8a8582] mt-1 font-mono-code">AF 1234 • Seat 12A</div>
        </div>
        <div className="px-2.5 py-1 bg-[#d9e5d5] text-[#74966a] rounded-lg text-[9px] font-bold uppercase tracking-wide">Confirmed</div>
      </div>
    </motion.div>

    <div className="w-0.5 h-6 bg-black/10 mx-auto border-l border-dashed border-black/20" />

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-white p-5 flex gap-4 items-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-[#d5dfe5] flex items-center justify-center shrink-0 border border-white/50 shadow-inner">
        <Home className="w-6 h-6 text-[#6a8596]" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
           <h5 className="font-medium text-[#2b2728] text-sm leading-tight">Le Grand Hotel</h5>
           <span className="text-[10px] bg-[#eeddd9] text-[#a47a71] px-1.5 py-0.5 rounded font-bold">4.8★</span>
        </div>
        <div className="text-[10px] text-[#8a8582] mt-1 space-y-0.5">
           <div className="flex items-center gap-1"><CalendarDays className="w-2.5 h-2.5" /> Oct 12 - Oct 15 (3 Nights)</div>
           <div className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> 1st Arrondissement</div>
        </div>
      </div>
    </motion.div>
  </div>
);

const ActivitiesUI = () => (
  <div className="mt-6 px-4 w-full h-full">
    <div className="flex justify-between items-end mb-4 px-1">
      <h4 className="font-fraunces text-xl text-[#2b2728]">explore</h4>
      <span className="text-[10px] font-medium text-[#8a8582] underline cursor-pointer">View Map</span>
    </div>
    <div className="flex flex-col gap-3">
      {[
        { title: 'Sushi Making Class', price: '$85', tag: 'Culinary', users: 3, time: '2.5 hrs' },
        { title: 'Mt. Fuji Day Tour', price: '$120', tag: 'Adventure', users: 5, time: 'Full day' },
        { title: 'Onsen Experience', price: '$40', tag: 'Relaxation', users: 2, time: 'Flexible' },
      ].map((act, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-white/80 flex flex-col gap-3"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                 <span className="text-[8px] font-mono-code font-bold uppercase tracking-wider text-[#96826a] bg-[#e5ded5]/50 px-1.5 py-0.5 rounded">{act.tag}</span>
                 <span className="text-[8px] text-[#8a8582] font-mono-code flex items-center gap-0.5"><CalendarDays className="w-2.5 h-2.5"/> {act.time}</span>
              </div>
              <h5 className="font-medium text-sm text-[#2b2728]">{act.title}</h5>
            </div>
            <div className="text-xs font-bold text-[#2b2728] bg-white px-2 py-1 rounded-lg shadow-sm border border-black/5">
              {act.price}
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-black/5">
             <div className="flex -space-x-1.5">
                {[...Array(Math.min(3, act.users))].map((_, j) => (
                   <div key={j} className={`w-5 h-5 rounded-full border border-white bg-black/${(j+2)*10}`} />
                ))}
             </div>
             <button className="text-[9px] font-bold bg-[#2b2728] text-white px-3 py-1.5 rounded-full">Book Now</button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const CoordinationUI = () => (
  <div className="mt-6 px-4 w-full h-full flex flex-col">
    <div className="flex justify-between items-center mb-6 bg-white/60 p-3 rounded-2xl border border-white/50 shadow-sm backdrop-blur-sm">
      <div>
         <h4 className="font-fraunces text-lg text-[#2b2728] leading-tight">Paris Squad</h4>
         <div className="text-[9px] text-[#8a8582] font-medium flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-green-400"/> 3 online</div>
      </div>
      <div className="flex -space-x-2">
        <div className="w-8 h-8 rounded-full bg-black/10 border-2 border-white z-30 flex items-center justify-center text-[10px]">A</div>
        <div className="w-8 h-8 rounded-full bg-[#e1d5c9] border-2 border-white z-20 flex items-center justify-center text-[10px]">B</div>
        <div className="w-8 h-8 rounded-full bg-[#d5dfe5] border-2 border-white z-10 flex items-center justify-center text-[10px] font-medium">+2</div>
      </div>
    </div>
    
    <div className="flex-1 flex flex-col gap-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex gap-2">
        <div className="w-6 h-6 rounded-full bg-black/10 shrink-0 mt-1 flex items-center justify-center text-[8px]">A</div>
        <div>
           <div className="bg-white/90 p-3 rounded-2xl rounded-tl-sm shadow-sm border border-black/5 text-xs text-[#4a4542]">
             Should we book the morning train?
           </div>
           <div className="text-[8px] text-[#8a8582] mt-1 ml-1 font-mono-code">10:42 AM</div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-2 flex-row-reverse">
        <div className="flex flex-col items-end">
           <div className="bg-[#74966a] text-white p-3 rounded-2xl rounded-tr-sm shadow-sm text-xs border border-[#74966a]">
             Yes! I'll buy the tickets now.
           </div>
           <div className="text-[8px] text-[#8a8582] mt-1 mr-1 font-mono-code">10:45 AM • Read</div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex gap-2 flex-row-reverse -mt-2">
        <div className="bg-white/90 p-2 rounded-2xl shadow-sm border border-black/5 flex items-center justify-center gap-1 text-xs">
           <Heart className="w-3 h-3 text-red-400 fill-red-400" />
        </div>
      </motion.div>
    </div>
  </div>
);

const ConnectedUI = () => (
  <div className="mt-8 px-5 w-full h-full flex flex-col gap-5">
     <div className="text-center space-y-1">
       <h4 className="font-fraunces text-2xl text-[#2b2728]">Paris 2026</h4>
       <p className="text-[10px] font-mono-code text-[#8a8582] uppercase tracking-widest">Oct 12 - Oct 18</p>
     </div>
     
     <div className="bg-white/80 rounded-2xl p-4 shadow-sm border border-white/60">
        <div className="flex justify-between text-[10px] font-medium text-[#2b2728] mb-2">
           <span>Trip Readiness</span>
           <span>85%</span>
        </div>
        <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
           <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-[#966a6a]" />
        </div>
     </div>

     <div className="grid grid-cols-2 gap-3">
       {[
         { title: 'Flights', icon: Link2, val: 'Booked', status: 'text-green-600' },
         { title: 'Hotel', icon: Home, val: 'Confirmed', status: 'text-green-600' },
         { title: 'Itinerary', icon: CalendarDays, val: 'In Progress', status: 'text-orange-500' },
         { title: 'Group', icon: Users, val: '4 People', status: 'text-blue-600' },
       ].map((item, i) => (
         <motion.div
           key={i}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: i * 0.1 }}
           className="bg-white/90 p-4 rounded-2xl shadow-sm border border-white/50 flex flex-col items-center justify-center gap-3 text-center group hover:bg-white transition-colors"
         >
           <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
              <item.icon className="w-4 h-4 text-[#966a6a]" />
           </div>
           <div>
             <div className="text-xs font-bold text-[#2b2728] mb-0.5">{item.title}</div>
             <div className={`text-[9px] font-medium ${item.status}`}>{item.val}</div>
           </div>
         </motion.div>
       ))}
     </div>
  </div>
);

const YourWayUI = () => (
  <div className="mt-6 px-4 w-full h-full flex flex-col gap-4">
    <h4 className="font-fraunces text-xl text-[#2b2728] px-1 mb-1">preferences</h4>
    {[
      { label: 'Spontaneous', on: true, desc: 'Leave room for magic' },
      { label: 'Budget-friendly', on: false, desc: 'Keep costs low' },
      { label: 'Off the beaten path', on: true, desc: 'Discover hidden gems' },
    ].map((pref, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.15 }}
        className="flex items-center justify-between p-4 bg-white/90 rounded-2xl shadow-sm border border-white/60"
      >
        <div>
           <span className="text-sm font-medium text-[#2b2728] block">{pref.label}</span>
           <span className="text-[9px] text-[#8a8582] block mt-0.5">{pref.desc}</span>
        </div>
        <div className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer ${pref.on ? 'bg-[#a47a71]' : 'bg-black/10'}`}>
          <motion.div 
            className="w-4 h-4 bg-white rounded-full shadow-sm"
            animate={{ x: pref.on ? 16 : 0 }}
          />
        </div>
      </motion.div>
    ))}
    
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-2 flex-1 bg-gradient-to-br from-[#eeddd9]/80 to-white/50 rounded-3xl p-5 border border-white/80 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden"
    >
      <Heart className="w-8 h-8 text-white/50 absolute top-[-10px] right-[-10px] rotate-12" />
      <p className="font-fraunces text-xl text-[#a47a71] leading-tight italic relative z-10">
        "travel that adapts<br/>to you."
      </p>
    </motion.div>
  </div>
);

const getMockUI = (id: string) => {
  switch (id) {
    case 'planning': return <PlanningUI />;
    case 'discovery': return <DiscoveryUI />;
    case 'itinerary': return <ItineraryUI />;
    case 'stay': return <StayTransportUI />;
    case 'activities': return <ActivitiesUI />;
    case 'coordination': return <CoordinationUI />;
    case 'connected': return <ConnectedUI />;
    case 'your-way': return <YourWayUI />;
    default: return null;
  }
};


export const JourneySection: React.FC<JourneySectionProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeFeature = FEATURES[activeIdx];
  const ActiveIcon = activeFeature.icon;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % FEATURES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  const handleSelectFeature = (idx: number) => {
    handleInteraction();
    setActiveIdx(idx);
  };

  const handleNext = () => {
    handleInteraction();
    setActiveIdx((prev) => (prev + 1) % FEATURES.length);
  };

  const handlePrev = () => {
    handleInteraction();
    setActiveIdx((prev) => (prev === 0 ? FEATURES.length - 1 : prev - 1));
  };

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Subtle scroll rotation for the phone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-10, -5, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={containerRef} id="journey-showcase-section" className="py-24 bg-[#f8f6f1] relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[#8c956a]/10 to-[#e1d5c9]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#8c956a]/30 bg-white/50 backdrop-blur-sm text-[#8c956a] text-xs font-mono-code tracking-widest uppercase font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sadyaatra App</span>
          </div>

          <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl text-[#2b2728] font-normal tracking-tight">
            everything you need for your journey, <br />
            <span className="italic font-light text-[#8c956a]">in one place.</span>
          </h2>
        </div>

        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-start">
          
          {/* Left Column (Desktop) / Top Column (Mobile) - Pointers & Info */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 order-1 relative z-20">
             
             {/* Mobile active info card (visible only on mobile) */}
             <div className="lg:hidden w-full relative z-20 -mb-8">
                <AnimatePresence mode="wait">
                  <motion.div 
                     key={activeFeature.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                     className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/50 text-center"
                  >
                     <div className="flex items-center justify-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner bg-gradient-to-br ${activeFeature.color}`}>
                           <ActiveIcon className={`w-5 h-5 ${activeFeature.iconColor}`} />
                        </div>
                        <div className="text-left">
                           <div className="text-[10px] font-mono-code font-bold text-black/40 mb-0.5">
                              0{activeIdx + 1} • {activeFeature.subtitle}
                           </div>
                           <h3 className="font-fraunces text-lg text-[#2b2728] leading-tight">
                              {activeFeature.title}
                           </h3>
                        </div>
                     </div>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Desktop Pointer List (hidden on mobile) */}
             <div className="hidden lg:flex flex-col gap-3">
               {FEATURES.map((feature, idx) => {
                 const isActive = activeIdx === idx;
                 const Icon = feature.icon;
                 
                 return (
                   <motion.div
                     key={feature.id}
                     layout
                     onClick={() => handleSelectFeature(idx)}
                     className={`cursor-pointer rounded-3xl p-5 transition-all duration-500 overflow-hidden relative border ${
                        isActive 
                           ? 'bg-white shadow-xl border-white/60' 
                           : 'bg-white/40 hover:bg-white/60 shadow-sm border-transparent'
                     }`}
                   >
                     {/* Active Indicator Line */}
                     {isActive && (
                        <motion.div 
                           layoutId="activeIndicator"
                           className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${feature.color}`} 
                        />
                     )}

                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-colors duration-500 ${
                              isActive ? `bg-gradient-to-br ${feature.color}` : 'bg-black/5'
                           }`}>
                              <Icon className={`w-5 h-5 transition-colors duration-500 ${isActive ? feature.iconColor : 'text-black/30'}`} />
                           </div>
                        </div>

                        <div className="flex-1 min-w-0">
                           <div className="flex items-center gap-3 mb-1">
                              <span className={`text-xs font-mono-code font-bold transition-colors ${isActive ? 'text-black/40' : 'text-black/20'}`}>
                                 0{idx + 1}
                              </span>
                              <h3 className={`font-fraunces text-xl leading-tight transition-colors ${isActive ? 'text-[#2b2728]' : 'text-[#8a8582]'}`}>
                                 {feature.title}
                              </h3>
                           </div>
                           
                           <AnimatePresence>
                              {isActive && (
                                 <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                 >
                                    <div className="pt-2 space-y-3">
                                       <p className={`text-[11px] font-mono-code uppercase tracking-wider font-semibold ${feature.iconColor}`}>
                                          {feature.subtitle}
                                       </p>
                                       <p className="text-sm text-[#4a4542] leading-relaxed">
                                          {feature.description}
                                       </p>
                                    </div>
                                 </motion.div>
                              )}
                           </AnimatePresence>
                        </div>
                     </div>
                   </motion.div>
                 );
               })}
             </div>
          </div>

          {/* Right Column (Desktop) / Bottom Column (Mobile) - The 3D Phone */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 perspective-[1800px] z-10">
            <motion.div
              style={{
                rotateX,
                rotateY,
                scale,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full max-w-[360px] lg:max-w-[380px] aspect-[9/19.5] transition-transform duration-300 ease-out"
            >
              {/* Phone Bezel */}
              <div className="absolute inset-0 rounded-[48px] bg-[#f8f6f1] p-2.5 sm:p-3 border-4 border-[#e8e2d5] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] ring-1 ring-[#2b2728]/10 overflow-hidden">
                
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2 h-2 rounded-full bg-[#3b82f6]/50" />
                </div>
                
                {/* Side Buttons (Simulated) */}
                <div className="absolute top-32 -left-4 w-1.5 h-12 bg-[#d8d2c5] rounded-l-md" />
                <div className="absolute top-48 -left-4 w-1.5 h-12 bg-[#d8d2c5] rounded-l-md" />
                <div className="absolute top-40 -right-4 w-1.5 h-16 bg-[#d8d2c5] rounded-r-md" />

                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-[38px] bg-white overflow-hidden flex flex-col items-center shadow-inner group">
                  
                  {/* Status Bar */}
                  <div className="w-full h-14 bg-transparent absolute top-0 z-40 flex justify-between items-center px-6 pt-1 text-[11px] font-medium text-black/80">
                    <span>9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-4 h-4 border border-black/80 rounded-[4px] flex items-center justify-center text-[7px]">5G</div>
                      <div className="w-4 h-2.5 border border-black/80 rounded-[2px] p-[1px]"><div className="w-full h-full bg-black/80 rounded-[1px]" /></div>
                    </div>
                  </div>

                  {/* App Content container */}
                  <div className="w-full h-full relative overflow-hidden bg-[#faf9f7]">
                    
                    {/* Background Color Transition */}
                    <AnimatePresence initial={false}>
                       <motion.div
                          key={`bg-${activeFeature.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8 }}
                          className={`absolute inset-0 bg-gradient-to-br ${activeFeature.color} opacity-30`}
                       />
                    </AnimatePresence>

                    {/* App Header (Mock) & Scroll Hint */}
                    <div className="absolute top-0 left-0 right-0 pt-16 pb-4 px-6 z-30 flex items-center justify-between gap-3">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center">
                             <div className="w-4 h-0.5 bg-black/40 rounded-full" />
                          </div>
                          <motion.div
                            key={`header-${activeFeature.id}`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                             <div className="h-4 w-24 bg-black/10 rounded-full" />
                          </motion.div>
                       </div>
                       
                       {/* Swipe Hint */}
                       <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.7 }}
                          transition={{ delay: 2, duration: 1 }}
                          className="flex items-center gap-1 text-[8px] font-mono-code uppercase tracking-widest text-[#2b2728] bg-white/60 px-2.5 py-1.5 rounded-full backdrop-blur-md shadow-sm border border-white/60 pointer-events-none"
                       >
                          <span>←</span> swipe <span>→</span>
                       </motion.div>
                    </div>

                    {/* Feature Abstract UI */}
                    <motion.div 
                      className="absolute inset-0 pt-28 pb-32 flex flex-col z-20 cursor-grab active:cursor-grabbing"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={handleDragEnd}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`ui-${activeFeature.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className="flex-1 flex flex-col h-full w-full pointer-events-none"
                        >
                           {getMockUI(activeFeature.id)}
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    {/* App Bottom Navigation / Controls */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent z-40 flex flex-col justify-end px-6 pb-6">
                       
                       {/* Progress Dots inside phone */}
                       <div className="flex items-center justify-center gap-1.5 mb-6">
                          {FEATURES.map((_, i) => (
                             <button 
                                key={i} 
                                onClick={() => handleSelectFeature(i)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                   activeIdx === i ? 'w-6 bg-[#2b2728]' : 'w-1.5 bg-[#2b2728]/20'
                                }`} 
                             />
                          ))}
                       </div>

                       {/* Navigation Arrows */}
                       <div className="flex items-center justify-between lg:hidden">
                          <button 
                             onClick={handlePrev}
                             className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#2b2728] transition-colors"
                          >
                             <ChevronLeft className="w-5 h-5" />
                          </button>
                          
                          <div className="text-[10px] font-mono-code text-[#4a4542] tracking-widest uppercase font-semibold">
                             Demo
                          </div>

                          <button 
                             onClick={handleNext}
                             className="w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#2b2728] transition-colors"
                          >
                             <ChevronRight className="w-5 h-5" />
                          </button>
                       </div>
                       
                       {/* Home Indicator */}
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/80 rounded-full" />
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
