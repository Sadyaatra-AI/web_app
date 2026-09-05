import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Laptop,
  Compass,
  Sparkles,
  Calendar,
  Volume2,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Play,
  Pause,
  ArrowRight,
  Clock,
  MapPin
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

  // Scroll 3D rotation & perspective transform (Reference: Pagecoder.ai MacBook scroll effect)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.8], [25, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.8], [0.88, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.4, 1, 1, 0.3]);

  // Soundscape presets
  const SOUNDSCAPES = [
    { id: 'temple', title: 'Varanasi Dawn Bells & Vedic Chants', freq: '432 Hz', mood: 'Spiritual' },
    { id: 'coastal', title: 'Gokarna Sunset Tides & Palm Rustle', freq: '528 Hz', mood: 'Peaceful' },
    { id: 'himalaya', title: 'Spiti High-Altitude Pine Winds', freq: '396 Hz', mood: 'Solitary' },
  ];

  return (
    <section ref={containerRef} id="journey-showcase-section" className="py-24 bg-[#110f0e] relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#9EB094]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#383432] bg-[#1a1816] text-[#9EB094] text-xs font-mono-code tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
            <span>The Sadyaatra Voyage Engine</span>
          </div>

          <h2 className="font-ebGaramond text-4xl sm:text-5xl lg:text-6xl text-[#e8e1de] font-normal tracking-tight">
            How Intentional Journeys <br />
            <span className="italic font-light text-[#9EB094]">Come to Life</span>
          </h2>

          <p className="text-[#cfc4c6] text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
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
            <div className="relative rounded-[28px] p-3 sm:p-4 bg-gradient-to-b from-[#2e2a28] via-[#1c1918] to-[#12100f] border-2 border-[#423d3a] shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
              {/* Camera Notch & Sensor */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-3 bg-[#12100f] rounded-b-md flex items-center justify-center gap-1 z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-[#383432]" />
                <div className="w-1 h-1 rounded-full bg-[#9EB094]/60" />
              </div>

              {/* High-DPI Screen Interior Display */}
              <div className="relative rounded-2xl bg-[#151311] border border-[#2d2927] overflow-hidden text-[#e8e1de]">
                {/* Simulated App Top Navigation */}
                <div className="px-4 py-3 bg-[#1e1b19] border-b border-[#2d2927] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="font-mono-code text-[11px] text-[#cfc4c6]/70 ml-2">
                      sadyaatra-os // session_orchestrator
                    </span>
                  </div>

                  {/* Tabs Selector */}
                  <div className="flex items-center gap-1 bg-[#151311] p-1 rounded-xl border border-[#2d2927]">
                    <button
                      onClick={() => setActiveTab('timeline')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${
                        activeTab === 'timeline'
                          ? 'bg-[#9EB094] text-[#100e0c] font-semibold shadow-sm'
                          : 'text-[#cfc4c6] hover:text-[#e8e1de]'
                      }`}
                    >
                      <Calendar className="w-3 h-3" />
                      <span className="hidden sm:inline">Timeline Planner</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('soundscape')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${
                        activeTab === 'soundscape'
                          ? 'bg-[#9EB094] text-[#100e0c] font-semibold shadow-sm'
                          : 'text-[#cfc4c6] hover:text-[#e8e1de]'
                      }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Soundscapes</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('budget')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${
                        activeTab === 'budget'
                          ? 'bg-[#9EB094] text-[#100e0c] font-semibold shadow-sm'
                          : 'text-[#cfc4c6] hover:text-[#e8e1de]'
                      }`}
                    >
                      <Wallet className="w-3 h-3" />
                      <span className="hidden sm:inline">Budget Ledger</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('wisdom')}
                      className={`px-3 py-1 rounded-lg text-xs font-mono-code transition-all flex items-center gap-1.5 ${
                        activeTab === 'wisdom'
                          ? 'bg-[#9EB094] text-[#100e0c] font-semibold shadow-sm'
                          : 'text-[#cfc4c6] hover:text-[#e8e1de]'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span className="hidden sm:inline">Cultural Radar</span>
                    </button>
                  </div>
                </div>

                {/* Screen Content Body */}
                <div className="p-5 sm:p-8 min-h-[380px] bg-[#151311]">
                  {/* TAB 1: INTERACTIVE TIMELINE PLANNER */}
                  {activeTab === 'timeline' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2d2927] pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#9EB094] uppercase tracking-wider">
                            Active Itinerary Sample • Gokarna Coastal Sanctuary
                          </span>
                          <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">
                            4-Day Contemplative Voyage Schedule
                          </h3>
                        </div>
                        <span className="text-xs font-mono-code text-[#cfc4c6]/70">Pacing: Slow (4.2 hrs active/day)</span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono-code text-[#9EB094]">
                            <span>DAY 01 • DAWN</span>
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-ebGaramond text-lg text-[#e8e1de]">Cliffside Arrival</h4>
                          <p className="text-xs text-[#cfc4c6] font-light leading-relaxed">
                            Check in to eco-cottage. Hammock reading and dusk sunset walk at Kudle Beach.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#9EB094]/40 space-y-2 relative">
                          <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-[#9EB094] text-[#100e0c] text-[9px] font-mono-code font-bold">
                            RECOMMENDED
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono-code text-[#9EB094]">
                            <span>DAY 02 • 06:30 AM</span>
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-ebGaramond text-lg text-[#e8e1de]">4-Beach Cliff Traverse</h4>
                          <p className="text-xs text-[#cfc4c6] font-light leading-relaxed">
                            Guided sunrise hike from Kudle to Om and secluded Paradise cove. Return by fishing boat.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono-code text-[#9EB094]">
                            <span>DAY 03 • TWILIGHT</span>
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <h4 className="font-ebGaramond text-lg text-[#e8e1de]">Yana Karst Monoliths</h4>
                          <p className="text-xs text-[#cfc4c6] font-light leading-relaxed">
                            Inland excursion into Sahyadri rainforest to explore sacred black limestone rock spires.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: SOUNDSCAPES STUDIO */}
                  {activeTab === 'soundscape' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2d2927] pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#9EB094] uppercase tracking-wider">
                            Acoustic Atmosphere Synthesizer
                          </span>
                          <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">
                            Meditative Environmental Soundscapes
                          </h3>
                        </div>
                      </div>

                      <div className="grid gap-3">
                        {SOUNDSCAPES.map((snd) => (
                          <div
                            key={snd.id}
                            className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                              activeSoundscape === snd.id
                                ? 'bg-[#1e1b19] border-[#9EB094]'
                                : 'bg-[#1a1816] border-[#2d2927] hover:border-[#383432]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() =>
                                  setActiveSoundscape((prev) => (prev === snd.id ? null : snd.id))
                                }
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
                                  activeSoundscape === snd.id
                                    ? 'bg-[#9EB094] text-[#100e0c]'
                                    : 'bg-[#252220] text-[#e8e1de] hover:bg-[#383432]'
                                }`}
                              >
                                {activeSoundscape === snd.id ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4 ml-0.5" />
                                )}
                              </button>
                              <div>
                                <h4 className="font-ebGaramond text-lg text-[#e8e1de]">{snd.title}</h4>
                                <span className="text-xs font-mono-code text-[#cfc4c6]/70">
                                  Harmonic Resonance: {snd.freq} • Mood: {snd.mood}
                                </span>
                              </div>
                            </div>

                            {/* Soundwave animation */}
                            {activeSoundscape === snd.id && (
                              <div className="flex items-center gap-1">
                                {[12, 24, 16, 28, 14, 22, 10].map((h, i) => (
                                  <div
                                    key={i}
                                    className="w-1 bg-[#9EB094] rounded-full animate-pulse"
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
                      <div className="flex items-baseline justify-between border-b border-[#2d2927] pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#9EB094] uppercase tracking-wider">
                            Financial Realism Engine
                          </span>
                          <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">
                            Granular Spending Estimation
                          </h3>
                        </div>
                        <span className="text-sm font-mono-code text-[#9EB094] font-bold">
                          Estimated Total: ₹14,500 / person
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-1">
                          <span className="text-[11px] font-mono-code text-[#cfc4c6]/70 uppercase">Stay & Lodging</span>
                          <div className="text-lg font-medium text-[#e8e1de]">₹6,500</div>
                          <p className="text-xs text-[#cfc4c6]/60">3 Nights in clifftop eco-cottage</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-1">
                          <span className="text-[11px] font-mono-code text-[#cfc4c6]/70 uppercase">Culinary Dining</span>
                          <div className="text-lg font-medium text-[#e8e1de]">₹4,200</div>
                          <p className="text-xs text-[#cfc4c6]/60">Seafood thalis, fresh coconut, cafes</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-1">
                          <span className="text-[11px] font-mono-code text-[#cfc4c6]/70 uppercase">Transit & Permits</span>
                          <div className="text-lg font-medium text-[#e8e1de]">₹3,800</div>
                          <p className="text-xs text-[#cfc4c6]/60">Scenic train & local boat charter</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CULTURAL RADAR */}
                  {activeTab === 'wisdom' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="flex items-baseline justify-between border-b border-[#2d2927] pb-3">
                        <div>
                          <span className="text-[10px] font-mono-code text-[#9EB094] uppercase tracking-wider">
                            Mindful Etiquette & Local Wisdom
                          </span>
                          <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">
                            Respectful Travel Protocols
                          </h3>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                          <div className="flex items-center gap-2 text-xs font-mono-code text-[#9EB094]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Sanctum Modesty & Dress Code</span>
                          </div>
                          <p className="text-xs text-[#cfc4c6] font-light leading-relaxed">
                            Shoulders and knees must be covered inside temple enclosures. Footwear is removed at the stone threshold.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                          <div className="flex items-center gap-2 text-xs font-mono-code text-[#9EB094]">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Leave No Trace Ecology</span>
                          </div>
                          <p className="text-xs text-[#cfc4c6] font-light leading-relaxed">
                            Carry out all personal waste from secluded coves and high-altitude trails. Avoid single-use plastic water bottles.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom MacBook Keyboard Base Shadow */}
              <div className="h-4 bg-[#1e1b19] rounded-b-2xl border-t border-[#383432] mt-1 flex items-center justify-center">
                <div className="w-24 h-1 bg-[#383432] rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
