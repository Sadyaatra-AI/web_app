import React from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Wallet, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';
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
  return (
    <motion.div
      id={`destination-card-${destination.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative bg-[#1e1b19] border border-[#2d2927] hover:border-[#383432] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
    >
      {/* Image Header */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#100e0c] cursor-pointer" onClick={() => onSelect(destination)}>
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="w-full h-full object-cover img-zoom"
          loading="lazy"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1b19] via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-[#100e0c]/80 backdrop-blur-md border border-[#383432] text-[11px] font-mono-code text-[#9EB094] tracking-wider uppercase pointer-events-auto">
            {destination.tag}
          </span>

          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="px-2 py-0.5 rounded-full bg-[#100e0c]/80 backdrop-blur-md border border-[#383432] text-[11px] font-mono-code text-[#e8e1de] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#9EB094]" />
              {destination.matchScore}%
            </span>
            <button
              id={`save-btn-${destination.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(destination.id);
              }}
              className="w-8 h-8 rounded-full bg-[#100e0c]/80 backdrop-blur-md border border-[#383432] flex items-center justify-center text-[#e8e1de] hover:text-[#c2cb9c] transition-transform active:scale-90"
              title={isSaved ? 'Remove from saved' : 'Save destination'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#c2cb9c] text-[#c2cb9c]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Location & Coordinates Tag */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#cfc4c6] font-medium drop-shadow-md">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#9EB094] shrink-0" />
            <span className="truncate">
              {destination.state ? `${destination.state}, ` : ''}{destination.country}
            </span>
          </div>
          {destination.coordinates && (
            <span className="hidden sm:inline font-mono-code text-[10px] text-[#cfc4c6]/70 bg-[#100e0c]/80 px-2 py-0.5 rounded-full border border-[#383432]">
              {destination.coordinates.formatted.split(',')[0]}
            </span>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h3
              onClick={() => onSelect(destination)}
              className="font-ebGaramond text-2xl text-[#e8e1de] group-hover:text-[#9EB094] transition-colors cursor-pointer"
            >
              {destination.name}
            </h3>
            <span className="font-mono-code text-[11px] text-[#cfc4c6]/70 uppercase">
              {destination.region}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#cfc4c6] line-clamp-2 leading-relaxed font-light">
            {destination.shortDescription}
          </p>
        </div>

        {/* Metadata & Key Tags */}
        <div className="space-y-3 pt-3 border-t border-[#2d2927]">
          <div className="grid grid-cols-2 gap-2 text-xs text-[#cfc4c6]/80 font-mono-code">
            <div className="flex items-center gap-1.5 truncate">
              <Clock className="w-3.5 h-3.5 text-[#9EB094] shrink-0" />
              <span>{destination.idealDuration}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Wallet className="w-3.5 h-3.5 text-[#9EB094] shrink-0" />
              <span>{destination.budgetTypical ? `₹${(destination.budgetTypical / 1000).toFixed(0)}k typ.` : 'Flexible'}</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              id={`match-btn-${destination.id}`}
              onClick={() => onSelect(destination)}
              className="py-2 px-3 rounded-xl bg-[#1a1816] hover:bg-[#252220] border border-[#2d2927] hover:border-[#9EB094]/40 text-[11px] text-[#9EB094] font-mono-code flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3 h-3" />
              <span>Is this for you?</span>
            </button>
            <button
              id={`view-details-${destination.id}`}
              onClick={() => onSelect(destination)}
              className="py-2 px-3 rounded-xl bg-[#221f1d] hover:bg-[#2d2927] border border-[#383432] text-xs text-[#e8e1de] font-medium flex items-center justify-center gap-1 group-hover:border-[#9EB094]/40 transition-all"
            >
              <span>Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#9EB094] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
