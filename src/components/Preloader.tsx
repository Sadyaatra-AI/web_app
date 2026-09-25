import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1000); // Progress line
    const t2 = setTimeout(() => setPhase(2), 2800); // Exit
    const t3 = setTimeout(() => onComplete(), 4000); // Unmount

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      id="sadhyatra-preloader"
      initial={{ y: 0 }}
      animate={phase >= 2 ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f8f6f1] select-none pointer-events-auto overflow-hidden"
    >
      {/* Contemplative ambient orb */}
      <motion.div
        animate={phase >= 2 ? { opacity: 0, scale: 0.8 } : {
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          rotate: [0, 90, 180]
        }}
        transition={phase >= 2 ? { duration: 0.5 } : { duration: 5, ease: "linear", repeat: Infinity }}
        className="absolute w-[50vh] h-[50vh] rounded-full bg-[#8c956a] blur-[80px] pointer-events-none"
      />

      <motion.div 
        animate={phase >= 2 ? { scale: 0.9, opacity: 0, y: -40 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Cinematic Logo Reveal */}
        <motion.div
          initial={{ clipPath: "inset(50% 0% 50% 0%)", scale: 1.05, filter: "blur(4px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center justify-center px-8"
        >
          <img 
            src="/logo.png" 
            alt="Sadhyatra" 
            className="h-16 sm:h-24 w-auto object-contain" 
          />
        </motion.div>

        {/* Elegant expanding line indicator */}
        <div className="relative mt-10 w-24 sm:w-32 h-[1px] bg-[#2b2728]/10 overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={phase >= 1 ? { x: "100%" } : { x: "-100%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#8c956a]"
          />
        </div>

        {/* Breathing text */}
        <div className="overflow-hidden mt-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="text-[10px] font-mono-code text-[#4a4542]/60 uppercase tracking-[0.4em]">
              Awakening
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
