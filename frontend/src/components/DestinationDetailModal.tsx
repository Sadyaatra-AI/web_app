import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  Calendar,
  Clock,
  Wallet,
  Sparkles,
  MapPin,
  Compass,
  Plane,
  Train,
  Car,
  AlertCircle,
  CheckCircle2,
  Share2,
  MessageSquare
} from 'lucide-react';
import { Destination } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onAskAI: (prompt: string, destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
  onAskAI,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (destination) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [destination, onClose]);

  if (!destination) return null;

  return (
    <AnimatePresence>
      <div
        id="destination-detail-modal-overlay"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          id="destination-detail-content"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-[#151311] border border-[#2d2927] sm:rounded-3xl overflow-hidden text-[#e8e1de] shadow-2xl my-auto"
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#151311]/90 backdrop-blur-md border-b border-[#2d2927]">
            <div className="flex items-center gap-3">
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
              <div>
                <h2 className="font-ebGaramond text-xl sm:text-2xl text-[#e8e1de] leading-none">
                  {destination.name}
                </h2>
                <span className="font-mono-code text-[11px] text-[#9EB094] uppercase tracking-wider">
                  {destination.tag}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="modal-save-btn"
                onClick={() => onToggleSave(destination.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1b19] border border-[#383432] text-xs font-medium text-[#e8e1de] hover:border-[#9EB094]/50 transition-colors"
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#c2cb9c] text-[#c2cb9c]' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                id="modal-share-btn"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Sadyaatra — ${destination.name}`,
                      text: destination.shortDescription,
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Sanctuary link copied to clipboard!');
                  }
                }}
                className="w-9 h-9 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Media */}
          <div className="relative aspect-[21/9] sm:aspect-[21/8] overflow-hidden bg-[#100e0c]">
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-[#151311]/20 to-transparent" />
            
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#cfc4c6] bg-[#100e0c]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#383432]">
                <MapPin className="w-3.5 h-3.5 text-[#9EB094]" />
                <span>{destination.state ? `${destination.state}, ` : ''}{destination.country}</span>
              </div>
              <div className="text-xs font-mono-code text-[#9EB094] bg-[#100e0c]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#383432] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Curated Match: {destination.matchScore}%</span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-10">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#1e1b19] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#9EB094]" />
                  <span>Best Season</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de]">{destination.bestTime}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1e1b19] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#9EB094]" />
                  <span>Duration</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de]">{destination.idealDuration}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1e1b19] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Wallet className="w-3.5 h-3.5 text-[#9EB094]" />
                  <span>Budget Tier</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de] truncate">{destination.budgetFormatted}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#1e1b19] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#9EB094]" />
                  <span>Travel Archetype</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de] truncate">{destination.destinationTypes[0]}</div>
              </div>
            </div>

            {/* Narrative Editorial */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#9EB094] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#9EB094]" />
                <span>The Curated Narrative</span>
              </div>
              <p className="font-ebGaramond text-xl sm:text-2xl text-[#e8e1de] leading-relaxed font-normal">
                "{destination.fullDescription}"
              </p>
            </div>

            {/* Why Go Highlights */}
            <div className="space-y-4">
              <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">Why This Destination Matters</h3>
              <div className="grid gap-3">
                {destination.whyGo.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927]">
                    <CheckCircle2 className="w-4 h-4 text-[#9EB094] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#cfc4c6] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Sanctuaries & Attractions */}
            {destination.attractions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">Key Sanctuaries & Sights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.attractions.map((att) => (
                    <div
                      key={att.id}
                      className="group overflow-hidden rounded-2xl bg-[#1e1b19] border border-[#2d2927] hover:border-[#383432] transition-colors"
                    >
                      <div className="aspect-[16/9] overflow-hidden bg-[#100e0c]">
                        <img
                          src={att.image}
                          alt={att.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-ebGaramond text-lg text-[#e8e1de]">{att.name}</h4>
                          {att.tag && (
                            <span className="px-2 py-0.5 rounded-full bg-[#100e0c] text-[10px] font-mono-code text-[#9EB094]">
                              {att.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#cfc4c6] leading-relaxed font-light">{att.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Budget Breakdown & Financial Reality */}
            <div className="space-y-4">
              <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">Financial Realism</h3>
              <div className="p-5 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono-code text-[#cfc4c6]/70 uppercase">Stay & Lodging</span>
                    <div className="text-sm font-semibold text-[#e8e1de]">
                      ₹{destination.budgetBreakdown.stay.min.toLocaleString()} – ₹{destination.budgetBreakdown.stay.max.toLocaleString()}
                    </div>
                    <p className="text-xs text-[#cfc4c6]/70">{destination.budgetBreakdown.stay.label}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono-code text-[#cfc4c6]/70 uppercase">Dining & Culinary</span>
                    <div className="text-sm font-semibold text-[#e8e1de]">
                      ₹{destination.budgetBreakdown.food.min.toLocaleString()} – ₹{destination.budgetBreakdown.food.max.toLocaleString()}
                    </div>
                    <p className="text-xs text-[#cfc4c6]/70">{destination.budgetBreakdown.food.label}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-mono-code text-[#cfc4c6]/70 uppercase">Internal Logistics</span>
                    <div className="text-sm font-semibold text-[#e8e1de]">
                      ₹{destination.budgetBreakdown.travel.min.toLocaleString()} – ₹{destination.budgetBreakdown.travel.max.toLocaleString()}
                    </div>
                    <p className="text-xs text-[#cfc4c6]/70">{destination.budgetBreakdown.travel.label}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrival & Logistics */}
            <div className="space-y-4">
              <h3 className="font-ebGaramond text-2xl text-[#e8e1de]">Transit & Arrival</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {destination.gettingThere.flight && (
                  <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                    <div className="flex items-center gap-2 text-[#9EB094] font-medium font-mono-code">
                      <Plane className="w-4 h-4" /> By Air
                    </div>
                    <p className="text-[#cfc4c6] leading-relaxed">{destination.gettingThere.flight}</p>
                  </div>
                )}
                {destination.gettingThere.train && (
                  <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                    <div className="flex items-center gap-2 text-[#9EB094] font-medium font-mono-code">
                      <Train className="w-4 h-4" /> By Rail
                    </div>
                    <p className="text-[#cfc4c6] leading-relaxed">{destination.gettingThere.train}</p>
                  </div>
                )}
                {destination.gettingThere.road && (
                  <div className="p-4 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                    <div className="flex items-center gap-2 text-[#9EB094] font-medium font-mono-code">
                      <Car className="w-4 h-4" /> By Road
                    </div>
                    <p className="text-[#cfc4c6] leading-relaxed">{destination.gettingThere.road}</p>
                  </div>
                )}
              </div>
            </div>

            {/* What to Skip & Mindful Tips */}
            <div className="grid sm:grid-cols-2 gap-4">
              {destination.thingsToSkip && (
                <div className="p-5 rounded-2xl bg-[#221718] border border-[#4c1d1e] space-y-2">
                  <div className="flex items-center gap-2 text-[#ffb4ab] font-medium text-xs font-mono-code uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4" /> What to Avoid / Skip
                  </div>
                  <p className="text-xs sm:text-sm text-[#e8e1de]/90 leading-relaxed font-light">
                    {destination.thingsToSkip}
                  </p>
                </div>
              )}

              {destination.knowBeforeYouGo.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#1e1b19] border border-[#2d2927] space-y-2">
                  <div className="flex items-center gap-2 text-[#9EB094] font-medium text-xs font-mono-code uppercase tracking-wider">
                    <Compass className="w-4 h-4" /> Know Before You Go
                  </div>
                  <ul className="text-xs text-[#cfc4c6] space-y-1.5 list-disc list-inside">
                    {destination.knowBeforeYouGo.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* AI Prompts Footer Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1e1b19] to-[#221f1d] border border-[#383432] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#9EB094] uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consult Sadyaatra AI Assistant</span>
                </div>
                <span className="text-[11px] text-[#cfc4c6]/60">Click any prompt to open consultation</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-2">
                {destination.defaultPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    id={`ai-prompt-btn-${idx}`}
                    onClick={() => {
                      onAskAI(prompt, destination);
                      onClose();
                    }}
                    className="text-left p-3 rounded-xl bg-[#151311] hover:bg-[#2d2927] border border-[#2d2927] text-xs text-[#e8e1de] hover:border-[#9EB094]/50 transition-all flex items-start gap-2 group"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#9EB094] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="line-clamp-2">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
