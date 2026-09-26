import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Sparkles,
  X,
  Send,
  User,
  RotateCcw,
  Copy,
  Check,
  MapPin,
  Compass,
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
        ? `Greetings. I am your **Sadhyatra Companion** for **${activeDestination.name}**. How may I refine your journey today? Ask for places to visit, hidden spots, or local food recommendations.`
        : `Greetings traveler. I am the **Sadhyatra AI Companion**. Tell me what kind of journey you dream of, or ask me for personalized recommendations across our destinations.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Resize State & Refs
  const [drawerWidth, setDrawerWidth] = useState(448);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const newWidth = window.innerWidth - e.clientX;
      setDrawerWidth(Math.max(320, Math.min(newWidth, 800)));
    };
    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
      }
    };

    if (isOpen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (activeDestination) {
      setSelectedDestId(activeDestination.id);
    }
  }, [activeDestination]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setInputMessage(initialPrompt);
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

    const visitorId = (() => {
      let v = localStorage.getItem('sadhyatra_visitor') || localStorage.getItem('sadyaatra_visitor');
      if (!v) {
        v = `v_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
        localStorage.setItem('sadhyatra_visitor', v);
      }
      return v;
    })();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          destinationContext: currentDest || null,
          history: messages.slice(-4),
          visitorId,
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
        text: 'The connection to the destination archives was momentarily interrupted. Please try asking again.',
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

  const currentDestObj = destinations.find((d) => d.id === selectedDestId);

  const SUGGESTIONS = currentDestObj
    ? currentDestObj.defaultPrompts
    : [
        'Recommend quiet destinations for solo reflection in India.',
        'What are the best places to visit in Pachmarhi?',
        'Best season and packing advice for Satpura mountain trips?',
      ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="ai-chat-drawer-overlay"
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end"
        onClick={onClose}
      >
        <motion.div
          id="ai-chat-drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{ width: `${drawerWidth}px`, maxWidth: '100vw' }}
          className="relative h-full bg-[#f8f6f1] border-l border-[#2b2728]/10 flex flex-col justify-between shadow-2xl text-[#2b2728]"
        >
          {/* Draggable Resizer Handle */}
          <div
            className="absolute top-0 left-0 w-2 h-full cursor-col-resize hover:bg-[#8c956a]/30 active:bg-[#8c956a]/50 z-50 transition-colors"
            onMouseDown={() => {
              isDragging.current = true;
              document.body.style.cursor = 'col-resize';
              document.body.style.userSelect = 'none';
            }}
          />

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#2b2728]/10 bg-white flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#8c956a] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-fraunces text-xl text-[#2b2728] font-medium">Sadhyatra Companion</h3>
                <span className="font-mono-code text-[10px] text-[#8c956a] uppercase tracking-wider font-semibold">
                  Mindful Travel Intelligence
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="ai-chat-clear-btn"
                onClick={handleClear}
                className="w-8 h-8 rounded-full bg-[#f8f6f1] border border-[#2b2728]/10 flex items-center justify-center text-[#4a4542] hover:text-[#2b2728] transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                id="ai-chat-close-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#f8f6f1] border border-[#2b2728]/10 flex items-center justify-center text-[#4a4542] hover:text-[#2b2728] transition-colors"
                title="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Selector */}
          <div className="px-5 py-2.5 bg-white border-b border-[#2b2728]/10 flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-[#8c956a] shrink-0" />
            <span className="font-mono-code text-[#4a4542] font-medium">Context:</span>
            <select
              id="ai-destination-context-select"
              value={selectedDestId}
              onChange={(e) => setSelectedDestId(e.target.value)}
              className="bg-[#f8f6f1] border border-[#2b2728]/10 rounded-lg px-2 py-1 text-xs text-[#2b2728] outline-none focus:border-[#8c956a]"
            >
              <option value="all">All Destinations & General Advice</option>
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
                  <div className="w-7 h-7 rounded-full bg-[#8c956a] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 space-y-2 relative group shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#8c956a] text-white rounded-tr-none'
                      : 'bg-white text-[#2b2728] border border-[#2b2728]/10 rounded-tl-none'
                  }`}
                >
                  <div className="break-words">
                    {msg.sender === 'user' ? (
                      <p className="text-sm sm:text-base">{msg.text}</p>
                    ) : (
                      <div className="markdown-body">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({node, ...props}) => <h2 className="text-lg font-fraunces font-bold text-[#8c956a] mt-5 mb-2" {...props} />,
                            h2: ({node, ...props}) => <h3 className="text-base font-fraunces font-bold text-[#8c956a] mt-5 mb-2 border-b border-[#8c956a]/20 pb-1" {...props} />,
                            h3: ({node, ...props}) => <h4 className="text-sm font-fraunces font-bold text-[#2b2728] mt-4 mb-1" {...props} />,
                            p: ({node, ...props}) => <p className="text-sm sm:text-base my-2 leading-relaxed" {...props} />,
                            ul: ({node, ...props}) => <ul className="my-2 space-y-1.5 pl-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="my-2 space-y-1.5 pl-1 list-decimal ml-4" {...props} />,
                            li: ({node, ...props}) => {
                              // If it's in a bulleted list, use our custom icon
                              const parentNode = (node as any)?.parent;
                              if (parentNode?.type === 'element' && parentNode.tagName === 'ul') {
                                return (
                                  <li className="flex gap-2 items-start text-sm sm:text-base leading-relaxed">
                                    <span className="text-[#8c956a] mt-0.5 text-[10px]">✦</span>
                                    <span className="flex-1">{props.children}</span>
                                  </li>
                                );
                              }
                              // Otherwise (numbered list), render normally
                              return <li className="text-sm sm:text-base leading-relaxed">{props.children}</li>;
                            },
                            table: ({node, ...props}) => (
                              <div className="w-full overflow-x-auto my-3 rounded-lg border border-[#2b2728]/10">
                                <table className="w-full text-left text-sm sm:text-base" {...props} />
                              </div>
                            ),
                            th: ({node, ...props}) => <th className="bg-[#f8f6f1] p-2 border-b border-[#2b2728]/10 font-semibold text-[#8c956a]" {...props} />,
                            td: ({node, ...props}) => <td className="p-2 border-b border-[#2b2728]/5 last:border-0" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-[#8c956a]" {...props} />,
                            em: ({node, ...props}) => <em className="italic text-[#4a4542]" {...props} />,
                            a: ({node, ...props}) => <a className="text-[#8c956a] hover:underline" {...props} />
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] font-mono-code opacity-60">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'assistant' && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:underline"
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
                  <div className="w-7 h-7 rounded-full bg-[#2b2728] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#8c956a] text-white flex items-center justify-center shrink-0">
                  <Compass className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-white border border-[#2b2728]/10 px-4 py-3 rounded-2xl rounded-tl-none text-xs text-[#4a4542] flex items-center gap-2 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#8c956a] animate-ping" />
                  <span>Curating insights from destination archives...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Pills */}
          <div className="p-3 bg-white border-t border-[#2b2728]/10 space-y-2">
            <div className="text-[10px] font-mono-code text-[#4a4542] uppercase tracking-wider font-semibold">
              Suggested Explorations
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTIONS.map((prompt, idx) => (
                <button
                  key={idx}
                  id={`drawer-prompt-pill-${idx}`}
                  onClick={() => handleSendMessage(prompt)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#f8f6f1] hover:bg-[#8c956a] hover:text-white border border-[#2b2728]/10 text-xs text-[#4a4542] transition-colors shrink-0 flex items-center gap-1.5 font-medium"
                >
                  <Sparkles className="w-3 h-3 text-[#8c956a]" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <div className="p-4 bg-white border-t border-[#2b2728]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#f8f6f1] border border-[#2b2728]/10 focus-within:border-[#8c956a] rounded-full p-1.5 pl-4 transition-all"
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
                className="flex-1 bg-transparent text-sm sm:text-base text-[#2b2728] placeholder-[#4a4542]/50 outline-none"
              />
              <button
                id="ai-chat-send-btn"
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="w-9 h-9 rounded-full bg-[#8c956a] hover:bg-[#7a835a] disabled:opacity-40 text-white flex items-center justify-center transition-all shrink-0 shadow-xs"
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
