import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Compass, Sparkles, MapPin, ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Destination } from '../types';

interface CuratedCarouselProps {
  destinations: Destination[];
  onSelectDestination: (dest: Destination) => void;
}

export const CuratedCarousel: React.FC<CuratedCarouselProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<'normal' | 'slow'>('normal');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const filteredDestinations = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.region === activeCategory || d.destinationTypes.includes(activeCategory as any));

  // Single list display - show each destination once
  const displayList = filteredDestinations;

  // Auto-scroll logic
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollStep = speed === 'normal' ? 0.8 : 0.4;

    const scrollLoop = () => {
      if (isPlaying && container) {
        container.scrollLeft += scrollStep;

        // Reset scroll position smoothly when reaching the end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    animationFrameRef.current = requestAnimationFrame(scrollLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speed, filteredDestinations]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -360 : 360;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="curated-carousel-section" className="py-16 bg-[#131110] border-y border-[#252220] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Editorial Heading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-code text-[#9EB094] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Sanctuary Marquee</span>
          </div>
          <h2 className="font-ebGaramond text-3xl sm:text-4xl text-[#e8e1de] font-normal">
            Highlighted Vistas & Quiet Escapes
          </h2>
          <p className="text-xs sm:text-sm text-[#cfc4c6] max-w-lg font-light">
            Continuous showcase of hand-selected retreats across the Indian subcontinent and sacred international sanctuaries.
          </p>
        </div>

        {/* Carousel Control Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 bg-[#1a1816] p-1 rounded-full border border-[#2d2927]">
            {['All', 'Mountains', 'Beach', 'Spiritual', 'Heritage'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${activeCategory === cat
                  ? 'bg-[#9EB094] text-[#100e0c] font-semibold'
                  : 'text-[#cfc4c6] hover:text-[#e8e1de]'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Play/Pause & Speed */}
          <div className="flex items-center gap-1.5 bg-[#1a1816] p-1 rounded-full border border-[#2d2927]">
            <button
              id="carousel-play-pause-btn"
              onClick={() => setIsPlaying((p) => !p)}
              className="w-7 h-7 rounded-full bg-[#252220] flex items-center justify-center text-[#e8e1de] hover:text-[#9EB094] transition-colors"
              title={isPlaying ? 'Pause Marquee' : 'Play Marquee'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>


          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleManualScroll('left')}
              className="w-8 h-8 rounded-full bg-[#1e1b19] border border-[#2d2927] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] hover:border-[#383432] transition-colors"
              title="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="w-8 h-8 rounded-full bg-[#1e1b19] border border-[#2d2927] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] hover:border-[#383432] transition-colors"
              title="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
        className="flex gap-6 overflow-x-auto no-scrollbar px-4 sm:px-8 cursor-grab active:cursor-grabbing select-none py-4"
        style={{ scrollBehavior: isPlaying ? 'auto' : 'smooth' }}
      >
        {displayList.map((dest, idx) => (
          <div
            key={`${dest.id}-${idx}`}
            onClick={() => onSelectDestination(dest)}
            className="group relative flex-shrink-0 w-[300px] sm:w-[340px] bg-[#1a1816] rounded-2xl overflow-hidden border border-[#2d2927] hover:border-[#9EB094]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#100e0c]">
              <img
                src={dest.heroImage}
                alt={dest.name}
                className="w-full h-full object-cover img-zoom transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1816] via-[#1a1816]/20 to-transparent" />

              {/* Tag & Match Score */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#100e0c]/80 backdrop-blur-md border border-[#383432] text-[10px] font-mono-code text-[#9EB094] uppercase tracking-wider">
                  {dest.tag}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#100e0c]/80 backdrop-blur-md border border-[#383432] text-[10px] font-mono-code text-[#e8e1de] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#9EB094]" />
                  {dest.matchScore}%
                </span>
              </div>

              {/* Coordinates & Elevation */}
              {dest.coordinates && (
                <div className="absolute bottom-3 left-3 text-[10px] font-mono-code text-[#cfc4c6]/80 bg-[#100e0c]/80 px-2.5 py-1 rounded-full border border-[#383432] flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#9EB094]" />
                  <span>{dest.coordinates.formatted}</span>
                </div>
              )}
            </div>

            {/* Body Info */}
            <div className="p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <h3 className="font-ebGaramond text-2xl text-[#e8e1de] group-hover:text-[#9EB094] transition-colors">
                  {dest.name}
                </h3>
                <span className="text-[11px] font-mono-code text-[#cfc4c6]/60 uppercase">
                  {dest.state || dest.country}
                </span>
              </div>

              <p className="text-xs text-[#cfc4c6] line-clamp-2 leading-relaxed font-light">
                {dest.shortDescription}
              </p>

              <div className="pt-3 border-t border-[#2d2927] flex items-center justify-between text-xs font-mono-code text-[#cfc4c6]/80">
                <span>{dest.idealDuration}</span>
                <div className="flex items-center gap-1 text-[#9EB094] group-hover:translate-x-1 transition-transform">
                  <span>Explore Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
