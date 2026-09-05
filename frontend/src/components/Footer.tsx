import React from 'react';
import { Compass, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onOpenAI }) => {
  return (
    <footer id="main-footer" className="w-full border-t border-[#2d2927] bg-[#100e0c] text-[#cfc4c6] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 sm:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Sadyaatra" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
            <p className="text-xs sm:text-sm text-[#cfc4c6] max-w-md leading-relaxed font-light">
              Sadyaatra is a sanctuary curation platform created for the conscious traveler. We reject crowded tourism in favor of slow, poetic, culturally anchored voyages.
            </p>
            <div className="font-mono-code text-[11px] text-[#8c956a] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8c956a] animate-pulse" />
              <span>Sanctuary Archives active across Indian & Asian corridors</span>
            </div>
          </div>

          {/* Quick Curations */}
          <div className="space-y-3">
            <h4 className="font-mono-code text-xs text-[#e8e1de] uppercase tracking-widest">Sanctuary Archetypes</h4>
            <ul className="space-y-2 text-xs text-[#cfc4c6]">
              <li className="hover:text-[#9EB094] cursor-pointer transition-colors">Coastal Cliffs & Hidden Coves</li>
              <li className="hover:text-[#9EB094] cursor-pointer transition-colors">High Altitude Trans-Himalayas</li>
              <li className="hover:text-[#9EB094] cursor-pointer transition-colors">Heritage Havelis & Lake Palaces</li>
              <li className="hover:text-[#9EB094] cursor-pointer transition-colors">Sacred Ghats & Yogic Ashrams</li>
            </ul>
          </div>

          {/* Explorations & Tools */}
          <div className="space-y-3">
            <h4 className="font-mono-code text-xs text-[#e8e1de] uppercase tracking-widest">Curatorial Tools</h4>
            <ul className="space-y-2 text-xs text-[#cfc4c6]">
              <li>
                <button onClick={onOpenQuiz} className="hover:text-[#9EB094] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9EB094]" /> Trip Match Algorithm
                </button>
              </li>
              <li>
                <button onClick={onOpenAI} className="hover:text-[#9EB094] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9EB094]" /> AI Voyage Companion
                </button>
              </li>
              <li className="text-[#cfc4c6]/70">Financial Realism & Transits</li>
              <li className="text-[#cfc4c6]/70">Mindful Travel Etiquette</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#221f1d] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#cfc4c6]/60">
          <div>© {new Date().getFullYear()} Sadyaatra Curation. All journeys respectfully cataloged.</div>
          <div className="flex items-center gap-1 text-[#9EB094]">
            <span>Crafted with intention</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
