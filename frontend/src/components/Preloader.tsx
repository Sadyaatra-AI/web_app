import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'done'>('loading');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPhase('revealing');
          setTimeout(() => {
            setPhase('done');
            onComplete();
          }, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 8;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          id="sadyaatra-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[#f8f6f1] text-[#2b2728] select-none"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between font-mono-code text-xs text-[#4a4542] tracking-widest uppercase">
            <div className="flex items-center gap-2 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-[#8c956a] animate-pulse" />
              <span>Sadyaatra Archives</span>
            </div>
            <span>Coordinates: 14.5479° N, 74.3188° E</span>
          </div>

          {/* Center Title */}
          <div className="my-auto text-center max-w-2xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-4"
            >
              <img
                src="/logo.png"
                alt="Sadyaatra"
                className="h-16 sm:h-24 w-auto object-contain max-w-[280px]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-jost text-xs sm:text-sm text-[#8c956a] tracking-[0.28em] uppercase font-semibold"
            >
              Mindful & Solitary Travel Sanctuaries
            </motion.p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-md mx-auto space-y-3">
            <div className="flex justify-between font-mono-code text-xs text-[#4a4542]">
              <span>Mapping sanctuary routes</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="w-full h-1 bg-[#2b2728]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#8c956a]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
