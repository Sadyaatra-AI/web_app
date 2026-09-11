import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Compass, MapPin, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { Region } from '../types';

interface HeroSectionProps {
  onSelectMood: (mood: string) => void;
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  onStartQuiz: () => void;
  onExploreClick?: () => void;
}

const REGIONS: Region[] = ['All', 'North', 'South', 'West', 'East', 'Central', 'International'];

const QUICK_MOODS = [
  { label: 'Slow & Peaceful', icon: '🍃' },
  { label: 'Spiritual', icon: '🪷' },
  { label: 'Mountains', icon: '⛰️' },
  { label: 'Beach', icon: '🌊' },
  { label: 'Heritage', icon: '🏛️' },
  { label: 'Adventure', icon: '🧗' },
];

// ── Parallax sub-components (each owns its own useTransform calls) ─────────

const FrontMountain: React.FC<{ scrollYProgress: MotionValue<number>; bgBrightness: MotionValue<number> }> = ({
  scrollYProgress,
  bgBrightness,
}) => {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  return (
    <motion.img
      src="/images/hero/front-mountain.png"
      alt=""
      className="absolute inset-0 w-full h-full object-cover object-[60%_bottom] scale-[1.06]"
      style={{ y, filter: `brightness(${bgBrightness}) saturate(1.1)` } as React.CSSProperties}
    />
  );
};

const MistLayer: React.FC<{ scrollYProgress: MotionValue<number> }> = ({ scrollYProgress }) => {
  const yMistLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);
  const yMistRight = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);
  return (
    <>
      {/* Left mist panel */}
      <motion.img
        src="/images/hero/mist-left.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-left-center scale-[1.1]"
        style={{ y: yMistLeft, opacity: 0.72 } as React.CSSProperties}
      />
      {/* Heavy cloud/mist crossing between layers – screen blend */}
      <motion.img
        src="/images/hero/background-mountain.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-right scale-[1.12]"
        style={{ y: yMistRight, opacity: 0.35, mixBlendMode: 'screen' } as React.CSSProperties}
      />
    </>
  );
};

const TempleLayer: React.FC<{ scrollYProgress: MotionValue<number>; bgBrightness: MotionValue<number> }> = ({
  scrollYProgress,
  bgBrightness,
}) => {
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  return (
    <motion.img
      src="/images/hero/temple.png"
      alt="Himalayan monastery nestled in misty forest"
      className="absolute w-[34vw] max-w-[500px] min-w-[260px] right-[5%] bottom-[7%] object-contain"
      style={{
        y,
        scale,
        filter: `brightness(${bgBrightness}) drop-shadow(0 20px 60px rgba(43,39,40,0.15))`,
      } as React.CSSProperties}
    />
  );
};

