import React from 'react';
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
  return (
    <header
      id="main-navigation"
      className="sticky top-0 z-40 w-full border-b border-[#2d2927] bg-[#151311]/90 backdrop-blur-md transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          id="brand-logo"
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/logo.png"
            alt="Sadyaatra Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>

        {/* Center Nav Links */}
        <nav id="nav-links" className="hidden md:flex items-center gap-1 bg-[#1e1b19]/60 p-1.5 rounded-full border border-[#2d2927]">
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
              activeTab === 'explore'
                ? 'bg-[#2d2927] text-[#e8e1de] shadow-sm'
                : 'text-[#cfc4c6] hover:text-[#e8e1de] hover:bg-[#221f1d]'
            }`}
          >
            Sanctuaries
          </button>
          <button
            id="nav-quiz-btn"
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-all ${
              activeTab === 'quiz'
                ? 'bg-[#2d2927] text-[#9EB094] shadow-sm'
                : 'text-[#cfc4c6] hover:text-[#e8e1de] hover:bg-[#221f1d]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#9EB094]" />
            Trip Matcher
          </button>
          <button
            id="nav-saved-btn"
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 transition-all ${
              activeTab === 'saved'
                ? 'bg-[#2d2927] text-[#e8e1de] shadow-sm'
                : 'text-[#cfc4c6] hover:text-[#e8e1de] hover:bg-[#221f1d]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-[#c2cb9c] text-[#c2cb9c]' : ''}`} />
            Saved ({savedCount})
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search Trigger */}
          <div className="relative hidden sm:block w-48 lg:w-64">
            <Search className="w-4 h-4 text-[#cfc4c6]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search places, vibes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e1b19] border border-[#2d2927] focus:border-[#9EB094]/60 text-xs text-[#e8e1de] placeholder-[#cfc4c6]/50 rounded-full pl-9 pr-3 py-2 outline-none transition-all"
            />
          </div>

          {/* AI Travel Guide Button */}
          <button
            id="open-ai-chat-btn"
            onClick={onOpenChat}
            className="flex items-center gap-2 bg-[#9EB094] hover:bg-[#b0c2a5] text-[#100e0c] px-4 py-2 rounded-full text-xs font-medium tracking-wide uppercase shadow-sm transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Companion</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub Navigation */}
      <div className="md:hidden flex items-center justify-around border-t border-[#221f1d] px-2 py-2 bg-[#151311]">
        <button
          id="mobile-nav-explore"
          onClick={() => setActiveTab('explore')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
            activeTab === 'explore' ? 'bg-[#2d2927] text-[#e8e1de]' : 'text-[#cfc4c6]'
          }`}
        >
          Explore
        </button>
        <button
          id="mobile-nav-quiz"
          onClick={() => setActiveTab('quiz')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
            activeTab === 'quiz' ? 'bg-[#2d2927] text-[#9EB094]' : 'text-[#cfc4c6]'
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#9EB094]" /> Matcher
        </button>
        <button
          id="mobile-nav-saved"
          onClick={() => setActiveTab('saved')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
            activeTab === 'saved' ? 'bg-[#2d2927] text-[#e8e1de]' : 'text-[#cfc4c6]'
          }`}
        >
          <Heart className={`w-3 h-3 ${savedCount > 0 ? 'fill-[#c2cb9c] text-[#c2cb9c]' : ''}`} /> Saved ({savedCount})
        </button>
      </div>
    </header>
  );
};
