import React from 'react';
import { Compass, Sparkles, ArrowRight, Mountain, Trees, Landmark, HeartHandshake } from 'lucide-react';

interface TripIntentCardProps {
  onSelectOption: (prompt: string) => void;
}

const INTENT_OPTIONS = [
  {
    id: 'serenity',
    title: 'Peaceful & Slow',
    tagline: 'Misty woods, quiet streams & unhurried mornings',
    icon: Trees,
    badge: 'Peaceful',
    prompt: 'I want a peaceful, quiet escape to relax and reconnect with nature.',
    color: 'from-[#8c956a]/15 to-transparent',
    borderColor: 'hover:border-[#8c956a]',
  },
  {
    id: 'restless',
    title: 'Restless Wanderer',
    tagline: 'High trails, hidden cascades & rocky viewpoints',
    icon: Mountain,
    badge: 'Restless',
    prompt: 'I feel restless and want to explore hidden trails, waterfall drops, and mountain cliffs.',
    color: 'from-[#a66f5b]/15 to-transparent',
    borderColor: 'hover:border-[#a66f5b]',
  },
  {
    id: 'heritage',
    title: 'Inspired & Sacred',
    tagline: 'Ancient rock shelters, sacred cave lore & vistas',
    icon: Landmark,
    badge: 'Inspired',
    prompt: 'I am looking for inspiring ancient rock shelters, sacred caves, and panoramic gorges.',
    color: 'from-[#9eb094]/15 to-transparent',
    borderColor: 'hover:border-[#9eb094]',
  },
  {
    id: 'alive',
    title: 'Grounded & Alive',
    tagline: 'Fresh mountain air, sal forests & vibrant sunsets',
    icon: HeartHandshake,
    badge: 'Alive',
    prompt: 'I want to feel grounded and alive amidst mountain mist and golden sunset ridges.',
    color: 'from-[#c6cab2]/20 to-transparent',
    borderColor: 'hover:border-[#c6cab2]',
  },
];

export const TripIntentCard: React.FC<TripIntentCardProps> = ({ onSelectOption }) => {
  return (
    <section id="trip-intent-section" className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-[#2b2728]/10 p-6 sm:p-10 shadow-lg">
        {/* Subtle Warm Background Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8c956a]/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-[#2b2728]/10 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f8f6f1] border border-[#8c956a]/30 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#8c956a]" />
              <span>Inner Compass Curator</span>
            </div>

            {/* Requested Heading */}
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl text-[#2b2728] font-normal leading-tight">
              Where do you want to feel?
            </h2>

            {/* Requested Subtitle */}
            <p className="text-sm sm:text-base text-[#4a4542] max-w-xl font-light leading-relaxed">
              Peaceful. Restless. Inspired. Grounded. Alive. Tell Sadhyatra.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] font-medium">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Select a state of mind to begin</span>
          </div>
        </div>

        {/* 4 Vibe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {INTENT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt.prompt)}
                className={`group text-left relative flex flex-col justify-between p-5 rounded-2xl bg-[#f8f6f1]/80 backdrop-blur-sm border border-[#2b2728]/10 ${opt.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white cursor-pointer overflow-hidden`}
              >
                {/* Card Subtle Hover Color Tint */}
                <div className={`absolute inset-0 bg-gradient-to-br ${opt.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#8c956a]/25 flex items-center justify-center text-[#8c956a] group-hover:scale-110 transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-code uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#8c956a] border border-[#8c956a]/20 font-semibold shadow-2xs">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="font-fraunces text-lg text-[#2b2728] font-medium group-hover:text-[#8c956a] transition-colors mb-1">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#4a4542] font-light leading-relaxed mb-4">
                    {opt.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8c956a] group-hover:text-[#7a835a] transition-colors pt-2 border-t border-[#2b2728]/10">
                  <span>Explore vibe</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