// ─────────────────────────────────────────────────────────────────────────────

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectMood,
  selectedRegion,
  onSelectRegion,
  onStartQuiz,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Scroll parallax & brightness brightening effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const maskScale = useTransform(scrollYProgress, [0, 0.7], [1, 2.5]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [0.95, 0.85, 0.3]);
  const mountainY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgBrightness = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.1]);

  // Ambient sound synthesizer
  const toggleAmbientSound = () => {
    if (isAudioPlaying) {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(144, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsAudioPlaying(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch { }
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch { }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[95vh] lg:min-h-[105vh] bg-[#f8f6f1] overflow-hidden flex flex-col justify-between"
    >
      {/* ═══════════════════════════════════════════════ */}
      {/* 1. CINEMATIC 4-LAYER PARALLAX BACKGROUND       */}
      {/* ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">

        {/* ── LAYER 1 · Background mountain (slowest parallax) ── */}
        <motion.img
          src="/images/hero/background-mountain.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[60%_center] scale-[1.08]"
          style={{
            y: mountainY,
            filter: `brightness(${bgBrightness}) saturate(1.15)`,
          } as React.CSSProperties}
        />

        {/* ── LAYER 2 · SVG map contour (behind mist, left-anchored) ── */}
        <motion.div
          style={{
            scale: maskScale,
            opacity: maskOpacity,
          }}
          className="absolute inset-0 flex items-center justify-start pl-[6%]"
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-[55vw] max-w-[650px] h-[65vh] max-h-[650px] opacity-20 filter drop-shadow-[0_0_30px_rgba(140,149,106,0.2)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="mapGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8c956a" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#9eb094" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#c6cab2" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <path
              d="M 500 80 C 580 80, 680 140, 720 220 C 760 300, 740 400, 760 480 C 780 560, 700 680, 620 780 C 540 880, 500 940, 490 950 C 480 940, 440 880, 360 780 C 280 680, 220 560, 240 460 C 260 360, 320 220, 380 140 C 420 80, 460 80, 500 80 Z"
              fill="url(#mapGradLight)"
              stroke="#8c956a"
              strokeWidth="1.8"
              strokeDasharray="4 4"
            />
            <circle cx="485" cy="850" r="5" fill="#8c956a" className="animate-ping" style={{ transformOrigin: '485px 850px' }} />
            <circle cx="485" cy="850" r="3" fill="#2b2728" />
            <text x="500" y="855" fill="#8c956a" fontSize="12" fontFamily="Space Mono" fontWeight="600" letterSpacing="2">GOKARNA • 14.54°N</text>
            <circle cx="480" cy="540" r="5" fill="#a66f5b" />
            <text x="495" y="545" fill="#a66f5b" fontSize="12" fontFamily="Space Mono" fontWeight="600">PACHMARHI • 22.46°N</text>
          </svg>
        </motion.div>

        {/* ── LAYER 3 · Front mountain / vegetation (medium speed) ── */}
        <FrontMountain scrollYProgress={scrollYProgress} bgBrightness={bgBrightness} />

        {/* ── LAYER 4 · Mist-left panel (drifts slightly upward) ── */}
        <MistLayer scrollYProgress={scrollYProgress} />

        {/* ── LAYER 5 · Temple / focal point (fastest upward – feels closest) ── */}
        <TempleLayer scrollYProgress={scrollYProgress} bgBrightness={bgBrightness} />

        {/* ── Warm cinematic colour grade ── */}
        <div className="absolute inset-0 bg-[#8c956a]/[0.06] mix-blend-color pointer-events-none" />

        {/* ── Soft readability gradient (top + bottom) ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f6f1]/70 via-transparent to-[#f8f6f1] pointer-events-none" />

      </div>

      {/* 2. TOP HUD CONTROLS */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#2b2728]/10 text-[11px] font-mono-code text-[#8c956a] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#8c956a] animate-pulse" />
            <span className="font-semibold">SEASON 2026 • SANCTUARIES READY</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <button
            id="hero-ambient-audio-toggle"
            onClick={toggleAmbientSound}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code transition-all border ${isAudioPlaying
                ? 'bg-[#8c956a] text-white border-[#8c956a]'
                : 'bg-white/90 border-[#2b2728]/15 text-[#4a4542] hover:text-[#2b2728]'
              }`}
            title="Toggle meditative ambient soundscape"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAudioPlaying ? 'Soundscape Active' : 'Soundscape'}</span>
          </button>
        </motion.div>
      </div>

      {/* 3. HERO EDITORIAL HEADLINE & AI INTENT BOX */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-6"
      >
        {/* Curatorial Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8c956a]/30 bg-white/90 backdrop-blur-md text-[#8c956a] text-xs font-mono-code tracking-widest uppercase shadow-sm"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
          <span>Sadyaatra • Mindful Travel Agency</span>
        </motion.div>

        {/* User Specified Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-fraunces text-4xl sm:text-6xl md:text-7xl font-normal text-[#2b2728] tracking-tight leading-[1.08]"
        >
          Journeys Designed for the <br />
          <span className="italic font-light text-[#8c956a]">Contemplative</span> Soul
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#4a4542] text-lg sm:text-xl max-w-lg mx-auto font-light leading-relaxed"
        >
          Slow travel, soulful sanctuaries, and journeys that stay with you forever.
        </motion.p>

        {/* Begin My Journey CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="pt-2 flex items-center justify-center gap-4"
        >
          <button
            id="hero-begin-journey-btn"
            onClick={onExploreClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#2b2728] hover:bg-[#8c956a] text-white font-semibold text-sm tracking-wide transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#8c956a]/25 overflow-hidden"
          >
            {/* Animated shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
            <span className="relative">Begin my journey</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          <button
            id="hero-scroll-explore-btn"
            onClick={onExploreClick}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/90 hover:bg-white border border-[#2b2728]/10 hover:border-[#8c956a]/40 text-[#2b2728] font-medium text-sm tracking-wide transition-all duration-300 shadow-sm backdrop-blur-md"
          >
            <span>Explore sanctuaries</span>
          </button>
        </motion.div>
      </motion.div>

      {/* 4. BOTTOM FILTER & MOOD CONTROLS */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 space-y-4">
        {/* Territory Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {REGIONS.map((r) => (
            <button
              key={r}
              id={`hero-region-btn-${r.toLowerCase()}`}
              onClick={() => onSelectRegion(r)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code tracking-wider uppercase transition-all ${selectedRegion === r
                  ? 'bg-[#8c956a] text-white font-bold shadow-md'
                  : 'bg-white/90 backdrop-blur-md border border-[#2b2728]/10 text-[#4a4542] hover:text-[#2b2728] hover:border-[#8c956a]/40'
                }`}
            >
              {r === 'All' ? 'All Territories' : r}
            </button>
          ))}
        </div>

        {/* Quick Mood Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {QUICK_MOODS.map((m) => (
            <button
              key={m.label}
              id={`hero-mood-btn-${m.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectMood(m.label)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#2b2728]/10 text-xs text-[#4a4542] hover:text-[#2b2728] transition-colors shadow-sm"
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Geodetic Coordinate Ticker */}
        <div className="flex items-center justify-between text-[10px] font-mono-code text-[#4a4542]/50 border-t border-[#2b2728]/10 pt-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-[#8c956a]" />
            <span>LAT 08°04′N – 37°06′N • LON 68°07′E – 97°25′E</span>
          </div>
          <span className="hidden sm:inline">SCROLL TO BRIGHTEN & DISCOVER SANCTUARIES ↓</span>
        </div>
      </div>
    </div>
  );
};
