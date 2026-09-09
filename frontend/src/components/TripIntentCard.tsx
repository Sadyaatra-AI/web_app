import React from 'react';
import { Compass, Sparkles, ArrowRight, Mountain, Trees, Landmark, HeartHandshake } from 'lucide-react';

interface TripIntentCardProps {
  onSelectOption: (prompt: string) => void;
}

const INTENT_OPTIONS = [
  {
    id: 'adventure',
    title: 'High Trails & Treks',
    tagline: 'Rugged paths, cascading falls & mountain peaks',
    icon: Mountain,
    badge: 'Adventure',
    prompt: 'I am seeking an adventurous journey with high mountain trails, forest waterfalls, and scenic viewpoints in Pachmarhi.',
    color: 'from-[#8c956a]/20 to-transparent',
    borderColor: 'hover:border-[#8c956a]/60',
  },
  {
    id: 'serenity',
    title: 'Nature & Forest Serenity',
    tagline: 'Misty woods, quiet streams & natural pools',
    icon: Trees,
    badge: 'Peace & Rest',
    prompt: 'Recommend a serene nature escape focused on quiet forests, morning mist, and peaceful water pools.',
    color: 'from-[#9eb094]/20 to-transparent',
    borderColor: 'hover:border-[#9eb094]/60',
  },
  {
    id: 'heritage',
    title: 'Sacred Caves & Heritage',
    tagline: 'Ancient rock shelters, lore & panoramic gorges',
    icon: Landmark,
    badge: 'Culture',
    prompt: 'Tell me about the ancient Pandav caves, sacred lore, and historic viewpoints to explore around Pachmarhi.',
    color: 'from-[#c6cab2]/20 to-transparent',
    borderColor: 'hover:border-[#c6cab2]/60',
  },
  {
    id: 'slow',
    title: 'Slow & Mindful Solitude',
    tagline: 'Unhurried days, fresh mountain air & contemplation',
    icon: HeartHandshake,
    badge: 'Mindful',
    prompt: 'Design a slow, unhurried retreat for rest, quiet walks, and solo reflection in the Satpura hills.',
    color: 'from-[#d6cfcc]/15 to-transparent',
    borderColor: 'hover:border-[#d6cfcc]/50',
  },
];

export const TripIntentCard: React.FC<TripIntentCardProps> = ({ onSelectOption }) => {
  return (
    <section id="trip-intent-section" className="px-4 sm:px-6 lg:px-8 py-10 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1816] via-[#161413] to-[#12100f] border border-[#2d2927] p-6 sm:p-10 shadow-2xl">
        {/* Subtle Ambient Background Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8c956a]/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 border-b border-[#292523] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1b19] border border-[#383432] text-xs font-mono-code text-[#9eb094] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#8c956a]" />
              <span>Interactive Curator</span>
            </div>
            <h2 className="font-ebGaramond text-2xl sm:text-3xl lg:text-4xl text-[#e8e1de] font-normal leading-tight">
              What do you desire from your trip?
            </h2>
            <p className="text-xs sm:text-sm text-[#cfc4c6] max-w-xl font-light leading-relaxed">
              Select what moves your spirit today. Our AI companion will instantly curate a personalized dossier tailored to your mood.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-[#9eb094]/80">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Click any vibe to launch conversation</span>
          </div>
        </div>

        {/* 4 Classy Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {INTENT_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt.prompt)}
                className={`group text-left relative flex flex-col justify-between p-5 rounded-2xl bg-[#1e1b19]/90 backdrop-blur-sm border border-[#2e2a28] ${opt.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-[#252220] cursor-pointer overflow-hidden`}
              >
                {/* Subtle Card Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${opt.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#151311] border border-[#383432] flex items-center justify-center text-[#8c956a] group-hover:scale-110 group-hover:text-[#9eb094] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono-code uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#151311] text-[#c6cab2] border border-[#2a2624]">
                      {opt.badge}
                    </span>
                  </div>

                  <h3 className="font-ebGaramond text-lg text-[#e8e1de] font-medium group-hover:text-white transition-colors mb-1">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-[#cfc4c6]/80 font-light leading-relaxed mb-4">
                    {opt.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-[#8c956a] group-hover:text-[#9eb094] transition-colors pt-2 border-t border-[#282422]">
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
