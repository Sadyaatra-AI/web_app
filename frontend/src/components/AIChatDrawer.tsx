import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  Copy,
  Check,
  MapPin,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Destination, ChatMessage } from '../types';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  destinations: Destination[];
  activeDestination: Destination | null;
  initialPrompt?: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({
  isOpen,
  onClose,
  destinations,
  activeDestination,
  initialPrompt,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(activeDestination?.id || 'all');
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: activeDestination
        ? `Greetings. I am your **Sadyaatra Curator** for **${activeDestination.name}**. How may I refine your journey today? You can ask for a day-by-day quiet itinerary, hidden spots, or local food recommendations.`
        : `Greetings traveler. I am the **Sadyaatra AI Companion**. Tell me what kind of journey you dream of, or ask me for personalized recommendations across our sanctuaries.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Update selected destination when activeDestination changes
  useEffect(() => {
    if (activeDestination) {
      setSelectedDestId(activeDestination.id);
    }
  }, [activeDestination]);

  // Handle initial prompt if passed from outside
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    const currentDest = destinations.find((d) => d.id === selectedDestId);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          destinationContext: currentDest || null,
          history: messages.slice(-4),
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "I'm reflecting on your journey... please ask once more.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: 'The connection to the sanctuary archives was momentarily interrupted. Please try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-new',
        sender: 'assistant',
        text: `Conversation cleared. Where should our curiosity wander next?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const formatText = (content: string) => {
    // Render basic markdown formatting
    return content.split('\n').map((line, idx) => {
      // Bold
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#e8e1de] font-semibold">$1</strong>');
      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        return (
          <p
            key={idx}
            className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#9EB094] text-xs sm:text-sm text-[#cfc4c6] my-1"
            dangerouslySetInnerHTML={{ __html: formatted.replace(/^[\s•\-\*]+/, '') }}
          />
        );
      }
      return (
        <p
          key={idx}
          className="text-xs sm:text-sm text-[#cfc4c6] my-1.5 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  const currentDestObj = destinations.find((d) => d.id === selectedDestId);

  const SUGGESTIONS = currentDestObj
    ? currentDestObj.defaultPrompts
    : [
        'Recommend 3 quiet destinations for solo reflection in India.',
        'What is the ideal 4-day budget itinerary for Gokarna?',
        'Best season and packing advice for Spiti Valley?',
      ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="ai-chat-drawer-overlay"
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end"
        onClick={onClose}
      >
        <motion.div
          id="ai-chat-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg h-full bg-[#151311] border-l border-[#2d2927] flex flex-col justify-between shadow-2xl text-[#e8e1de]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#2d2927] bg-[#151311]/90 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#9EB094]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-ebGaramond text-xl text-[#e8e1de]">Sadyaatra AI Curator</h3>
                <span className="font-mono-code text-[10px] text-[#9EB094] uppercase tracking-wider">
                  Mindful Travel Intelligence
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="ai-chat-clear-btn"
                onClick={handleClear}
                className="w-8 h-8 rounded-full bg-[#1e1b19] border border-[#2d2927] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                id="ai-chat-close-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#1e1b19] border border-[#2d2927] flex items-center justify-center text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Selector */}
          <div className="px-5 py-2.5 bg-[#1a1816] border-b border-[#2d2927] flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#9EB094] shrink-0" />
            <span className="font-mono-code text-[#cfc4c6]/70">Context:</span>
            <select
              id="ai-destination-context-select"
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="bg-[#151311] border border-[#2d2927] rounded-lg px-2 py-1 text-xs text-[#e8e1de] outline-none focus:border-[#9EB094]"
            >
              <option value="all">All Sanctuaries & General Advice</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state || d.country})
                </option>
              ))}
            </select>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#9EB094] shrink-0 mt-0.5">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 relative group ${
                    msg.sender === 'user'
                      ? 'bg-[#2d2927] text-[#e8e1de] rounded-tr-none border border-[#383432]'
                      : 'bg-[#1e1b19] text-[#cfc4c6] rounded-tl-none border border-[#2d2927]'
                  }`}
                >
                  <div className="break-words">{formatText(msg.text)}</div>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code text-[#cfc4c6]/50">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-[#e8e1de]"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-[#9EB094]" />
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

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#1e1b19] border border-[#383432] flex items-center justify-center text-[#9EB094] shrink-0">
                  <Compass className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-[#1e1b19] border border-[#2d2927] px-4 py-3 rounded-2xl rounded-tl-none text-xs text-[#cfc4c6] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#9EB094] animate-ping" />
                  <span>Curating insights from sanctuary archives...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="p-3 bg-[#181513] border-t border-[#2d2927] space-y-2">
            <div className="text-[10px] font-mono-code text-[#cfc4c6]/60 uppercase tracking-wider">
              Suggested Explorations
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTIONS.map((prompt, idx) => (
                <button
                  key={idx}
                  id={`drawer-prompt-pill-${idx}`}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#1e1b19] hover:bg-[#2d2927] border border-[#2d2927] text-xs text-[#cfc4c6] hover:text-[#e8e1de] transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#9EB094]" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-[#151311] border-t border-[#2d2927]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#1e1b19] border border-[#2d2927] focus-within:border-[#9EB094] rounded-full p-1.5 pl-4 transition-all"
            >
              <input
                id="ai-chat-input"
                type="text"
                placeholder={
                  currentDestObj
                    ? `Ask anything about ${currentDestObj.name}...`
                    : 'Ask about itineraries, hidden gems, budgets...'
                }
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-transparent text-xs sm:text-sm text-[#e8e1de] placeholder-[#cfc4c6]/50 outline-none"
              />
              <button
                id="ai-chat-send-btn"
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#9EB094] hover:bg-[#b0c2a5] disabled:opacity-40 disabled:hover:bg-[#9EB094] text-[#100e0c] flex items-center justify-center transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
