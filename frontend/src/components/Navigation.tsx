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
      className={`fixed top-2 sm:top-4 left-2 right-2 sm:left-4 sm:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-[95%] max-w-7xl z-50 border border-[#2b2728]/15 bg-white/30 backdrop-blur-2xl rounded-3xl overflow-hidden transition-all duration-300 ease-in-out ${isVisible ? 'translate-y-0 opacity-100 shadow-xl shadow-[#2b2728]/10' : '-translate-y-[120%] opacity-0'
        }`}
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-8 h-12 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo with rounded cut corners and lighter background badge */}
        <div
          id="brand-logo"
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-[#2b2728]/10 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 shadow-sm flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-md group-hover:shadow-[#8c956a]/20">
            <img
              src="/logo_justlogo.png"
              alt="Sadyaatra Logo"
              className="h-6 sm:h-9 w-auto object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Center Nav Links */}
        <nav id="nav-links" className="hidden md:flex items-center gap-1.5 bg-white/70 p-1.5 rounded-full border border-[#2b2728]/10 backdrop-blur-md shadow-sm">
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${activeTab === 'explore'
              ? 'bg-[#8c956a] text-white shadow-sm font-semibold'
              : 'text-[#4a4542] hover:text-[#2b2728] hover:bg-white/60'
              }`}
          >
            Sanctuaries
          </button>

          <button
            id="nav-quiz-btn"
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-all ${activeTab === 'quiz'
              ? 'bg-[#8c956a] text-white shadow-sm font-semibold'
              : 'text-[#4a4542] hover:text-[#8c956a] hover:bg-white/60'
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
              : 'text-[#4a4542] hover:text-[#2b2728] hover:bg-white/60'
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
            className="hidden lg:flex items-center justify-center px-4 py-2 rounded-full border border-[#8c956a]/30 bg-white/90 hover:bg-white text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2b2728] transition-all hover:border-[#8c956a] hover:text-[#8c956a] shadow-sm hover:shadow-md backdrop-blur-md"
          >
            About
          </a>
          {/* Search Trigger */}
          <div className="relative hidden sm:block w-32 md:w-48 lg:w-56">
            <Search className="w-4 h-4 text-[#4a4542]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search sanctuaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border border-[#2b2728]/15 focus:border-[#8c956a] text-xs text-[#2b2728] placeholder-[#4a4542]/50 rounded-full pl-9 pr-3 py-2 outline-none transition-all shadow-sm focus:shadow-md focus:bg-white"
            />
          </div>

          {/* AI Travel Guide Button */}
          <button
            id="open-ai-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-2 bg-[#8c956a] hover:bg-[#7a835a] text-white px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase shadow-sm transition-all active:scale-95 group border border-transparent hover:border-[#8c956a]/30 hover:shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-white group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">AI Companion</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-[#2b2728]/10 px-2 py-2 bg-white/40 backdrop-blur-md">
        <button
          id="mobile-nav-explore"
          onClick={() => setActiveTab('explore')}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${activeTab === 'explore' ? 'bg-[#8c956a] text-white font-semibold shadow-sm' : 'text-[#4a4542]'
            }`}
        >
          Sanctuaries
        </button>

        <button
          id="mobile-nav-quiz"
          onClick={() => setActiveTab('quiz')}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all ${activeTab === 'quiz' ? 'bg-[#8c956a] text-white font-semibold shadow-sm' : 'text-[#4a4542]'
            }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${activeTab === 'quiz' ? 'text-white' : 'text-[#8c956a]'}`} /> Matcher
        </button>

        <button
          id="mobile-nav-saved"
          onClick={() => setActiveTab('saved')}
          className={`px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all ${activeTab === 'saved' ? 'bg-[#8c956a] text-white font-semibold shadow-sm' : 'text-[#4a4542]'
            }`}
        >
          <Heart className={`w-3.5 h-3.5 ${savedCount > 0 && activeTab !== 'saved' ? 'fill-[#8c956a] text-[#8c956a]' : ''} ${activeTab === 'saved' ? 'fill-white text-white' : ''}`} /> Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};
