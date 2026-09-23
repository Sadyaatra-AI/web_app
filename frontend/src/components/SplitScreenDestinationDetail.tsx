import React, { useState, useEffect, useRef } from 'react';
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
  Send,
  User,
  RotateCcw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  MessageSquare,
  Minus,
} from 'lucide-react';
import { Destination, ChatMessage } from '../types';

interface SplitScreenDestinationDetailProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  allDestinations?: Destination[];
}

export const SplitScreenDestinationDetail: React.FC<SplitScreenDestinationDetailProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState<boolean>(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [stayTier, setStayTier] = useState<'budget' | 'heritage' | 'luxury'>('heritage');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (destination) {
      setSelectedPhotoIdx(0);
      setIsChatOpen(true);
      setMessages([
        {
          id: `welcome-${destination.id}`,
          sender: 'assistant',
          text: `Namaste! I am your **Sadhyatra Companion**, with you in **${destination.name}**.\n\nAsk me about places to visit, quiet sal forest trails, local delicacies, or optimal timing for sunset vistas!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [destination]);

  useEffect(() => {
    if (isChatOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoadingAI, isChatOpen]);

  if (!destination) return null;

  const gallery = destination.galleryImages && destination.galleryImages.length > 0
    ? destination.galleryImages
    : [destination.heroImage, destination.secondaryImage || destination.heroImage];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoadingAI) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoadingAI(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          destinationContext: destination,
          history: messages.slice(-4),
        }),
      });

      const data = await response.json();
      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I am reflecting on your inquiry. Please ask once more.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'The connection to the destination intelligence network was interrupted. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const budget = (() => {
    const multiplier = stayTier === 'budget' ? 0.7 : stayTier === 'heritage' ? 1.0 : 1.6;
    const baseStay = (destination.budgetBreakdown.stay.min + destination.budgetBreakdown.stay.max) / 2;
    const baseFood = (destination.budgetBreakdown.food.min + destination.budgetBreakdown.food.max) / 2;
    const baseTravel = (destination.budgetBreakdown.travel.min + destination.budgetBreakdown.travel.max) / 2;
    return {
      stay: Math.round(baseStay * multiplier),
      food: Math.round(baseFood),
      travel: Math.round(baseTravel),
      total: Math.round((baseStay * multiplier) + baseFood + baseTravel),
    };
  })();

  const activeMatch = destination.matchFactors?.find((f) => f.persona === selectedPersona) || {
    persona: 'General Traveler',
    matchPct: destination.matchScore,
    reason: 'Excellent overall synergy with mindful, contemplative voyages.',
  };

  return (
    <AnimatePresence>
      <div
        id="split-screen-destination-modal"
        className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-md flex flex-col"
      >
        {/* TOP DOSSIER HEADER NAVBAR */}
        <header className="h-16 px-4 sm:px-8 bg-[#f8f6f1] border-b border-[#2b2728]/10 flex items-center justify-between z-30 shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white border border-[#2b2728]/15 flex items-center justify-center text-[#2b2728] hover:text-[#8c956a] transition-colors shadow-sm"
              title="Close Dossier (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-fraunces text-xl sm:text-2xl text-[#2b2728] leading-none font-medium">
                  {destination.name}
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-white border border-[#2b2728]/10 text-[10px] font-mono-code text-[#8c956a] font-semibold uppercase">
                  {destination.tag}
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-[#4a4542]">
                {destination.state ? `${destination.state}, ` : ''}{destination.country} • {destination.region} Territory
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileChatOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8c956a] hover:bg-[#7a835a] text-white text-xs font-semibold shadow-sm transition-all"
              title="Ask AI Companion"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI</span>
            </button>

            <button
              onClick={() => onToggleSave(destination.id)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#2b2728]/15 text-xs font-medium text-[#2b2728] hover:border-[#8c956a] transition-colors shadow-sm"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#8c956a] text-[#8c956a]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Destination'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Sadhyatra — ${destination.name}`,
                    text: destination.shortDescription,
                    url: window.location.href,
                  }).catch(() => { });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-10 h-10 rounded-full bg-white border border-[#2b2728]/15 flex items-center justify-center text-[#4a4542] hover:text-[#2b2728] transition-colors shadow-sm"
              title="Share Destination link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN DOSSIER BODY VIEWPORT */}
        <div className="flex-1 flex overflow-hidden relative bg-[#f8f6f1]">
          {/* LEFT/CENTER EDITORIAL CONTENT PANE */}
          <div
            id="editorial-content-pane"
            className="w-full lg:flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-12 no-scrollbar bg-[#f8f6f1]"
          >
            {/* HERO PHOTO & GALLERY THUMBNAILS */}
            <div className="space-y-3">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-white border border-[#2b2728]/10 group shadow-md">
                <img
                  src={gallery[selectedPhotoIdx]}
                  alt={destination.name}
                  className="w-full h-full object-cover img-zoom transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#2b2728]/10 text-xs font-mono-code text-[#2b2728] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Fullscreen Gallery ({gallery.length})</span>
                </button>

                {destination.coordinates && (
                  <div className="absolute top-4 left-4 text-xs font-mono-code text-[#2b2728] font-semibold bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#2b2728]/10 flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#8c956a]" />
                    <span>{destination.coordinates.formatted}</span>
                    {destination.elevation && (
                      <span className="text-[#4a4542]">• {destination.elevation}</span>
                    )}
                  </div>
                )}
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPhotoIdx(i)}
                      className={`relative w-20 sm:w-24 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${selectedPhotoIdx === i
                        ? 'border-[#8c956a] scale-95 shadow-sm'
                        : 'border-[#2b2728]/10 opacity-60 hover:opacity-100'
                        }`}
                    >
                      <img src={img} alt={`Gallery thumbnail ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* KEY QUICK METRICS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#4a4542] font-mono-code mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Optimal Season</span>
                </div>
                <div className="text-sm font-medium text-[#2b2728]">{destination.bestTime}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#4a4542] font-mono-code mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Ideal Duration</span>
                </div>
                <div className="text-sm font-medium text-[#2b2728]">{destination.idealDuration}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#4a4542] font-mono-code mb-1">
                  <Wallet className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Typical Budget</span>
                </div>
                <div className="text-sm font-medium text-[#2b2728] truncate">{destination.budgetFormatted}</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 shadow-xs">
                <div className="flex items-center gap-2 text-xs text-[#4a4542] font-mono-code mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Archetype</span>
                </div>
                <div className="text-sm font-medium text-[#2b2728] truncate">{destination.destinationTypes[0]}</div>
              </div>
            </div>

            {/* CURATED NARRATIVE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#8c956a]" />
                <span>The Curated Narrative</span>
              </div>
              <p className="font-fraunces text-2xl sm:text-3xl text-[#2b2728] leading-relaxed font-normal">
                "{destination.fullDescription}"
              </p>
              {destination.curatorNotes && (
                <div className="p-4 rounded-2xl bg-white border-l-4 border-[#8c956a] border-[#2b2728]/10 text-xs sm:text-sm text-[#4a4542] font-light leading-relaxed shadow-xs">
                  <span className="font-mono-code text-[10px] text-[#8c956a] font-semibold uppercase block mb-1">Curator Note</span>
                  {destination.curatorNotes}
                </div>
              )}
            </div>

            {/* AI PERSONA MATCHING */}
            <div className="p-6 rounded-3xl bg-white border border-[#2b2728]/10 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2b2728]/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span>Travel Style Match</span>
                  </div>
                  <h3 className="font-fraunces text-2xl text-[#2b2728]">
                    Is {destination.name} a Good Fit?
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-[#f8f6f1] px-4 py-2 rounded-2xl border border-[#8c956a]/30">
                  <span className="text-2xl font-bold font-mono-code text-[#8c956a]">
                    {activeMatch.matchPct}%
                  </span>
                  <span className="text-[10px] font-mono-code text-[#4a4542] uppercase leading-tight font-semibold">
                    Persona<br />Synergy
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono-code text-[#4a4542] block">Select travel archetype:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPersona('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${selectedPersona === 'all'
                      ? 'bg-[#8c956a] text-white font-bold shadow-xs'
                      : 'bg-[#f8f6f1] border border-[#2b2728]/10 text-[#4a4542] hover:text-[#2b2728]'
                      }`}
                  >
                    General Mindful Seeker
                  </button>

                  {destination.matchFactors?.map((mf) => (
                    <button
                      key={mf.persona}
                      onClick={() => setSelectedPersona(mf.persona)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${selectedPersona === mf.persona
                        ? 'bg-[#8c956a] text-white font-bold shadow-xs'
                        : 'bg-[#f8f6f1] border border-[#2b2728]/10 text-[#4a4542] hover:text-[#2b2728]'
                        }`}
                    >
                      {mf.persona} ({mf.matchPct}%)
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8f6f1] border border-[#8c956a]/20 space-y-2">
                <div className="text-xs font-mono-code text-[#8c956a] uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Curator Match Rationale</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4a4542] font-light leading-relaxed">
                  {activeMatch.reason}
                </p>
              </div>
            </div>

            {/* PLACES TO VISIT IN DESTINATION (REPLACES DAY-BY-DAY ITINERARY AS REQUESTED BY USER) */}
            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#2b2728]/10 pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Places to Explore</span>
                  </div>
                  <h3 className="font-fraunces text-3xl text-[#2b2728]">
                    Places to Visit in {destination.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleSendMessage(`What are the top must-visit places in ${destination.name} for slow travel?`)}
                  className="text-xs font-mono-code text-[#8c956a] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Ask AI for hidden spots</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* List of Places to Visit */}
              <div className="grid sm:grid-cols-2 gap-6">
                {destination.attractions && destination.attractions.length > 0 ? (
                  destination.attractions.map((att) => (
                    <div
                      key={att.id}
                      className="group overflow-hidden rounded-3xl bg-white border border-[#2b2728]/10 hover:border-[#8c956a] transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#f8f6f1]">
                        <img
                          src={att.image}
                          alt={att.name}
                          className="w-full h-full object-cover img-zoom transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        {att.tag && (
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono-code text-[#8c956a] font-semibold uppercase border border-[#2b2728]/10 shadow-xs">
                            {att.tag}
                          </span>
                        )}
                        <span className="absolute bottom-3 left-3 text-white font-fraunces text-lg drop-shadow-md">
                          {att.name}
                        </span>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <p className="text-xs sm:text-sm text-[#4a4542] leading-relaxed font-light">
                          {att.description}
                        </p>
                        <button
                          onClick={() => handleSendMessage(`Tell me how to reach and best time to visit ${att.name} in ${destination.name}`)}
                          className="pt-3 border-t border-[#2b2728]/10 text-xs font-mono-code text-[#8c956a] hover:text-[#7a835a] flex items-center justify-between font-semibold"
                        >
                          <span>Explore spot details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-[#4a4542]">No places listed yet for {destination.name}.</p>
                )}
              </div>
            </div>

            {/* FINANCIAL REALISM & BUDGET BREAKDOWN */}
            {/* <div className="p-6 rounded-3xl bg-white border border-[#2b2728]/10 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2b2728]/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest font-semibold">
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Financial Realism</span>
                  </div>
                  <h3 className="font-fraunces text-2xl text-[#2b2728]">
                    Custom Budget Estimation ({stayTier.toUpperCase()} Stay)
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-[#f8f6f1] p-1 rounded-full border border-[#2b2728]/10">
                  {(['budget', 'heritage', 'luxury'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setStayTier(t)}
                      className={`px-3 py-1 rounded-full text-xs font-mono-code uppercase transition-all ${
                        stayTier === t
                          ? 'bg-[#8c956a] text-white font-bold'
                          : 'text-[#4a4542] hover:text-[#2b2728]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#f8f6f1] border border-[#2b2728]/10 space-y-1">
                  <span className="text-[11px] font-mono-code text-[#4a4542] uppercase">Stay & Lodging</span>
                  <div className="text-lg font-semibold text-[#2b2728]">
                    ₹{budget.stay.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#4a4542]/70">{destination.budgetBreakdown.stay.label}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f6f1] border border-[#2b2728]/10 space-y-1">
                  <span className="text-[11px] font-mono-code text-[#4a4542] uppercase">Culinary Dining</span>
                  <div className="text-lg font-semibold text-[#2b2728]">
                    ₹{budget.food.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#4a4542]/70">{destination.budgetBreakdown.food.label}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#f8f6f1] border border-[#2b2728]/10 space-y-1">
                  <span className="text-[11px] font-mono-code text-[#4a4542] uppercase">Transit & Access</span>
                  <div className="text-lg font-semibold text-[#2b2728]">
                    ₹{budget.travel.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#4a4542]/70">{destination.budgetBreakdown.travel.label}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8f6f1] border border-[#8c956a]/30 flex items-center justify-between">
                <span className="text-xs font-mono-code text-[#2b2728] uppercase font-semibold">Estimated Total Voyage:</span>
                <span className="text-lg font-mono-code font-bold text-[#8c956a]">
                  ₹{budget.total.toLocaleString()} / person
                </span>
              </div>
            </div> */}

            {/* TRANSIT ROUTES */}
            <div className="space-y-4">
              <h3 className="font-fraunces text-3xl text-[#2b2728]">Transit & Arrival Routes</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {destination.gettingThere.flight && (
                  <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-[#8c956a] font-medium font-mono-code">
                      <Plane className="w-4 h-4" /> By Air
                    </div>
                    <p className="text-[#4a4542] leading-relaxed">{destination.gettingThere.flight}</p>
                  </div>
                )}
                {destination.gettingThere.train && (
                  <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-[#8c956a] font-medium font-mono-code">
                      <Train className="w-4 h-4" /> By Rail
                    </div>
                    <p className="text-[#4a4542] leading-relaxed">{destination.gettingThere.train}</p>
                  </div>
                )}
                {destination.gettingThere.road && (
                  <div className="p-4 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 text-[#8c956a] font-medium font-mono-code">
                      <Car className="w-4 h-4" /> By Road
                    </div>
                    <p className="text-[#4a4542] leading-relaxed">{destination.gettingThere.road}</p>
                  </div>
                )}
              </div>
            </div>

            {/* KNOW BEFORE YOU GO / THINGS TO SKIP */}
            <div className="grid sm:grid-cols-2 gap-4 pb-16">
              {destination.thingsToSkip && (
                <div className="p-5 rounded-2xl bg-[#fff5f2] border border-[#a66f5b]/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#a66f5b] font-medium text-xs font-mono-code uppercase tracking-wider font-semibold">
                    <AlertCircle className="w-4 h-4" /> What to Avoid / Skip
                  </div>
                  <p className="text-xs sm:text-sm text-[#4a4542] leading-relaxed font-light">
                    {destination.thingsToSkip}
                  </p>
                </div>
              )}

              {destination.knowBeforeYouGo && destination.knowBeforeYouGo.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-[#2b2728]/10 space-y-2 shadow-xs">
                  <div className="flex items-center gap-2 text-[#8c956a] font-medium text-xs font-mono-code uppercase tracking-wider font-semibold">
                    <Compass className="w-4 h-4" /> Know Before You Go
                  </div>
                  <ul className="text-xs text-[#4a4542] space-y-1.5 list-disc list-inside font-light">
                    {destination.knowBeforeYouGo.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* JOURNEY ORACLE — Permanent Creative Side Panel (desktop only) */}
          <aside className="hidden lg:flex flex-col w-[320px] xl:w-[360px] shrink-0 h-full border-l border-[#2b2728]/08 bg-[#fdfcf9] relative overflow-hidden">
            {/* Decorative grain texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Top accent stripe */}
            <div className="h-[3px] w-full bg-gradient-to-r from-[#8c956a] via-[#c6cab2] to-[#a66f5b] shrink-0" />

            {/* Oracle Header */}
            <div className="p-5 shrink-0 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {/* Glowing status orb */}
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c956a] opacity-60" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8c956a]" />
                    </span>
                    <span className="text-[10px] font-mono-code text-[#8c956a] uppercase tracking-[0.18em] font-semibold">AI Travel Companion</span>
                  </div>
                  <h2 className="font-fraunces text-xl text-[#2b2728] leading-tight font-normal">
                    Ask anything about
                    <br />
                    <span className="italic text-[#8c956a]">{destination.name}</span>
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: `reset-${Date.now()}`,
                        sender: 'assistant',
                        text: `Namaste! Back at your service for **${destination.name}**. What shall we explore?`,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ]);
                  }}
                  className="w-8 h-8 rounded-full border border-[#2b2728]/10 bg-white flex items-center justify-center text-[#4a4542] hover:text-[#8c956a] hover:border-[#8c956a]/40 transition-all shadow-xs"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gradient-to-r from-[#8c956a]/30 to-transparent" />
                <Compass className="w-3 h-3 text-[#8c956a]/50 animate-spin" style={{ animationDuration: '25s' }} />
                <div className="flex-1 h-px bg-gradient-to-l from-[#8c956a]/30 to-transparent" />
              </div>

              {/* Quick prompt chips */}
              <div className="flex flex-wrap gap-1.5">
                {['Places to visit', 'Best season', 'Local food', 'Hidden gems'].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-2.5 py-1 rounded-full bg-white border border-[#2b2728]/10 hover:border-[#8c956a]/50 hover:bg-[#8c956a]/5 text-[10px] font-mono-code text-[#4a4542] hover:text-[#2b2728] transition-all shadow-xs"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages scroll area */}
            <div className="flex-1 overflow-y-auto px-4 pb-3 space-y-4 no-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8c956a] to-[#6e7753] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Compass className="w-3 h-3" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] relative group ${msg.sender === 'user'
                      ? 'bg-[#2b2728] text-white rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-[11px] leading-relaxed'
                      : 'bg-white border border-[#2b2728]/08 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[#2b2728] text-[11px] leading-relaxed shadow-xs'
                      }`}
                  >
                    <div className="space-y-0.5">
                      {msg.text.split('\n').map((line, idx) => {
                        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
                        return (
                          <p
                            key={idx}
                            className="leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: formatted }}
                          />
                        );
                      })}
                    </div>

                    <div className={`flex items-center justify-between mt-1.5 text-[9px] font-mono-code opacity-40 ${msg.sender === 'user' ? 'text-white' : 'text-[#2b2728]'
                      }`}>
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'assistant' && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedId === msg.id ? <Check className="w-2.5 h-2.5 text-[#8c956a]" /> : <Copy className="w-2.5 h-2.5" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoadingAI && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#8c956a] to-[#6e7753] text-white flex items-center justify-center shrink-0">
                    <Compass className="w-3 h-3 animate-spin" />
                  </div>
                  <div className="bg-white border border-[#2b2728]/08 rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-xs flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8c956a] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8c956a] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8c956a] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Input area */}
            <div className="p-3 shrink-0 border-t border-[#2b2728]/08 bg-[#fdfcf9]">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="flex items-center gap-2 bg-white border border-[#2b2728]/12 focus-within:border-[#8c956a]/50 rounded-2xl px-3.5 py-2 transition-all shadow-xs"
              >
                <input
                  type="text"
                  placeholder="Ask the Oracle…"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-transparent text-[11px] text-[#2b2728] placeholder-[#4a4542]/40 outline-none font-light"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoadingAI}
                  className="w-7 h-7 rounded-full bg-[#2b2728] hover:bg-[#8c956a] disabled:opacity-30 text-white flex items-center justify-center transition-all shrink-0"
                >
                  <Send className="w-3 h-3" />
                </button>
              </form>
              <p className="text-center text-[9px] font-mono-code text-[#4a4542]/40 mt-2 tracking-wider uppercase">Sadhyatra · Journey Intelligence</p>
            </div>
          </aside>

        </div>

        {/* MOBILE FLOATING BUTTON FOR AI CHAT */}
        <button
          onClick={() => setIsMobileChatOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#8c956a] text-white shadow-xl font-semibold text-xs transition-all active:scale-95 border border-white/20"
        >
          <Sparkles className="w-4 h-4 animate-pulse text-white" />
          <span>Ask Oracle</span>
        </button>

        {/* MOBILE AI CHAT DRAWER */}
        <AnimatePresence>
          {isMobileChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden flex flex-col justify-end"
            >
              <div className="bg-[#fdfcf9] border-t border-[#2b2728]/15 rounded-t-3xl h-[85vh] flex flex-col overflow-hidden shadow-2xl">
                {/* Mobile Header */}
                <div className="p-4 bg-[#f8f6f1] border-b border-[#2b2728]/10 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#8c956a] text-white flex items-center justify-center shadow-xs">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-fraunces text-base text-[#2b2728] leading-tight font-medium">AI Travel Companion</h3>
                      <span className="text-[10px] font-mono-code text-[#8c956a] font-semibold block">with you in {destination.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileChatOpen(false)}
                    className="w-8 h-8 rounded-full bg-white border border-[#2b2728]/10 flex items-center justify-center text-[#2b2728] shadow-2xs"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-[#f8f6f1]/40">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'assistant' && (
                        <div className="w-6 h-6 rounded-full bg-[#8c956a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                          <Compass className="w-3 h-3" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${msg.sender === 'user'
                          ? 'bg-[#2b2728] text-white rounded-tr-none'
                          : 'bg-white text-[#2b2728] border border-[#2b2728]/10 rounded-tl-none shadow-2xs'
                          }`}
                      >
                        {msg.text.split('\n').map((line, idx) => {
                          let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
                          return (
                            <p key={idx} className="my-0.5" dangerouslySetInnerHTML={{ __html: formatted }} />
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {isLoadingAI && (
                    <div className="flex items-center gap-2 text-xs text-[#8c956a] font-mono-code p-2">
                      <Compass className="w-3.5 h-3.5 animate-spin" />
                      <span>Oracle is reflecting...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Mobile Input */}
                <div className="p-3 bg-[#fdfcf9] border-t border-[#2b2728]/10 space-y-2 shrink-0">
                  <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                    {['Places to visit', 'Best sunset spot', 'Food spots'].map((p) => (
                      <button
                        key={p}
                        onClick={() => handleSendMessage(p)}
                        className="whitespace-nowrap px-3 py-1 rounded-full bg-white border border-[#2b2728]/10 text-[10px] text-[#4a4542] shadow-2xs font-medium"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                    className="flex items-center gap-2 bg-white border border-[#2b2728]/15 rounded-full px-3.5 py-1.5 shadow-xs"
                  >
                    <input
                      type="text"
                      placeholder="Ask the Oracle..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-transparent text-xs text-[#2b2728] outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isLoadingAI}
                      className="w-7 h-7 rounded-full bg-[#8c956a] text-white flex items-center justify-center disabled:opacity-40 shadow-2xs"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FULLSCREEN LIGHTBOX GALLERY */}
        {isLightboxOpen && (
          <div
            id="gallery-fullscreen-lightbox"
            className="fixed inset-0 z-60 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="flex items-center justify-between text-white">
              <span className="font-mono-code text-xs">
                {destination.name} • {selectedPhotoIdx + 1} / {gallery.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="relative max-w-5xl max-h-[75vh] mx-auto my-auto flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[selectedPhotoIdx]}
                alt={destination.name}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                    className="absolute left-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIdx(i);
                  }}
                  className={`w-16 h-10 rounded-lg overflow-hidden border-2 ${selectedPhotoIdx === i ? 'border-[#8c956a]' : 'border-transparent opacity-50'
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
