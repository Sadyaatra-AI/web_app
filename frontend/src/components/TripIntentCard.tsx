import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface TripIntentCardProps {
  onSelectOption: (prompt: string) => void;
}

const STORY_CARDS = [
  {
    number: '01',
    label: 'THE PROBLEM',
    title: 'When every journey starts to look the same.',
    copy: 'Placeholder copy about crowded itineraries, hurried checklists, and the quiet parts of travel getting lost along the way.',
    accent: '#8c956a',
    surface: '#f8f6f1',
  },
  {
    number: '02',
    label: 'THE BELIEF',
    title: 'Travel can leave more room to notice.',
    copy: 'Placeholder copy about moving with intention, meeting places with openness, and allowing a journey to unfold at its own pace.',
    accent: '#526a45',
    surface: '#ded7cb',
  },
  {
    number: '03',
    label: 'SADHYAATRA',
    title: 'A more mindful way to find your way there.',
    copy: 'Placeholder copy introducing SADHYAATRA as a considered collection of places, stories, and journeys shaped around how you want to feel.',
    accent: '#a66f5b',
    surface: '#d6cfcc',
  },
  {
    number: '04',
    label: 'YOUR JOURNEY',
    title: 'Begin with the feeling you want to carry home.',
    copy: 'Placeholder copy inviting the traveller to imagine a personal route, shaped by curiosity, pace, and the places that feel meaningful.',
    accent: '#9eb094',
    surface: '#c6cab2',
  },
];

const StoryCard: React.FC<{ card: (typeof STORY_CARDS)[number]; index: number }> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -1.2 : 1.2, 0]);

  return (
    <div ref={cardRef} className="sticky top-20 sm:top-24" style={{ zIndex: index + 1 }}>
      <motion.article
        style={{ scale, y, rotate, backgroundColor: card.surface }}
        className="relative min-h-[62vh] sm:min-h-[66vh] overflow-hidden rounded-[2rem] border border-[#2b2728]/10 px-6 py-8 sm:px-10 sm:py-12 lg:px-16 lg:py-14 shadow-[0_18px_50px_rgba(43,39,40,0.10)]"
      >
        <div
          className="absolute right-0 top-0 h-full w-1/3 opacity-20"
          style={{ background: `linear-gradient(135deg, transparent 25%, ${card.accent} 100%)` }}
        />

        <div className="relative z-10 flex min-h-[calc(62vh-4rem)] sm:min-h-[calc(66vh-6rem)] flex-col justify-between">
          <div className="flex items-start justify-between gap-6 border-b border-[#2b2728]/15 pb-5">
            <span className="font-mono-code text-xs tracking-[0.2em] text-[#2b2728]/60">
              {card.number} — {card.label}
            </span>
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: card.accent }} />
          </div>

          <div className="max-w-3xl py-12 sm:py-16">
            <p className="mb-5 font-mono-code text-[10px] uppercase tracking-[0.2em]" style={{ color: card.accent }}>
              A note from SADHYAATRA
            </p>
            <h3 className="max-w-2xl font-fraunces text-4xl font-normal leading-[1.08] text-[#2b2728] sm:text-6xl lg:text-7xl">
              {card.title}
            </h3>
            <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-[#4a4542] sm:text-lg">
              {card.copy}
            </p>
          </div>

          <div className="flex items-end justify-between gap-6 border-t border-[#2b2728]/15 pt-5">
            <span className="font-fraunces text-sm italic text-[#4a4542]/75">Placeholder story section</span>
            <span className="font-mono-code text-[10px] tracking-[0.16em] text-[#2b2728]/50">SCROLL TO CONTINUE</span>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const TripIntentCard: React.FC<TripIntentCardProps> = ({ onSelectOption }) => {
  void onSelectOption;

  return (
    <section id="trip-intent-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <header className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
        <p className="mb-5 font-mono-code text-[10px] uppercase tracking-[0.24em] text-[#8c956a]">
          The idea behind SADHYAATRA
        </p>
        <h2 className="font-fraunces text-4xl font-normal leading-[1.08] text-[#2b2728] sm:text-6xl lg:text-7xl">
          Travel should feel like a story you are still becoming part of.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-[#4a4542] sm:text-lg">
          A placeholder introduction for the philosophy behind SADHYAATRA, and the slower, more meaningful journeys we hope to make possible.
        </p>
      </header>

      <div className="space-y-[-4rem] sm:space-y-[-5rem]">
        {STORY_CARDS.map((card, index) => (
          <StoryCard key={card.number} card={card} index={index} />
        ))}
      </div>
    </section>
  );
};
