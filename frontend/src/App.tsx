import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CuratedCarousel } from './components/CuratedCarousel';
import { JourneySection } from './components/JourneySection';
import { DestinationCard } from './components/DestinationCard';
import { SplitScreenDestinationDetail } from './components/SplitScreenDestinationDetail';
import { MatchQuizModal } from './components/MatchQuizModal';
import { AIChatDrawer } from './components/AIChatDrawer';
import { TripIntentCard } from './components/TripIntentCard';
import { Footer } from './components/Footer';
import { StudioPage } from './components/StudioPage';
import { DESTINATIONS } from './data/destinations';
import { Destination, FilterState, Region } from './types';
import { Heart, Sparkles, Compass, MapPin, Search } from 'lucide-react';

export function App() {
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'explore' | 'quiz' | 'saved'>('explore');
  const catalogRef = useRef<HTMLDivElement>(null);
  const [apiDestinations, setApiDestinations] = useState<Destination[]>(DESTINATIONS);
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sadhyatra_saved') || localStorage.getItem('sadyaatra_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [aiChatContext, setAiChatContext] = useState<Destination | null>(null);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    region: 'All',
    maxBudget: 100000,
    mood: 'All Moods',
    type: 'All Types',
    duration: 'all',
    sortBy: 'recommended',
  });

  // Fetch live destinations from backend DB API
  useEffect(() => {
    let isMounted = true;
    const fetchApiDestinations = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.set('search', filters.search);
        if (filters.region !== 'All') queryParams.set('region', filters.region);
        if (filters.mood !== 'All Moods') queryParams.set('mood', filters.mood);
        if (filters.type !== 'All Types') queryParams.set('type', filters.type);
        if (filters.sortBy) queryParams.set('sortBy', filters.sortBy);

        const res = await fetch(`/api/destinations?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.destinations && Array.isArray(data.destinations) && data.destinations.length > 0) {
            setApiDestinations(data.destinations);
          }
        }
      } catch (err) {
        console.warn('Backend API fetch notice (using cached data):', err);
      }
    };
    fetchApiDestinations();
    return () => {
      isMounted = false;
    };
  }, [filters]);

  // Save to LocalStorage & Backend sync
  useEffect(() => {
    try {
      localStorage.setItem('sadhyatra_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    fetch('/api/saved/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  };

  const scrollToCatalog = () => {
    setActiveTab('explore');
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenAIChat = (prompt?: string, dest?: Destination) => {
    setAiInitialPrompt(prompt);
    setAiChatContext(dest || null);
    setIsAIChatOpen(true);
  };

  // Filter and Sort logic
  const filteredDestinations = useMemo(() => {
    return apiDestinations.filter((dest) => {
      if (activeTab === 'saved' && !savedIds.includes(dest.id)) {
        return false;
      }

      if (
        filters.search &&
        !dest.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !dest.state.toLowerCase().includes(filters.search.toLowerCase()) &&
        !dest.tag.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      if (filters.region !== 'All' && dest.region !== filters.region) {
        return false;
      }

      if (filters.maxBudget < dest.estBudget) {
        return false;
      }

      if (
        filters.mood !== 'All Moods' &&
        !dest.vibes?.some((v) => v.toLowerCase().includes(filters.mood.toLowerCase()))
      ) {
        return false;
      }

      if (filters.type !== 'All Types' && dest.type !== filters.type) {
        return false;
      }

      return true;
    });
  }, [apiDestinations, filters, activeTab, savedIds]);

  const validSavedCount = useMemo(() => {
    return savedIds.filter((id) => apiDestinations.some((d) => d.id === id)).length;
  }, [savedIds, apiDestinations]);

  if (window.location.pathname === '/studio') {
    return <StudioPage />;
  }

  return (
    <div className="min-h-screen bg-[#f8f6f1] text-[#2b2728] font-jost selection:bg-[#8c956a]/30 selection:text-[#2b2728] flex flex-col relative">
      {/* Atmosphere Preloader Overlay */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Global Header */}
      {!showPreloader && (
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={validSavedCount}
          onOpenChat={() => handleOpenAIChat()}
          searchQuery={filters.search}
          setSearchQuery={(q) => setFilters((prev) => ({ ...prev, search: q }))}
        />
      )}

      {/* Main Viewports */}
      <main className="flex-1">
        {/* TAB 1: EXPLORE / DESTINATIONS */}
        {activeTab === 'explore' && (
          <div>
            {/* 1. CINEMATIC HERO SECTION WITH 3D MAP MASK */}
            <HeroSection
              onSelectMood={(mood) => {
                setFilters((prev) => ({ ...prev, mood }));
                scrollToCatalog();
              }}
              selectedRegion={filters.region}
              onSelectRegion={(region: Region) => {
                setFilters((prev) => ({ ...prev, region }));
                scrollToCatalog();
              }}
              onStartQuiz={() => setActiveTab('quiz')}
              onExploreClick={() => handleOpenAIChat()}
            />

            {/* 1.5 CLASSY TRIP INTENT CARD */}
            <TripIntentCard
              onSelectOption={(prompt) => handleOpenAIChat(prompt)}
            />

            {/* 2. CURATED DESTINATION EXPLORATION */}
            <CuratedCarousel
              destinations={filteredDestinations}
              catalogRef={catalogRef}
              filters={filters}
              setFilters={setFilters}
              totalCount={filteredDestinations.length}
              isSaved={(id) => savedIds.includes(id)}
              onToggleSave={toggleSave}
              onSelectDestination={(d) => setSelectedDestination(d)}
            />

            {/* 3. MACBOOK SCROLL PERSPECTIVE SHOWCASE (Ref: Pagecoder.ai) */}
            <JourneySection
              onExploreClick={scrollToCatalog}
              onOpenAI={(p) => handleOpenAIChat(p)}
            />

          </div>
        )}

        {/* TAB 2: TRIP MATCHER QUIZ */}
        {activeTab === 'quiz' && (
          <div className="py-10">
            <MatchQuizModal
              destinations={DESTINATIONS}
              onSelectDestination={(d) => setSelectedDestination(d)}
            />
          </div>
        )}

        {/* TAB 3: SAVED DESTINATIONS */}
        {activeTab === 'saved' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
            <div className="border-b border-[#2b2728]/10 pb-6 flex items-baseline justify-between">
              <div>
                <span className="font-mono-code text-[11px] text-[#8c956a] uppercase tracking-widest block mb-1">
                  Private Curations
                </span>
                <h2 className="font-ebGaramond text-3xl sm:text-4xl text-[#2b2728]">
                  Your Saved Destinations ({savedIds.length})
                </h2>
              </div>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="text-center py-24 bg-white border border-[#2b2728]/10 rounded-3xl p-8 space-y-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#f8f6f1] border border-[#8c956a]/30 flex items-center justify-center mx-auto text-[#8c956a]">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="font-ebGaramond text-2xl text-[#2b2728]">No saved destinations yet</h3>
                <p className="text-xs sm:text-sm text-[#4a4542] max-w-md mx-auto">
                  Explore our curated catalogue and click the heart icon to save your favorite destinations for future journeys.
                </p>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="px-5 py-2 rounded-full bg-[#8c956a] hover:bg-[#7a835a] text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Explore Destinations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((dest, idx) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    isSaved={savedIds.includes(dest.id)}
                    onToggleSave={toggleSave}
                    onSelect={(d) => setSelectedDestination(d)}
                    index={idx}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 60/40 EDITORIAL SPLIT-SCREEN DESTINATION DOSSIER WITH INTEGRATED AI COMPANION */}
      <SplitScreenDestinationDetail
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        isSaved={selectedDestination ? savedIds.includes(selectedDestination.id) : false}
        onToggleSave={toggleSave}
        allDestinations={DESTINATIONS}
      />

      {/* Global AI Travel Companion Drawer */}
      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        destinations={DESTINATIONS}
        activeDestination={aiChatContext}
        initialPrompt={aiInitialPrompt}
      />

      {/* Global Floating AI Companion Trigger */}
      <button
        id="floating-ai-companion-btn"
        onClick={() => handleOpenAIChat()}
        className="fixed bottom-6 right-6 z-40 bg-[#8c956a] hover:bg-[#7a835a] text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-lg flex items-center gap-2.5 font-medium text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 group"
        title="Open AI Travel Companion"
      >
        <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Ask AI Companion</span>
      </button>

      {/* Footer */}
      <Footer
        onOpenQuiz={() => setActiveTab('quiz')}
        onOpenAI={() => handleOpenAIChat()}
      />
    </div>
  );
}
export default App;
