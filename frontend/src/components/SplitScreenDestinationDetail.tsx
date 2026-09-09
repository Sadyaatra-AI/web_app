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
} from 'lucide-react';
import { Destination, ChatMessage } from '../types';

interface SplitScreenDestinationDetailProps {
  destination: Destination | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const SplitScreenDestinationDetail: React.FC<SplitScreenDestinationDetailProps> = ({
  destination,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState<boolean>(false);
  const [isDesktopChatOpen, setIsDesktopChatOpen] = useState<boolean>(true);
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [stayTier, setStayTier] = useState<'budget' | 'heritage' | 'luxury'>('heritage');
  const [activeSection, setActiveSection] = useState<'overview' | 'itinerary' | 'budget' | 'transit' | 'culture'>('overview');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (destination) {
      setSelectedPhotoIdx(0);
      setIsMobileChatOpen(false);
      setMessages([
        {
          id: `welcome-${destination.id}`,
          sender: 'assistant',
          text: `Welcome to the **${destination.name}** Editorial Dossier. I am your specialized **Sadyaatra AI Curator** for this sanctuary.\n\nAsk me anything about tailoring a private day-by-day itinerary, finding authentic boutique stays, uncrowded dawn viewpoints, or seasonal logistics.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [destination]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoadingAI]);

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
        text: 'The connection to the sanctuary intelligence network was interrupted. Please try asking again.',
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

  const getContextualPrompts = () => {
    switch (activeSection) {
      case 'itinerary':
        return [
          `Tailor Day 2 for a peaceful waterfall morning in ${destination.name}`,
          `Which spots are best for early morning photography?`,
          `Are there guided trekking options for the peak viewpoints?`,
        ];
      case 'budget':
        return [
          `Break down luxury heritage hotel vs boutique stay costs in ${destination.name}`,
          `Are local cafes and meals affordable around ${destination.name}?`,
          `Hidden expenses or entry permits I should know about?`,
        ];
      case 'transit':
        return [
          `What is the most scenic train route to reach ${destination.name}?`,
          `How reliable are local buses and taxis in this region?`,
          `Airport transfer options from nearest hub to ${destination.name}`,
        ];
      case 'culture':
        return [
          `What are the traditional culinary dishes I must taste in ${destination.name}?`,
          `Temple dress codes and photography protocols in ${destination.name}`,
          `What local festivals happen in ${destination.bestTime}?`,
        ];
      default:
        return destination.defaultPrompts;
    }
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

  const renderAIChatCanvas = (isMobileView: boolean) => {
    if (!isMobileView && !isDesktopChatOpen) return null;

    return (
      <div
        className={
          isMobileView
            ? "w-full h-full flex flex-col justify-between bg-[#12100f] text-[#e8e1de]"
            : "hidden lg:flex w-full lg:w-[340px] xl:w-[360px] shrink-0 h-full flex-col justify-between bg-[#12100f] text-[#e8e1de] border-l border-[#2d2927] transition-all"
        }
      >
        <div className="p-4 sm:p-5 border-b border-[#2d2927] bg-[#161413] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#8c956a]">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '16s' }} />
            </div>
            <div>
              <h3 className="font-fraunces text-xl text-[#e8e1de]">Sadyaatra AI Companion</h3>
              <span className="font-mono-code text-[10px] text-[#8c956a] uppercase tracking-wider block">
                Active Sanctuary: {destination.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
          {isMobileView && (
            <button
              onClick={() => setIsMobileChatOpen(false)}
              className="px-3.5 py-1.5 rounded-full bg-[#1e1b19] border border-[#383432] text-xs font-mono-code text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
            >
              Back to Details ↓
            </button>
          )}
          <button
            onClick={() => {
              setMessages([
                {
                  id: `reset-${Date.now()}`,
                  sender: 'assistant',
                  text: `Reset for **${destination.name}**. What shall we explore next?`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ]);
            }}
            className="w-8 h-8 rounded-full bg-[#1e1b19] border border-[#2d2927] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2 bg-[#181514] border-b border-[#2d2927] flex items-center justify-between text-[11px] font-mono-code text-[#cfc4c6]/70">
        <span className="uppercase text-[#8c956a]">Viewing Context: {activeSection}</span>
        <span className="text-[10px]">Tap suggestions below ↓</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#8c956a] shrink-0 mt-0.5">
                <Compass className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[88%] rounded-2xl p-4 space-y-2 relative group text-xs sm:text-sm ${
                msg.sender === 'user'
                  ? 'bg-[#2d2927] text-[#e8e1de] rounded-tr-none border border-[#383432]'
                  : 'bg-[#1a1816] text-[#cfc4c6] rounded-tl-none border border-[#2d2927]'
              }`}
            >
              <div className="break-words space-y-1">
                {msg.text.split('\n').map((line, idx) => {
                  let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#e8e1de] font-semibold">$1</strong>');
                  if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                    return (
                      <p
                        key={idx}
                        className="pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-[#8c956a] text-xs text-[#cfc4c6]"
                        dangerouslySetInnerHTML={{ __html: formatted.replace(/^[\s•\-]+/, '') }}
                      />
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className="text-xs text-[#cfc4c6] leading-relaxed my-1"
                      dangerouslySetInnerHTML={{ __html: formatted }}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code text-[#cfc4c6]/40">
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-[#e8e1de]"
                  >
                    {copiedId === msg.id ? (
                      <Check className="w-3 h-3 text-[#8c956a]" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-[#2d2927] border border-[#4c4547] flex items-center justify-center text-[#e8e1de] shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoadingAI && (
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#8c956a] shrink-0">
              <Compass className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-[#1a1816] border border-[#2d2927] px-4 py-3 rounded-2xl rounded-tl-none text-xs text-[#cfc4c6] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8c956a] animate-ping" />
              <span>Curating insights for {destination.name}...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      <div className="p-3 bg-[#151311] border-t border-[#2d2927] space-y-2 shrink-0">
        <div className="text-[10px] font-mono-code text-[#8c956a] uppercase tracking-wider flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Contextual Prompts</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {getContextualPrompts().map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#1e1b19] hover:bg-[#2d2927] border border-[#2d2927] text-xs text-[#cfc4c6] hover:text-[#e8e1de] transition-colors shrink-0 hover:border-[#8c956a]/50"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#161413] border-t border-[#2d2927] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-[#1e1b19] border border-[#2d2927] focus-within:border-[#8c956a] rounded-full p-1.5 pl-4 transition-all"
        >
          <input
            type="text"
            placeholder={`Ask anything about ${destination.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-transparent text-xs sm:text-sm text-[#e8e1de] placeholder-[#cfc4c6]/40 outline-none"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoadingAI}
            className="w-9 h-9 rounded-full bg-[#8c956a] hover:bg-[#9eb094] disabled:opacity-40 text-[#f8f6f1] flex items-center justify-center transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

  return (
    <AnimatePresence>
      <div
        id="split-screen-destination-modal"
        className="fixed inset-0 z-50 overflow-hidden bg-black/90 backdrop-blur-lg flex flex-col"
      >
        <header className="h-16 px-4 sm:px-8 bg-[#151311] border-b border-[#2d2927] flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
              title="Close Dossier (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-fraunces text-xl sm:text-2xl text-[#e8e1de] leading-none">
                  {destination.name}
                </h1>
                <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#1e1b19] border border-[#383432] text-[10px] font-mono-code text-[#8c956a] uppercase">
                  {destination.tag}
                </span>
              </div>
              <span className="text-[11px] font-mono-code text-[#cfc4c6]/70">
                {destination.state ? `${destination.state}, ` : ''}{destination.country} • {destination.region} Territory
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDesktopChatOpen((prev) => !prev)}
              className={`hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
                isDesktopChatOpen
                  ? 'bg-[#8c956a] text-[#f8f6f1] border-[#8c956a]'
                  : 'bg-[#1e1b19] text-[#cfc4c6] border-[#383432] hover:text-[#e8e1de]'
              }`}
              title="Toggle AI Companion Panel"
            >
              <Sparkles className="w-3.5 h-3.5 text-current" />
              <span>{isDesktopChatOpen ? 'Hide AI Companion' : 'AI Companion'}</span>
            </button>

            <button
              onClick={() => onToggleSave(destination.id)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1b19] border border-[#383432] text-xs font-medium text-[#e8e1de] hover:border-[#8c956a]/50 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-[#8c956a] text-[#8c956a]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save Sanctuary'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Sadyaatra — ${destination.name}`,
                    text: destination.shortDescription,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-10 h-10 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
              title="Share Sanctuary link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          <div
            id="editorial-content-pane"
            className="w-full flex-1 h-full overflow-y-auto p-4 sm:p-8 lg:p-10 space-y-12 no-scrollbar bg-[#151311] border-r border-[#2d2927]"
            onScroll={(e) => {
              const top = (e.target as HTMLElement).scrollTop;
              if (top < 500) setActiveSection('overview');
              else if (top < 1100) setActiveSection('itinerary');
              else if (top < 1700) setActiveSection('budget');
              else if (top < 2200) setActiveSection('transit');
              else setActiveSection('culture');
            }}
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-[#100e0c] border border-[#2d2927] group">
                <img
                  src={gallery[selectedPhotoIdx]}
                  alt={destination.name}
                  className="w-full h-full object-cover img-zoom transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-transparent to-black/20 pointer-events-none" />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#100e0c]/80 backdrop-blur-md border border-[#383432] text-xs font-mono-code text-[#e8e1de] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#1e1b19]"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Fullscreen Gallery ({gallery.length})</span>
                </button>

                {destination.coordinates && (
                  <div className="absolute top-4 left-4 text-xs font-mono-code text-[#8c956a] bg-[#100e0c]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#383432] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{destination.coordinates.formatted}</span>
                    {destination.elevation && (
                      <span className="text-[#cfc4c6]/70">• {destination.elevation}</span>
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
                      className={`relative w-20 sm:w-24 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedPhotoIdx === i
                          ? 'border-[#8c956a] scale-95 shadow-md'
                          : 'border-[#2d2927] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Gallery thumbnail ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Optimal Season</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de]">{destination.bestTime}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Ideal Duration</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de]">{destination.idealDuration}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Wallet className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Typical Budget</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de] truncate">{destination.budgetFormatted}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927]">
                <div className="flex items-center gap-2 text-xs text-[#cfc4c6]/70 font-mono-code mb-1">
                  <Compass className="w-3.5 h-3.5 text-[#8c956a]" />
                  <span>Archetype</span>
                </div>
                <div className="text-sm font-medium text-[#e8e1de] truncate">{destination.destinationTypes[0]}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#8c956a]" />
                <span>The Curated Narrative</span>
              </div>
              <p className="font-fraunces text-2xl sm:text-3xl text-[#e8e1de] leading-relaxed font-normal">
                "{destination.fullDescription}"
              </p>
              {destination.curatorNotes && (
                <div className="p-4 rounded-2xl bg-[#1a1816] border-l-2 border-[#8c956a] text-xs sm:text-sm text-[#cfc4c6] font-light leading-relaxed">
                  <span className="font-mono-code text-[10px] text-[#8c956a] uppercase block mb-1">Curator Note</span>
                  {destination.curatorNotes}
                </div>
              )}
            </div>

            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#1c1917] to-[#161413] border border-[#383432] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2927] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest">
                    <Sparkles className="w-4 h-4" />
                    <span>Signature AI Persona Match</span>
                  </div>
                  <h3 className="font-fraunces text-2xl text-[#e8e1de]">
                    Is {destination.name} Right for You?
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-[#151311] px-4 py-2 rounded-2xl border border-[#383432]">
                  <span className="text-2xl font-bold font-mono-code text-[#8c956a]">
                    {activeMatch.matchPct}%
                  </span>
                  <span className="text-[10px] font-mono-code text-[#cfc4c6]/70 uppercase leading-tight">
                    Persona<br />Synergy
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono-code text-[#cfc4c6]/70 block">Select travel archetype:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPersona('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedPersona === 'all'
                        ? 'bg-[#8c956a] text-[#f8f6f1] font-bold'
                        : 'bg-[#151311] border border-[#2d2927] text-[#cfc4c6] hover:text-[#e8e1de]'
                    }`}
                  >
                    General Mindful Seeker
                  </button>

                  {destination.matchFactors?.map((mf) => (
                    <button
                      key={mf.persona}
                      onClick={() => setSelectedPersona(mf.persona)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedPersona === mf.persona
                          ? 'bg-[#8c956a] text-[#f8f6f1] font-bold'
                          : 'bg-[#151311] border border-[#2d2927] text-[#cfc4c6] hover:text-[#e8e1de]'
                      }`}
                    >
                      {mf.persona} ({mf.matchPct}%)
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#151311] border border-[#2d2927] space-y-2">
                <div className="text-xs font-mono-code text-[#8c956a] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Curator Match Rationale</span>
                </div>
                <p className="text-xs sm:text-sm text-[#cfc4c6] font-light leading-relaxed">
                  {activeMatch.reason}
                </p>
              </div>
            </div>

            {destination.itineraryDays && destination.itineraryDays.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#2d2927] pb-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Curated Voyage Itinerary</span>
                    </div>
                    <h3 className="font-fraunces text-3xl text-[#e8e1de]">
                      Day-by-Day Journey Flow
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSendMessage(`Customize a ${destination.itineraryDays?.length}-day itinerary for ${destination.name}`)}
                    className="text-xs font-mono-code text-[#8c956a] hover:underline flex items-center gap-1"
                  >
                    <span>Customize via AI</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-4">
                  {destination.itineraryDays.map((day) => (
                    <div
                      key={day.day}
                      className="p-5 rounded-2xl bg-[#1a1816] border border-[#2d2927] hover:border-[#383432] transition-colors space-y-3"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#151311] border border-[#383432] text-[10px] font-mono-code text-[#8c956a] uppercase">
                            Day 0{day.day}
                          </span>
                          <h4 className="font-fraunces text-xl text-[#e8e1de]">{day.title}</h4>
                        </div>
                        <span className="text-xs font-mono-code text-[#cfc4c6]/60">{day.timing}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#cfc4c6] font-light leading-relaxed">
                        {day.description}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-xs font-mono-code text-[#8c956a]">
                        <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        <span>Highlight: {day.highlight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.attractions && destination.attractions.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-fraunces text-3xl text-[#e8e1de]">Key Sanctuaries & Sights</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {destination.attractions.map((att) => (
                    <div
                      key={att.id}
                      className="group overflow-hidden rounded-2xl bg-[#1a1816] border border-[#2d2927] hover:border-[#383432] transition-colors"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-[#100e0c]">
                        <img
                          src={att.image}
                          alt={att.name}
                          className="w-full h-full object-cover img-zoom"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-fraunces text-lg text-[#e8e1de]">{att.name}</h4>
                          {att.tag && (
                            <span className="px-2 py-0.5 rounded-full bg-[#151311] text-[10px] font-mono-code text-[#8c956a] border border-[#2d2927]">
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

            <div className="p-6 rounded-3xl bg-[#1a1816] border border-[#2d2927] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2d2927] pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#8c956a] uppercase tracking-widest">
                    <Wallet className="w-3.5 h-3.5" />
                    <span>Financial Realism</span>
                  </div>
                  <h3 className="font-fraunces text-2xl text-[#e8e1de]">
                    Custom Budget Estimation ({stayTier.toUpperCase()} Stay)
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-[#151311] p-1 rounded-full border border-[#2d2927]">
                  {(['budget', 'heritage', 'luxury'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setStayTier(t)}
                      className={`px-3 py-1 rounded-full text-xs font-mono-code uppercase transition-all ${
                        stayTier === t
                          ? 'bg-[#8c956a] text-[#f8f6f1] font-bold'
                          : 'text-[#cfc4c6] hover:text-[#e8e1de]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#151311] border border-[#2d2927] space-y-1">
                  <span className="text-[11px] font-mono-code text-[#cfc4c6]/70 uppercase">Stay & Lodging</span>
                  <div className="text-lg font-semibold text-[#e8e1de]">
                    ₹{budget.stay.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#cfc4c6]/60">{destination.budgetBreakdown.stay.label}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#151311] border border-[#2d2927] space-y-1">
                  <span className="text-[11px] font-mono-code text-[#cfc4c6]/70 uppercase">Culinary Dining</span>
                  <div className="text-lg font-semibold text-[#e8e1de]">
                    ₹{budget.food.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#cfc4c6]/60">{destination.budgetBreakdown.food.label}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#151311] border border-[#2d2927] space-y-1">
                  <span className="text-[11px] font-mono-code text-[#cfc4c6]/70 uppercase">Transit & Access</span>
                  <div className="text-lg font-semibold text-[#e8e1de]">
                    ₹{budget.travel.toLocaleString()}
                  </div>
                  <p className="text-xs text-[#cfc4c6]/60">{destination.budgetBreakdown.travel.label}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#201d1a] border border-[#383432] flex items-center justify-between">
                <span className="text-xs font-mono-code text-[#cfc4c6] uppercase">Estimated Total Voyage:</span>
                <span className="text-lg font-mono-code font-bold text-[#8c956a]">
                  ₹{budget.total.toLocaleString()} / person
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-fraunces text-3xl text-[#e8e1de]">Transit & Arrival Routes</h3>
              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                {destination.gettingThere.flight && (
                  <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927] space-y-2">
                    <div className="flex items-center gap-2 text-[#8c956a] font-medium font-mono-code">
                      <Plane className="w-4 h-4" /> By Air
                    </div>
                    <p className="text-[#cfc4c6] leading-relaxed">{destination.gettingThere.flight}</p>
                  </div>
                )}
                {destination.gettingThere.train && (
                  <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927] space-y-2">
                    <div className="flex items-center gap-2 text-[#8c956a] font-medium font-mono-code">
                      <Train className="w-4 h-4" /> By Rail
                    </div>
                    <p className="text-[#cfc4c6] leading-relaxed">{destination.gettingThere.train}</p>
                  </div>
                )}
                {destination.gettingThere.road && (
                  <div className="p-4 rounded-2xl bg-[#1a1816] border border-[#2d2927] space-y-2">
                    <div className="flex items-center gap-2 text-[#8c956a] font-medium font-mono-code">
                      <Car className="w-4 h-4" /> By Road
                    </div>
                    <p className="text-[#cfc4c6] leading-relaxed">{destination.gettingThere.road}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pb-12">
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

              {destination.knowBeforeYouGo && destination.knowBeforeYouGo.length > 0 && (
                <div className="p-5 rounded-2xl bg-[#1a1816] border border-[#2d2927] space-y-2">
                  <div className="flex items-center gap-2 text-[#8c956a] font-medium text-xs font-mono-code uppercase tracking-wider">
                    <Compass className="w-4 h-4" /> Know Before You Go
                  </div>
                  <ul className="text-xs text-[#cfc4c6] space-y-1.5 list-disc list-inside font-light">
                    {destination.knowBeforeYouGo.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {renderAIChatCanvas(false)}
        </div>

        <div className="lg:hidden shrink-0 p-3 bg-[#161413] border-t border-[#2d2927] flex items-center justify-between z-30">
          <button
            onClick={() => setIsMobileChatOpen(true)}
            className="w-full py-3 px-4 rounded-full bg-[#8c956a] hover:bg-[#9eb094] text-[#f8f6f1] font-semibold text-xs tracking-wider uppercase flex items-center justify-between shadow-xl transition-all active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f8f6f1]" />
              <span>Ask AI Curator for {destination.name}</span>
            </div>
            <span className="text-[10px] font-mono-code bg-[#151311]/40 px-2.5 py-1 rounded-full text-[#f8f6f1]">
              Open Chat Popup ↑
            </span>
          </button>
        </div>

        <AnimatePresence>
          {isMobileChatOpen && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="lg:hidden fixed inset-0 z-60 bg-[#12100f] flex flex-col justify-between"
            >
              {renderAIChatCanvas(true)}
            </motion.div>
          )}
        </AnimatePresence>

        {isLightboxOpen && (
          <div
            id="gallery-fullscreen-lightbox"
            className="fixed inset-0 z-60 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="flex items-center justify-between text-[#e8e1de]">
              <span className="font-mono-code text-xs">
                {destination.name} • {selectedPhotoIdx + 1} / {gallery.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-[#1e1b19] flex items-center justify-center text-[#e8e1de]"
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
                    className="absolute left-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#383432] flex items-center justify-center text-[#e8e1de] hover:bg-black"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#383432] flex items-center justify-center text-[#e8e1de] hover:bg-black"
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
                  className={`w-16 h-10 rounded-lg overflow-hidden border-2 ${
                    selectedPhotoIdx === i ? 'border-[#8c956a]' : 'border-transparent opacity-50'
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
