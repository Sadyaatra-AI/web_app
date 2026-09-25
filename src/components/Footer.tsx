import React from 'react';
import { Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenAI: () => void;
}

const XIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onOpenQuiz, onOpenAI }) => {
  return (
    <footer id="main-footer" className="w-full border-t border-[#2b2728]/10 bg-[#f8f6f1] text-[#4a4542] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-4 sm:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Sadhyatra" className="h-10 sm:h-12 w-auto object-contain" />
            </div>
            <p className="text-xs sm:text-sm text-[#4a4542] max-w-md leading-relaxed font-light">
              Sadhyatra is a destination curation platform created for the conscious traveler. We reject crowded tourism in favor of slow, poetic, culturally anchored voyages.
            </p>
            <div className="font-mono-code text-[11px] text-[#8c956a] flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#8c956a] animate-pulse" />
              <span>Destination Archives active across Indian & Asian corridors</span>
            </div>
          </div>

          {/* Quick Links & About */}
          <div className="space-y-3">
            <h4 className="font-mono-code text-xs text-[#2b2728] uppercase tracking-widest font-semibold">Navigation</h4>
            <ul className="space-y-2 text-xs text-[#4a4542]">
              <li>
                <a href="/studio" className="hover:text-[#8c956a] transition-colors font-medium">About</a>
              </li>
              <li>
                <a href="mailto:contact@sadhyatra.com" className="hover:text-[#8c956a] transition-colors font-medium">Contact</a>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-[#8c956a] transition-colors flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#8c956a]" /> Trip Matcher
                </button>
              </li>
              <li>
                <button onClick={onOpenAI} className="hover:text-[#8c956a] transition-colors flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-[#8c956a]" /> AI Companion
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links & Connect */}
          <div className="space-y-3">
            <h4 className="font-mono-code text-xs text-[#2b2728] uppercase tracking-widest font-semibold">Social</h4>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.instagram.com/sadhyaatra/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-[#2b2728]/15 bg-white/60 hover:bg-[#8c956a] hover:text-white hover:border-[#8c956a] flex items-center justify-center text-[#2b2728] transition-all duration-300 shadow-sm"
              >
                <span className="text-xs font-semibold">IG</span>
              </a>
              <a
                href="https://x.com/SadhyaatraAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full border border-[#2b2728]/15 bg-white/60 hover:bg-[#8c956a] hover:text-white hover:border-[#8c956a] flex items-center justify-center text-[#2b2728] transition-all duration-300 shadow-sm"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-[#2b2728]/15 bg-white/60 hover:bg-[#8c956a] hover:text-white hover:border-[#8c956a] flex items-center justify-center text-[#2b2728] transition-all duration-300 shadow-sm"
              >
                <span className="text-xs font-semibold">in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2b2728]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#4a4542]/70">
          <div>© {new Date().getFullYear()} Sadhyatra Curation. All journeys respectfully cataloged.</div>
          <div className="flex items-center gap-1 text-[#8c956a] font-semibold">
            <span>Crafted with intention</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
