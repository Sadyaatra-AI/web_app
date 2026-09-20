import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Phase 0: Logo reveals (0s -> 1.5s)
    const t1 = setTimeout(() => setPhase(1), 1500); // Trigger dark rectangle slide up
    const t2 = setTimeout(() => setPhase(2), 2300); // Trigger image reveal inside rectangle
    const t3 = setTimeout(() => setPhase(3), 3300); // Trigger floating text
    const t4 = setTimeout(() => setPhase(4), 5200); // Trigger scroll up exit
    const t5 = setTimeout(() => onComplete(), 6000); // Complete and unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          id="sadyaatra-preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#e4dfd1] select-none"
        >
          {/* Main central container */}
          <div className="relative flex items-center justify-center w-full max-w-2xl h-[600px]">
            
            {/* Phase 0: Logo Layer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img src="/logo.png" alt="Sadyaatra" className="h-16 sm:h-24 max-w-[240px] sm:max-w-[320px] w-auto object-contain" />
            </motion.div>

            {/* Phase 1 & 2: Vertical Dark Rectangle & Image Reveal */}
            <motion.div
              initial={{ height: 0, bottom: "50%", y: "50%" }}
              animate={phase >= 1 ? { height: "500px" } : { height: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute w-[320px] sm:w-[420px] bg-[#2b2728] overflow-hidden flex items-end justify-center shadow-2xl"
              style={{ zIndex: 10 }}
            >
              {/* Image moving up inside the mask */}
              <motion.div
                 initial={{ y: "100%" }}
                 animate={phase >= 2 ? { y: "0%" } : { y: "100%" }}
                 transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                 className="absolute inset-0 w-full h-full"
              >
                 <img src="/preloader.jpg" alt="Atmosphere" className="w-full h-full object-cover opacity-90" />
              </motion.div>
            </motion.div>

            {/* Phase 3: Floating Tagline */}
            <AnimatePresence>
              {phase >= 3 && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute z-20 w-[140%] text-center pointer-events-none"
                >
                  <h1 className="font-ebGaramond text-4xl sm:text-5xl lg:text-6xl text-[#1a1818] leading-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.6)]">
                    Find Your<br />Inner Peace
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
