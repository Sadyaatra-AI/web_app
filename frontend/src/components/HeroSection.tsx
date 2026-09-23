import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { Compass, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { Region } from '../types';

interface HeroSectionProps {
  onSelectMood: (mood: string) => void;
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  onStartQuiz: () => void;
  onExploreClick?: () => void;
}

const REGIONS: Region[] = ['All', 'North', 'South', 'West', 'East', 'Central', 'International'];


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
      style={{ y, filter: `brightness(${bgBrightness}) saturate(1.1)` } as any}
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
        style={{ y: yMistLeft, opacity: 0.72 } as any}
      />
      {/* Heavy cloud/mist crossing between layers – screen blend */}
      <motion.img
        src="/images/hero/background-mountain.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-right scale-[1.12]"
        style={{ y: yMistRight, opacity: 0.35, mixBlendMode: 'screen' } as any}
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
      } as any}
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
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.1]);

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
      {/* CINEMATIC HERO BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">

        {/* Main photograph */}
        <motion.img
          src="public/images/hero/original.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[62%_center]"
          style={{
            y: mountainY,
            scale: 1.04,
          }}
        />

        {/* Soft atmospheric wash — very subtle */}
        <div className="absolute inset-0 bg-[#8c956a]/[0.035] mix-blend-color" />

        {/* Readability gradient — concentrated behind the text */}
        <div
          className="absolute inset-0"
          style={{
            background: `
        linear-gradient(
          90deg,
          rgba(248,246,241,0.82) 0%,
          rgba(248,246,241,0.58) 27%,
          rgba(248,246,241,0.12) 58%,
          rgba(248,246,241,0.02) 100%
        ),
        linear-gradient(
          0deg,
          rgba(248,246,241,0.35) 0%,
          transparent 35%
        )
      `,
          }}
        />

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
            <span className="font-semibold">SEASON 2026 • RETREATS READY</span>
          </div>
        </motion.div>
      </div>

      {/* 3. HERO EDITORIAL HEADLINE & AI INTENT BOX */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-20 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 my-auto py-8 space-y-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#8c956a]/30 bg-white/90 backdrop-blur-md text-[#8c956a] text-xs font-mono-code tracking-widest uppercase shadow-sm"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
          <span>SADHYAATRA • Create Your Journey</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-fraunces text-4xl sm:text-6xl md:text-7xl font-normal text-[#2b2728] tracking-tight leading-[1.08]"
        >
          Journeys Designed for the <br />
          <span className="relative inline-block mt-2">
            <span className="italic font-light text-[#8c956a]">Contemplative</span>
          </span> Soul
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#4a4542] text-lg sm:text-xl max-w-lg mx-auto font-light leading-relaxed"
        >
          Slow travel, soulful retreats, and journeys that stay with you forever.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="pt-2 flex items-center justify-center"
        >
          <button
            id="hero-begin-journey-btn"
            onClick={onExploreClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#2b2728] hover:bg-[#8c956a] text-white font-semibold text-sm tracking-wide transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-[#8c956a]/25 overflow-hidden"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
            <span className="relative">Get inspired</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Geodetic easter egg — subtle but readable */}
      <div className="mt-5 flex items-center justify-center gap-2 text-[#2b2728]/50">
        <MapPin
          className="w-3 h-3 text-[#8c956a]/55"
          strokeWidth={1.5}
        />

        <span className="text-[9px] font-mono-code tracking-[0.18em]">
          LAT 08°04′N – 37°06′N &nbsp;•&nbsp; LON 68°07′E – 97°25′E
        </span>
      </div>

      {/* 5. SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-8 mb-6 flex flex-col items-center justify-center gap-3 cursor-pointer group z-20"
        onClick={onExploreClick}
      >
        <span className="text-xs font-mono-code uppercase tracking-[0.3em] text-[#2b2728]/70 font-semibold group-hover:text-[#8c956a] transition-colors">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-[#2b2728]/20 bg-white/70 backdrop-blur-md shadow-md text-[#2b2728] group-hover:border-[#8c956a] group-hover:text-[#8c956a] group-hover:bg-white group-hover:shadow-lg transition-all"
        >
          <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </div>
  );
};
