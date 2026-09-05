import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Compass, Sparkles, MapPin, ArrowRight, Eye, Layers, Sliders, Volume2, VolumeX } from 'lucide-react';
import { Region } from '../types';

interface HeroSectionProps {
  onSelectMood: (mood: string) => void;
  selectedRegion: Region;
  onSelectRegion: (region: Region) => void;
  onStartQuiz: () => void;
  onExploreClick?: () => void;
}

const REGIONS: Region[] = ['All', 'South', 'North', 'West', 'East', 'International'];

const QUICK_MOODS = [
  { label: 'Slow & Peaceful', icon: '🍃' },
  { label: 'Spiritual', icon: '🪷' },
  { label: 'Mountains', icon: '⛰️' },
  { label: 'Beach', icon: '🌊' },
  { label: 'Heritage', icon: '🏛️' },
  { label: 'Adventure', icon: '🧗' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectMood,
  selectedRegion,
  onSelectRegion,
  onStartQuiz,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeLayer, setActiveLayer] = useState<'all' | 'mountains' | 'coasts'>('all');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Scroll parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const maskScale = useTransform(scrollYProgress, [0, 0.7], [1, 2.8]);
  const maskOpacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [0.95, 0.8, 0.2]);
  const mountainY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const cloudsY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

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

        // Create warm ambient drone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(144, ctx.currentTime); // Deep soothing tone (F#)

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
        } catch {}
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[95vh] lg:min-h-[105vh] bg-[#151311] overflow-hidden flex flex-col justify-between">
      {/* 1. CINEMATIC 3D MAP MASK & MOUNTAIN PARALLAX BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Deep Ambient Atmospheric Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#9EB094]/8 blur-[160px] rounded-full" />
        
        {/* Layer 1: Distant Misty Sky & Celestial Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0c0b] via-[#151311]/90 to-[#151311]" />

        {/* Layer 2: Parallax Layered Mountain Range (Reference: Travelling Distribution) */}
        <motion.div
          style={{ y: mountainY, scale: 1 + (zoomLevel - 1) * 0.2 }}
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
        >
          {/* Background Mountain Panorama */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125 brightness-75 scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85')`,
            }}
          />

          {/* Layer 3: The India & Himalayan Landform SVG MASK Overlay */}
          <motion.div
            style={{
              scale: maskScale,
              opacity: maskOpacity,
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* SVG Mask Container */}
            <svg
              viewBox="0 0 1000 1000"
              className="w-[85vw] max-w-[900px] h-[85vh] max-h-[800px] opacity-35 filter drop-shadow-[0_0_50px_rgba(158,176,148,0.15)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9EB094" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#c2cb9c" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#151311" stopOpacity="0.1" />
                </linearGradient>
                <pattern id="contourGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9EB094" strokeWidth="0.5" strokeOpacity="0.12" />
                </pattern>
              </defs>

              {/* Contoured Topography Grid inside Subcontinent Contour */}
              <path
                d="M 500 80 C 580 80, 680 140, 720 220 C 760 300, 740 400, 760 480 C 780 560, 700 680, 620 780 C 540 880, 500 940, 490 950 C 480 940, 440 880, 360 780 C 280 680, 220 560, 240 460 C 260 360, 320 220, 380 140 C 420 80, 460 80, 500 80 Z"
                fill="url(#mapGrad)"
                stroke="#9EB094"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Internal Elevation Contour Lines */}
              <path
                d="M 460 180 C 520 180, 600 240, 620 320 C 640 400, 600 520, 540 640 C 500 720, 480 800, 475 820 C 470 800, 440 720, 400 640 C 340 520, 320 400, 340 320 C 360 240, 420 180, 460 180 Z"
                fill="url(#contourGrid)"
                stroke="#9EB094"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />

              {/* Northern Himalayan Crest Curve */}
              <path
                d="M 320 220 Q 500 130 680 200"
                stroke="#e8e1de"
                strokeWidth="2"
                strokeOpacity="0.5"
                strokeDasharray="8 6"
              />

              {/* Sanctuary Geopoints */}
              <circle cx="485" cy="850" r="5" fill="#9EB094" className="animate-ping" style={{ transformOrigin: '485px 850px' }} />
              <circle cx="485" cy="850" r="3" fill="#e8e1de" />
              <text x="500" y="855" fill="#9EB094" fontSize="12" fontFamily="Space Mono" letterSpacing="2">GOKARNA • 14.54°N</text>

              <circle cx="380" cy="380" r="4" fill="#9EB094" />
              <text x="260" y="385" fill="#cfc4c6" fontSize="11" fontFamily="Space Mono" opacity="0.8">UDAIPUR • 24.58°N</text>

              <circle cx="530" cy="210" r="4" fill="#9EB094" />
              <text x="545" y="215" fill="#cfc4c6" fontSize="11" fontFamily="Space Mono" opacity="0.8">SPITI • 32.24°N</text>

              <circle cx="680" cy="340" r="4" fill="#9EB094" />
              <text x="695" y="345" fill="#cfc4c6" fontSize="11" fontFamily="Space Mono" opacity="0.8">ZIRO • 27.54°N</text>

              <circle cx="490" cy="910" r="4" fill="#9EB094" />
              <text x="505" y="915" fill="#cfc4c6" fontSize="11" fontFamily="Space Mono" opacity="0.8">MUNNAR • 10.08°N</text>
            </svg>
          </motion.div>
        </motion.div>

        {/* Layer 4: Foreground Drifting Mist & Clouds */}
        <motion.div
          style={{ y: cloudsY }}
          className="absolute inset-0 bg-gradient-to-t from-[#151311] via-transparent to-transparent"
        />

        {/* Top & Bottom Atmospheric Vignettes */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#151311_85%)]" />
      </div>

      {/* 2. TOP HUD: GEODETIC TELEMETRY & AMBIENT AUDIO CONTROLS */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        {/* Curatorial Status */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1b19]/80 backdrop-blur-md border border-[#383432] text-[11px] font-mono-code text-[#9EB094]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9EB094] animate-pulse" />
            <span>SEASON 2026 • 12 SANCTUARIES ACTIVE</span>
          </div>
        </motion.div>

        {/* Live Controls: Audio Drone & Depth Zoom */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {/* Ambient Sound Drone */}
          <button
            id="hero-ambient-audio-toggle"
            onClick={toggleAmbientSound}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code transition-all border ${
              isAudioPlaying
                ? 'bg-[#9EB094]/20 border-[#9EB094] text-[#9EB094]'
                : 'bg-[#1e1b19]/80 border-[#383432] text-[#cfc4c6] hover:text-[#e8e1de]'
            }`}
            title="Toggle meditative ambient soundscape"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-[#9EB094] animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isAudioPlaying ? 'Soundscape Active' : 'Soundscape'}</span>
          </button>

          {/* Interactive Zoom Level Slider */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1b19]/80 border border-[#383432] text-xs font-mono-code text-[#cfc4c6]">
            <Sliders className="w-3 h-3 text-[#9EB094]" />
            <span className="text-[10px] uppercase">Zoom: {zoomLevel.toFixed(1)}x</span>
            <input
              id="hero-mask-zoom-slider"
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-16 accent-[#9EB094] cursor-pointer"
            />
          </div>
        </motion.div>
      </div>

      {/* 3. HERO CENTER EDITORIAL HEADLINE & STATEMENT */}
      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-20 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6"
      >
        {/* Curatorial Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#383432] bg-[#1e1b19]/90 backdrop-blur-md text-[#8c956a] text-xs font-mono-code tracking-widest uppercase shadow-lg"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
          <span>Sadyaatra • Mindful Travel Sanctuaries</span>
        </motion.div>

        {/* Display Typography Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-fraunces text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#e8e1de] tracking-tight leading-[1.05]"
        >
          Journeys Designed for the <br />
          <span className="italic font-light text-[#8c956a]">Contemplative</span> Soul
        </motion.h1>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#cfc4c6] text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Hand-curated sanctuaries for seekers who treasure unhurried authentic rhythms, sacred geography, and intelligent travel guidance.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <button
            id="hero-explore-catalogue-btn"
            onClick={onExploreClick}
            className="px-6 py-3 rounded-full bg-[#9EB094] hover:bg-[#b0c2a5] text-[#100e0c] font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span>Explore Sanctuaries</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-trip-matcher-btn"
            onClick={onStartQuiz}
            className="px-6 py-3 rounded-full bg-[#1e1b19] hover:bg-[#2d2927] border border-[#383432] text-[#e8e1de] font-medium text-xs tracking-wider uppercase transition-all flex items-center gap-2 hover:border-[#9EB094]/50"
          >
            <Sparkles className="w-4 h-4 text-[#9EB094]" />
            <span>AI Trip Matcher</span>
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
              className={`px-4 py-1.5 rounded-full text-xs font-mono-code tracking-wider uppercase transition-all ${
                selectedRegion === r
                  ? 'bg-[#9EB094] text-[#100e0c] font-bold shadow-md'
                  : 'bg-[#1e1b19]/80 backdrop-blur-md border border-[#2d2927] text-[#cfc4c6] hover:text-[#e8e1de] hover:border-[#383432]'
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
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1b19]/60 hover:bg-[#2d2927] border border-[#2d2927] text-xs text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Geodetic Coordinate Ticker */}
        <div className="flex items-center justify-between text-[10px] font-mono-code text-[#cfc4c6]/40 border-t border-[#2d2927]/60 pt-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-[#9EB094]/60" />
            <span>LAT 08°04′N – 37°06′N • LON 68°07′E – 97°25′E</span>
          </div>
          <span className="hidden sm:inline">SCROLL TO ZOOM INTO SANCTUARY CONTOURS ↓</span>
        </div>
      </div>
    </div>
  );
};
