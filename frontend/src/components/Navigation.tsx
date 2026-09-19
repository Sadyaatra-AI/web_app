import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Heart, Search, HelpCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: 'explore' | 'quiz' | 'saved';
  setActiveTab: (tab: 'explore' | 'quiz' | 'saved') => void;
  savedCount: number;
  onOpenChat: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenChat,
  searchQuery,
  setSearchQuery,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scrolling down -> hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up -> show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-[#2b2728]/10 bg-[#f8f6f1]/90 backdrop-blur-xl transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0 shadow-md shadow-[#2b2728]/5' : '-translate-y-full'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo with rounded cut corners and lighter background badge */}
        <div
          id="brand-logo"
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-white border border-[#2b2728]/10 rounded-2xl p-1.5 sm:p-2 shadow-sm flex items-center justify-center overflow-hidden transition-all group-hover:scale-105 group-hover:shadow-md group-hover:shadow-[#8c956a]/20">
            <img
              src="/logo.png"
              alt="Sadyaatra Logo"
              className="h-7 sm:h-9 w-auto object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Center Nav Links */}
        <nav id="nav-links" className="hidden md:flex items-center gap-1.5 bg-white/90 p-1.5 rounded-full border border-[#2b2728]/10 backdrop-blur-md shadow-sm">
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${activeTab === 'explore'
                ? 'bg-[#8c956a] text-white shadow-sm font-semibold'
                : 'text-[#4a4542] hover:text-[#2b2728] hover:bg-[#f8f6f1]'
              }`}
          >
            Sanctuaries
          </button>

          <button
            id="nav-quiz-btn"
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-all ${activeTab === 'quiz'
                ? 'bg-[#8c956a] text-white shadow-sm font-semibold'
                : 'text-[#4a4542] hover:text-[#8c956a] hover:bg-[#f8f6f1]'
              }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'quiz' ? 'text-white' : 'text-[#8c956a]'}`} />
            Trip Matcher
          </button>

          <button
            id="nav-saved-btn"
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-all ${activeTab === 'saved'
                ? 'bg-[#8c956a] text-white shadow-sm font-semibold'
                : 'text-[#4a4542] hover:text-[#2b2728] hover:bg-[#f8f6f1]'
              }`}
          >
            <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-[#8c956a] text-[#8c956a]' : ''}`} />
            Saved ({savedCount})
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/studio"
            className="hidden text-[10px] font-mono-code uppercase tracking-[0.16em] text-[#4a4542] transition-colors hover:text-[#8c956a] lg:inline"
          >
            Studio
          </a>
          {/* Search Trigger */}
          <div className="relative hidden sm:block w-40 md:w-48 lg:w-60">
            <Search className="w-4 h-4 text-[#4a4542]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search sanctuaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#2b2728]/15 focus:border-[#8c956a] text-xs text-[#2b2728] placeholder-[#4a4542]/50 rounded-full pl-9 pr-3 py-2 outline-none transition-all shadow-sm"
            />
          </div>

          {/* AI Travel Guide Button */}
          <button
            id="open-ai-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-2 bg-[#8c956a] hover:bg-[#7a835a] text-white px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase shadow-sm transition-all active:scale-95 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Companion</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-[#2b2728]/10 px-2 py-2 bg-[#f8f6f1]/95 backdrop-blur-lg">
        <button
          id="mobile-nav-explore"
          onClick={() => setActiveTab('explore')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeTab === 'explore' ? 'bg-[#8c956a] text-white font-semibold' : 'text-[#4a4542]'
            }`}
        >
          Sanctuaries
        </button>

        <button
          id="mobile-nav-quiz"
          onClick={() => setActiveTab('quiz')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${activeTab === 'quiz' ? 'bg-[#8c956a] text-white font-semibold' : 'text-[#4a4542]'
            }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#8c956a]" /> Matcher
        </button>

        <button
          id="mobile-nav-saved"
          onClick={() => setActiveTab('saved')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${activeTab === 'saved' ? 'bg-[#8c956a] text-white font-semibold' : 'text-[#4a4542]'
            }`}
        >
          <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-[#8c956a] text-[#8c956a]' : ''}`} /> Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};
