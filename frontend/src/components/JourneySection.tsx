import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Compass,
  Calendar,
  Volume2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  Clock
} from 'lucide-react';

interface JourneySectionProps {
  onExploreClick?: () => void;
  onOpenAI?: (prompt: string) => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({
  onExploreClick,
  onOpenAI,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'timeline' | 'soundscape' | 'budget' | 'wisdom'>('timeline');
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);

  // Scroll 3D rotation & perspective transform
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.8], [20, 0, -8]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.9, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.5, 1, 1, 0.4]);

  const SOUNDSCAPES = [
    { id: 'temple', title: 'Pachmarhi Sal Forest Chirps & Streams', freq: '432 Hz', mood: 'Peaceful' },
    { id: 'coastal', title: 'Bee Falls Cascade & Mist Whispers', freq: '528 Hz', mood: 'Serene' },
    { id: 'himalaya', title: 'Dhoopgarh Ridge Twilight Breeze', freq: '396 Hz', mood: 'Solitary' },
  ];

  return (
    <section ref={containerRef} id="journey-showcase-section" className="py-24 bg-[#f8f6f1] relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8c956a]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#8c956a]/30 bg-white text-[#8c956a] text-xs font-mono-code tracking-widest uppercase font-semibold shadow-xs">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
            <span>The Sadyaatra Voyage Engine</span>
          </div>

          <h2 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl text-[#2b2728] font-normal tracking-tight">
            How Intentional Journeys <br />
            <span className="italic font-light text-[#8c956a]">Come to Life</span>
          </h2>

          <p className="text-[#4a4542] text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Experience our intelligent voyage operating system. Orchestrate calm day-by-day timelines, atmospheric meditation soundscapes, and transparent budget reality.
          </p>
        </div>

        {/* 3D MACBOOK DEVICE SHOWCASE CONTAINER */}
        <div className="perspective-[1400px] max-w-5xl mx-auto">
          <motion.div
            style={{
              rotateX,
              scale,
              opacity,
              transformStyle: 'preserve-3d',
            }}
            className="transition-all duration-300"
          >
            {/* MacBook Bezel & Screen Chassis */}
            <div className="relative rounded-[32px] p-3 sm:p-4 bg-[#ffffff] border-2 border-[#2b2728]/15 shadow-2xl">
              {/* Camera Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#f8f6f1] rounded-b-md flex items-center justify-center gap-1 z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2b2728]/30" />
                <div className="w-1 h-1 rounded-full bg-[#8c956a]" />
              </div>

              {/* High-DPI Screen Interior Display */}
              <div className="relative rounded-2xl bg-[#f8f6f1] border border-[#2b2728]/10 overflow-hidden text-[#2b2728]">
                {/* Simulated App Top Navigation */}
                <div className="px-4 py-3 bg-white border-b border-[#2b2728]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="font-mono-code text-[11px] text-[#4a4542] ml-2 font-medium">
                      sadyaatra-os // session_orchestrator
                    </span>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex items-center gap-1 bg-[#f8f6f1] p-1 rounded-xl border border-[#2b2728]/10">
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${activeTab === 'timeline'
                          ? 'bg-[#8c956a] text-white font-semibold shadow-xs'
                          : 'text-[#4a4542] hover:text-[#2b2728]'
                        }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">Timeline Planner</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('soundscape')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${activeTab === 'soundscape'
                          ? 'bg-[#8c956a] text-white font-semibold shadow-xs'
                          : 'text-[#4a4542] hover:text-[#2b2728]'
                        }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Soundscapes</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('budget')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${activeTab === 'budget'
                          ? 'bg-[#8c956a] text-white font-semibold shadow-xs'
                          : 'text-[#4a4542] hover:text-[#2b2728]'
                        }`}
                    >
                      <Wallet className="w-3 h-3" />
                      <span className="hidden sm:inline">Budget Ledger</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('wisdom')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${activeTab === 'wisdom'
                          ? 'bg-[#8c956a] text-white font-semibold shadow-xs'
                          : 'text-[#4a4542] hover:text-[#2b2728]'
                        }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span className="hidden sm:inline">Cultural Radar</span>
                    </button>
                  </div>
                </div>

                {/* Screen Content Body */}
                <div className="p-5 sm:p-8 min-h-[380px] bg-[#f8f6f1]">
                  {/* TAB 1: INTERACTIVE TIMELINE PLANNER */}
                  {activeTab === 'timeline' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2b2728]/10 pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#8c956a] uppercase tracking-wider font-semibold">
                            Active Sample • Pachmarhi Sanctuary
                          </span>
                          <h3 className="font-fraunces text-2xl text-[#2b2728]">
                            4-Day Contemplative Voyage Schedule
                          </h3>
                        </div>
                        <span className="text-xs font-mono-code text-[#4a4542]">Pacing: Slow (3.5 hrs active/day)</span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                          <div className="flex items-center justify-between text-xs font-mono-code text-[#8c956a]">
                            <span>DAY 01 • DAWN</span>
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-fraunces text-lg text-[#2b2728]">Pandav Caves Arrival</h4>
                          <p className="text-xs text-[#4a4542] font-light leading-relaxed">
                            Settle into forest-side resort. Afternoon stroll through Pandav cave rock gardens.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#8c956a]/40 space-y-2 relative shadow-xs">
                          <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#8c956a] text-white text-[9px] font-mono-code font-bold">
                            RECOMMENDED
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono-code text-[#8c956a]">
                            <span>DAY 02 • 07:00 AM</span>
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-fraunces text-lg text-[#2b2728]">Bee Falls & Forest Dip</h4>
                          <p className="text-xs text-[#4a4542] font-light leading-relaxed">
                            Early forest drive to Bee Falls and Apsara Vihar natural rock pools for a morning splash.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                          <div className="flex items-center justify-between text-xs font-mono-code text-[#8c956a]">
                            <span>DAY 03 • TWILIGHT</span>
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-fraunces text-lg text-[#2b2728]">Dhoopgarh Sunset Ridge</h4>
                          <p className="text-xs text-[#4a4542] font-light leading-relaxed">
                            Ascend the highest point in Madhya Pradesh to witness golden hour over Satpura ranges.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SOUNDSCAPES STUDIO */}
                  {activeTab === 'soundscape' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2b2728]/10 pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#8c956a] uppercase tracking-wider font-semibold">
                            Acoustic Atmosphere Synthesizer
                          </span>
                          <h3 className="font-fraunces text-2xl text-[#2b2728]">
                            Meditative Environmental Soundscapes
                          </h3>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {SOUNDSCAPES.map((snd) => (
                          <div
                            key={snd.id}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${activeSoundscape === snd.id
                                ? 'bg-white border-[#8c956a] shadow-xs'
                                : 'bg-white border-[#2b2728]/10 hover:border-[#8c956a]/40'
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  setActiveSoundscape((prev) => (prev === snd.id ? null : snd.id))
                                }
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 ${activeSoundscape === snd.id
                                    ? 'bg-[#8c956a] text-white'
                                    : 'bg-[#f8f6f1] text-[#2b2728] hover:bg-[#8c956a] hover:text-white'
                                  }`}
                              >
                                {activeSoundscape === snd.id ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4 ml-0.5" />
                                )}
                              </button>
                              <div>
                                <h4 className="font-fraunces text-lg text-[#2b2728]">{snd.title}</h4>
                                <span className="text-xs font-mono-code text-[#4a4542]">
                                  Harmonic Resonance: {snd.freq} • Mood: {snd.mood}
                                </span>
                              </div>
                            </div>

                            {activeSoundscape === snd.id && (
                              <div className="flex items-center gap-1">
                                {[12, 24, 16, 28, 14, 22, 10].map((h, i) => (
                                  <div
                                    key={i}
                                    className="w-1 bg-[#8c956a] rounded-full animate-pulse"
                                    style={{ height: `${h}px`, animationDelay: `${i * 120}ms` }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: BUDGET LEDGER */}
                  {activeTab === 'budget' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2b2728]/10 pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#8c956a] uppercase tracking-wider font-semibold">
                            Financial Realism Engine
                          </span>
                          <h3 className="font-fraunces text-2xl text-[#2b2728]">
                            Granular Spending Estimation
                          </h3>
                        </div>
                        <span className="text-sm font-mono-code text-[#8c956a] font-bold">
                          Estimated Total: ₹14,000 / person
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-1 shadow-xs">
                          <span className="text-[11px] font-mono-code text-[#4a4542] uppercase">Stay & Lodging</span>
                          <div className="text-lg font-medium text-[#2b2728]">₹7,500</div>
                          <p className="text-xs text-[#4a4542]/70">3 Nights in forest-side resort</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-1 shadow-xs">
                          <span className="text-[11px] font-mono-code text-[#4a4542] uppercase">Culinary Dining</span>
                          <div className="text-lg font-medium text-[#2b2728]">₹3,500</div>
                          <p className="text-xs text-[#4a4542]/70">Local thalis & hillside tea</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-1 shadow-xs">
                          <span className="text-[11px] font-mono-code text-[#4a4542] uppercase">Transit & Access</span>
                          <div className="text-lg font-medium text-[#2b2728]">₹3,000</div>
                          <p className="text-xs text-[#4a4542]/70">Gypsy safari & park permits</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CULTURAL RADAR */}
                  {activeTab === 'wisdom' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2b2728]/10 pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#8c956a] uppercase tracking-wider font-semibold">
                            Mindful Etiquette & Local Wisdom
                          </span>
                          <h3 className="font-fraunces text-2xl text-[#2b2728]">
                            Respectful Travel Protocols
                          </h3>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                          <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Sanctuary Modesty & Cave Protocols</span>
                          </div>
                          <p className="text-xs text-[#4a4542] font-light leading-relaxed">
                            Maintain quiet voices in sacred cave structures. Footwear should be removed at temple entrances.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                          <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] font-semibold">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Satpura Biosphere Protection</span>
                          </div>
                          <p className="text-xs text-[#4a4542] font-light leading-relaxed">
                            Do not leave plastic trash in forest waterfall zones. Use designated Gypsy vehicles for national park excursions.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom MacBook Keyboard Base */}
              <div className="h-4 bg-[#ffffff] rounded-b-2xl border-t border-[#2b2728]/10 mt-1 flex items-center justify-center">
                <div className="w-24 h-1 bg-[#2b2728]/20 rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
