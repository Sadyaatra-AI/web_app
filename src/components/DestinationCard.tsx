import React from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, MapPin, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelect: (destination: Destination) => void;
  index: number;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isSaved,
  onToggleSave,
  onSelect,
  index,
}) => {
  const poeticTag = destination.poeticTagline || `For unhurried mornings and contemplative mountain stays.`;
  const featureTagsList = destination.featureTags || ['Forests', 'Waterfalls', 'Caves', 'Slow mornings'];

  return (
    <motion.div
      id={`destination-card-${destination.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-white border border-[#2b2728]/12 hover:border-[#8c956a] rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#2b2728]/5"
    >
      {/* Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f8f6f1] cursor-pointer" onClick={() => onSelect(destination)}>
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />

        {/* Soft Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#2b2728]/10 text-[11px] font-mono-code text-[#8c956a] font-semibold tracking-wider uppercase pointer-events-auto shadow-sm">
            {destination.tag}
          </span>

          <div className="flex items-center gap-2 pointer-events-auto">
            {/* AI Trust Widget */}
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#8c956a]/40 text-[11px] font-mono-code text-[#2b2728] font-semibold flex items-center gap-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#8c956a]" />
              {destination.matchScore}% Journey Fit
            </span>
            <button
              id={`save-btn-${destination.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(destination.id);
              }}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md border border-[#2b2728]/10 flex items-center justify-center text-[#2b2728] hover:text-[#8c956a] transition-transform active:scale-90 shadow-sm"
              title={isSaved ? 'Remove from saved' : 'Save destination'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#8c956a] text-[#8c956a]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Duration Badge & Location */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-medium drop-shadow-md">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#c6cab2] shrink-0" />
            <span className="truncate">
              {destination.state ? `${destination.state}, ` : ''}{destination.country}
            </span>
          </div>

          <span className="px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-mono-code uppercase text-[#e9e5d8] border border-white/20">
            {destination.idealDuration}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h3
              onClick={() => onSelect(destination)}
              className="font-fraunces text-2xl text-[#2b2728] group-hover:text-[#8c956a] transition-colors cursor-pointer font-medium"
            >
              {destination.name}
            </h3>
            <span className="font-mono-code text-[11px] text-[#4a4542] uppercase tracking-wider bg-[#f8f6f1] px-2 py-0.5 rounded-md border border-[#2b2728]/10">
              {destination.region}
            </span>
          </div>

          {/* Poetic Tagline */}
          <p className="text-sm text-[#8c956a] font-fraunces italic leading-relaxed">
            "{poeticTag}"
          </p>

          <p className="text-xs sm:text-sm text-[#4a4542] line-clamp-2 leading-relaxed font-light">
            {destination.shortDescription}
          </p>
        </div>

        {/* Feature Tags List */}
        <div className="space-y-3 pt-3 border-t border-[#2b2728]/10">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#4a4542]">
            {featureTagsList.map((tag, idx) => (
              <span key={tag} className="inline-flex items-center gap-1 text-[11px] font-mono-code text-[#4a4542] bg-[#f8f6f1] px-2 py-0.5 rounded-full border border-[#2b2728]/10">
                <span>{tag}</span>
                {idx < featureTagsList.length - 1 && <span className="text-[#8c956a] font-bold">·</span>}
              </span>
            ))}
          </div>

          {/* AI Rationale Trust Badge */}
          <div className="p-2.5 rounded-xl bg-[#f8f6f1] border border-[#8c956a]/20 flex items-start gap-2 text-xs text-[#4a4542]">
            <CheckCircle2 className="w-4 h-4 text-[#8c956a] shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight">
              Selected by Sadhyatra AI for quiet sal forest trails, waterfall pools & scenic ridge sunsets.
            </span>
          </div>

          {/* User Requested CTA Button */}
          <button
            id={`view-details-${destination.id}`}
            onClick={() => onSelect(destination)}
            className="w-full py-3 px-4 rounded-xl bg-[#8c956a] hover:bg-[#7a835a] text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm group/btn"
          >
            <span>Why Sadhyatra chose this for you</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
