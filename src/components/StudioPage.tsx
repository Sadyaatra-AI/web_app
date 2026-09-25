import React, { useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ChevronDown,
} from 'lucide-react';

import {
  CAREER_ROLES,
  FEATURES,
  FOUNDERS,
  FUTURE_PROSPECTS,
  STUDIO_CONTENT,
} from '../data/studioContent';

const studioEase: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: studioEase },
};

const lineReveal = {
  initial: { scaleX: 0, opacity: 0 },
  whileInView: { scaleX: 1, opacity: 1 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 1, ease: studioEase },
};


/* NAVIGATION                                                                  */


const StudioNav = () => (
  <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#2b2728]/10 bg-[#f8f6f1]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
      <a href="/" className="font-mono-code text-[10px] tracking-[0.24em] text-[#2b2728]">
        SADHYAATRA
      </a>

      <div className="flex items-center gap-6 font-mono-code text-[9px] uppercase tracking-[0.18em] text-[#4a4542]">
        <span className="hidden text-[#8c956a] sm:inline">
          The Studio
        </span>

        <span className="hidden h-px w-8 bg-[#2b2728]/20 sm:block" />

        <a
          href="/"
          className="transition-colors duration-300 hover:text-[#8c956a]"
        >
          Return to journeys <ArrowUpRight className="ml-1 inline h-3 w-3" />
        </a>
      </div>
    </div>
  </header>
);


/* HERO                                                                        */


const HeroSection = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], ['0%', '12%']);
  const dialRotate = useTransform(scrollYProgress, [0, 0.2], [0, 16]);

  return (
    <section className="relative min-h-screen overflow-hidden border-b border-[#2b2728]/10 bg-[#f8f6f1] pt-[72px]">
      {/* Quiet cartographic construction lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-[9%] top-0 h-full w-px bg-[#2b2728]/[0.055]" />
        <div className="absolute right-[16%] top-0 h-full w-px bg-[#2b2728]/[0.045]" />
        <div className="absolute left-0 right-0 top-[31%] h-px bg-[#2b2728]/[0.05]" />

        <motion.div
          style={{ rotate: dialRotate }}
          className="absolute -right-[26vw] top-[7%] h-[72vw] w-[72vw] max-h-[1050px] max-w-[1050px] rounded-full border border-[#8c956a]/25"
        >
          <div className="absolute inset-[5%] rounded-full border border-[#2b2728]/10" />
          <div className="absolute inset-[12%] rounded-full border-[12px] border-[#8c956a]/10" />
          <div className="absolute inset-[22%] rounded-full border border-[#2b2728]/10" />

          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <span
              key={angle}
              className="absolute left-1/2 top-1/2 h-px w-[46%] origin-left bg-[#2b2728]/10"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          ))}
        </motion.div>
      </div>

      <motion.div
        style={{ y: heroY }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-[1440px] flex-col justify-between px-5 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 lg:px-12"
      >
        <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <motion.div {...reveal} className="pt-2 lg:pt-4">
            <p className="eyebrow">{STUDIO_CONTENT.hero.eyebrow}</p>

            <div className="mt-7 h-px w-12 bg-[#8c956a]/70" />

            <p className="mt-6 max-w-xs font-fraunces text-lg leading-[1.35] text-[#4a4542] sm:text-xl">
              The studio behind the journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: studioEase }}
            className="lg:pl-8"
          >
            <h1 className="max-w-5xl font-fraunces text-[clamp(3.35rem,6.7vw,7.5rem)] font-medium leading-[0.91] tracking-[-0.035em] text-[#2b2728]">
              {STUDIO_CONTENT.hero.title}
            </h1>
          </motion.div>
        </div>

        <motion.div
          {...reveal}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-16 max-w-xl border-t border-[#2b2728]/10 pt-7 lg:ml-[23%] lg:max-w-[590px]"
        >
          <p className="text-[15px] leading-[1.8] text-[#4a4542] sm:text-[17px]">
            {STUDIO_CONTENT.hero.intro}
          </p>
        </motion.div>

        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <motion.div
            {...reveal}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <span className="font-mono-code text-[9px] uppercase tracking-[0.2em] text-[#4a4542]/70">
              {STUDIO_CONTENT.hero.scrollLabel}
            </span>
            <span className="h-px w-14 bg-[#2b2728]/20" />
            <ArrowDown className="h-3.5 w-3.5 text-[#8c956a]" />
          </motion.div>

          <div className="hidden text-right font-mono-code text-[8px] uppercase tracking-[0.18em] text-[#4a4542]/45 lg:block">
            <span>THE STUDIO</span>
            <br />
            <span>01 / 07</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};


/* THE GAP                                                                     */


const GapSection = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const sides = [
    {
      key: 'traveller' as const,
      label: 'TRAVELLER',
      title: 'Finding the right journey should feel personal.',
      items: [
        {
          short: 'Information overload, decision fatigue',
          heading: 'Too much information, too little direction.',
          detail:
            'Travellers have endless destinations, stays, activities, and recommendations — but no simple way to turn them into a journey that actually fits them.',
        },
        {
          short: 'Planning scattered across platforms',
          heading: 'Planning is scattered across platforms.',
          detail:
            'Research, transport, stays, activities, budgets, and bookings live in different places, forcing travellers to constantly switch, compare, coordinate, and compromise.',
        },
        {
          short: 'One-size-fits-all itineraries',
          heading: 'The itinerary rarely adapts to the traveller.',
          detail:
            'Most planning is built around fixed options rather than changing preferences, time, budget, pace, and what the traveller actually wants from the journey.',
        },
      ],
    },
    {
      key: 'agency' as const,
      label: 'AGENCY',
      title: 'Great experiences need better ways to reach the right traveller.',
      items: [
        {
          short: 'Hard to reach the right traveller',
          heading: 'Discovery is dominated by visibility, not fit.',
          detail:
            'Local experiences can struggle to reach travellers who would genuinely value them, while travellers are often shown the same mainstream options.',
        },
        {
          short: 'Fragmented demand and limited insight',
          heading: 'Demand is fragmented and difficult to understand.',
          detail:
            'Agencies and experience providers have limited visibility into what travellers actually want, when they want it, and how those preferences translate into bookings.',
        },
        {
          short: 'Experiences disconnected from the journey',
          heading: 'The journey is disconnected from the local experience.',
          detail:
            'Hotels, guides, activities, transport providers, and local businesses operate across separate touchpoints, making it difficult to become part of one coherent traveller journey.',
        },
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#2b2728]/10 bg-[#eeeae1]">
      <div className="pointer-events-none absolute right-[-14vw] top-[-12vw] h-[38vw] w-[38vw] rounded-full border border-[#8c956a]/15" />
      <div className="pointer-events-none absolute right-[-7vw] top-[-5vw] h-[24vw] w-[24vw] rounded-full border border-[#2b2728]/[0.06]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
        <motion.div
          {...reveal}
          className="grid gap-7 lg:grid-cols-[0.32fr_1fr] lg:items-start"
        >
          <p className="eyebrow">{STUDIO_CONTENT.gap.eyebrow}</p>

          <p className="max-w-2xl text-[15px] leading-[1.75] text-[#4a4542] sm:text-[17px]">
            {STUDIO_CONTENT.gap.subheading}
          </p>
        </motion.div>

        <motion.div
          {...lineReveal}
          className="mt-12 origin-left border-t border-[#2b2728]/15"
        />

        <div className="mt-8 grid lg:grid-cols-2">
          {sides.map((side, sideIndex) => (
            <motion.article
              key={side.key}
              {...reveal}
              transition={{
                delay: sideIndex * 0.12,
                duration: 0.8,
                ease: studioEase,
              }}
              className={`relative ${sideIndex === 0
                ? 'lg:border-r lg:border-[#2b2728]/15 lg:pr-14'
                : 'pt-16 lg:pl-14 lg:pt-0'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-[9px] tracking-[0.22em] text-[#8c956a]">
                  {side.label}
                </span>

                <span className="font-mono-code text-[9px] tracking-[0.18em] text-[#4a4542]/45">
                  0{sideIndex + 1}
                </span>
              </div>

              <h2 className="mt-7 max-w-lg font-fraunces text-[clamp(1.65rem,2.45vw,2.55rem)] font-medium leading-[1.08] tracking-[-0.012em] text-[#2b2728]">
                {side.title}
              </h2>

              <div className="mt-9 border-t border-[#2b2728]/12">
                {side.items.map((item, idx) => {
                  const itemKey = `${side.key}-${idx}`;
                  const isOpen = expanded === itemKey;

                  return (
                    <div key={itemKey} className="border-b border-[#2b2728]/12">
                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : itemKey)}
                        className="group flex w-full items-center gap-4 py-5 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-mono-code text-[9px] text-[#8c956a]">
                          0{idx + 1}
                        </span>

                        <span className="flex-1 text-sm leading-relaxed text-[#2b2728] transition-colors duration-300 group-hover:text-[#8c956a] sm:text-base">
                          {item.short}
                        </span>

                        <span
                          className={`font-mono-code text-sm text-[#8c956a] transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                            }`}
                        >
                          +
                        </span>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: studioEase,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-4 pb-6 pl-8 sm:grid-cols-[0.75fr_1.25fr] sm:pl-9">
                          <p className="font-fraunces text-lg italic text-[#2b2728]">
                            {item.heading}
                          </p>

                          <p className="max-w-lg text-sm leading-[1.7] text-[#4a4542]">
                            {item.detail}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};


/* WHAT WE'RE BUILDING                                                         */


const BuildingSection = () => {
  const [active, setActive] = useState(0);
  const stage = STUDIO_CONTENT.building.stages[active];

  return (
    <section className="relative overflow-hidden border-b border-[#2b2728]/10 bg-[#dfe4d6]/55">
      <div className="pointer-events-none absolute bottom-[-16vw] left-[-10vw] h-[42vw] w-[42vw] rounded-full border border-[#8c956a]/15" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <motion.div
          {...reveal}
          className="grid items-end gap-7 border-b border-[#2b2728]/12 pb-8 lg:grid-cols-[1fr_auto_1fr]"
        >
          <p className="eyebrow lg:self-start">{STUDIO_CONTENT.building.eyebrow}</p>

          <h2 className="max-w-2xl text-left font-fraunces text-[clamp(2.6rem,4.8vw,5.8rem)] leading-[0.93] tracking-[-0.028em] text-[#2b2728] lg:text-center">
            A journey in four movements.
          </h2>

          <p className="font-mono-code text-[8px] uppercase tracking-[0.18em] text-[#4a4542]/50 lg:self-end lg:text-right">
            SELECT A STAGE
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-[0.65fr_1.35fr]">
          <div className="border-t border-[#2b2728]/15">
            {STUDIO_CONTENT.building.stages.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                className={`group flex w-full items-baseline gap-5 border-b py-5 text-left transition-colors duration-300 ${active === index
                  ? 'border-[#8c956a] text-[#2b2728]'
                  : 'border-[#2b2728]/12 text-[#4a4542]'
                  }`}
              >
                <span className="font-mono-code text-[9px] text-[#8c956a]">
                  {item.number}
                </span>

                <span className="font-fraunces text-3xl transition-transform duration-300 group-hover:translate-x-2 sm:text-4xl">
                  {item.title}
                </span>

                <span
                  className={`ml-auto h-1.5 w-1.5 rounded-full transition-opacity ${active === index ? 'bg-[#8c956a] opacity-100' : 'opacity-0'
                    }`}
                />
              </button>
            ))}
          </div>

          <motion.article
            key={stage.number}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: studioEase }}
            className="relative border-l border-[#2b2728]/15 px-0 pt-10 lg:min-h-[420px] lg:pl-16 lg:pt-0"
          >
            <div className="flex items-center justify-between border-b border-[#2b2728]/12 pb-5">
              <span className="font-mono-code text-[9px] uppercase tracking-[0.2em] text-[#8c956a]">
                {stage.tag}
              </span>

              <span className="font-mono-code text-[9px] text-[#4a4542]/45">
                {stage.number} / 04
              </span>
            </div>

            <h3 className="mt-10 font-fraunces text-6xl leading-[0.9] tracking-[-0.025em] text-[#2b2728] sm:text-8xl">
              {stage.title}
            </h3>

            <p className="mt-8 max-w-xl font-fraunces text-2xl leading-[1.2] text-[#2b2728] sm:text-3xl">
              {stage.short}
            </p>

            <p className="mt-10 max-w-2xl border-t border-[#2b2728]/12 pt-6 text-base leading-[1.75] text-[#4a4542]">
              {stage.long}
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};


/* PRODUCT                                                     */


const FeatureConstellation = () => {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];

  const positions = [
    { x: 15, y: 18 },
    { x: 50, y: 7 },
    { x: 85, y: 18 },
    { x: 15, y: 82 },
    { x: 50, y: 93 },
    { x: 85, y: 82 },
  ];

  const selectFeature = (index: number) => setActive(index);

  return (
    <section className="relative overflow-hidden border-b border-[#2b2728]/10 bg-[#f8f6f1]">
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-36 lg:px-12">
        <motion.div
          {...reveal}
          className="grid gap-8 lg:grid-cols-[0.28fr_1fr] lg:items-end"
        >
          <p className="eyebrow">THE PRODUCT</p>

          <h2 className="max-w-4xl font-fraunces text-[clamp(2.8rem,5.3vw,6rem)] leading-[0.92] tracking-[-0.025em] text-[#2b2728]">
            A constellation of better ways to travel.
          </h2>
        </motion.div>

        {/* Desktop constellation + details, visible together */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-[1.45fr_0.55fr] lg:items-stretch">
          {/* Graph */}
          <div className="relative h-[640px] overflow-visible">
            {/* All six connection lines remain visible */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 640"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {positions.map((position, index) => (
                <motion.line
                  key={index}
                  x1="500"
                  y1="320"
                  x2={position.x * 10}
                  y2={position.y * 6.4}
                  animate={{
                    stroke: active === index ? '#8c956a' : '#2b2728',
                    strokeOpacity: active === index ? 0.82 : 0.30,
                    strokeWidth: active === index ? 1.8 : 1.15,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}

              <circle
                cx="500"
                cy="305"
                r="4"
                fill="#8c956a"
                fillOpacity=".65"
              />
            </svg>

            {/* Centre */}
            <div className="absolute left-1/2 top-1/2 z-10 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#8c956a]/45 bg-[#f8f6f1]">
              <div className="relative text-center">
                <span className="font-mono-code text-[8px] tracking-[0.24em] text-[#2b2728]">
                  SADHYAATRA
                </span>
                <span className="mt-3 block font-mono-code text-[7px] uppercase tracking-[0.18em] text-[#8c956a]">
                  {String(active + 1).padStart(2, '0')} / 06
                </span>
              </div>
            </div>

            {/* Feature stations */}
            {FEATURES.map((item, index) => {
              const position = positions[index];
              const isActive = active === index;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => selectFeature(index)}
                  onMouseEnter={() => setActive(index)}
                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 text-left outline-none"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                  aria-label={`Show ${item.name}`}
                >
                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.25 }}
                    className={`w-[235px] border px-5 py-4 transition-colors duration-300 ${isActive
                      ? 'border-[#8c956a] bg-[#f8f6f1]'
                      : 'border-[#2b2728]/14 bg-[#f8f6f1] hover:border-[#8c956a]/60'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono-code text-[8px] tracking-[0.16em] text-[#8c956a]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="font-mono-code text-[7px] uppercase tracking-[0.15em] text-[#4a4542]/50">
                        {item.status}
                      </span>
                    </div>

                    <span className="mt-3 block font-fraunces text-[21px] leading-[0.95] text-[#2b2728]">
                      {item.name}
                    </span>

                    <span className="mt-3 block font-mono-code text-[7px] uppercase tracking-[0.14em] text-[#4a4542]/45">
                      {item.date}
                    </span>
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* Active feature details — always visible beside graph */}
          <motion.aside
            key={feature.name}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: studioEase }}
            className="flex min-h-[640px] flex-col justify-between border-y border-r border-[#2b2728]/10 bg-[#ded7cb]/20 px-7 py-8 xl:px-9"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#2b2728]/12 pb-5">
                <span className="font-mono-code text-[8px] uppercase tracking-[0.18em] text-[#8c956a]">
                  {String(active + 1).padStart(2, '0')} / 06
                </span>

                <span className="font-mono-code text-[8px] uppercase tracking-[0.16em] text-[#4a4542]/50">
                  {feature.status}
                </span>
              </div>

              <p className="mt-10 font-mono-code text-[8px] uppercase tracking-[0.18em] text-[#8c956a]">
                {feature.date}
              </p>

              <h3 className="mt-4 font-fraunces text-4xl leading-[0.92] tracking-[-0.02em] text-[#2b2728] xl:text-5xl">
                {feature.name}
              </h3>

              <p className="mt-8 border-t border-[#2b2728]/12 pt-7 text-sm leading-[1.75] text-[#4a4542] xl:text-base">
                {feature.description}
              </p>
            </div>

            <div>
              <div className="mb-7 flex gap-1.5">
                {FEATURES.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => selectFeature(index)}
                    aria-label={`Show ${item.name}`}
                    className={`h-1 transition-all duration-300 ${active === index
                      ? 'w-8 bg-[#8c956a]'
                      : 'w-3 bg-[#2b2728]/15 hover:bg-[#8c956a]/50'
                      }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => selectFeature((active + 1) % FEATURES.length)}
                className="flex w-full items-center justify-between border-t border-[#2b2728]/15 pt-5 text-left"
              >
                <span className="font-mono-code text-[8px] uppercase tracking-[0.16em] text-[#2b2728]">
                  {feature.cta}
                </span>

                <ArrowUpRight className="h-4 w-4 text-[#8c956a]" />
              </button>
            </div>
          </motion.aside>
        </div>

        {/* Mobile editorial timeline */}
        <div className="mt-14 block lg:hidden">
          <div className="relative border-t border-[#2b2728]/10 pt-10">
            <div className="absolute bottom-0 left-5 top-10 w-px bg-[#8c956a]/25" />

            <div className="space-y-12 pl-14">
              {FEATURES.map((item, index) => (
                <article key={item.name} className="relative">
                  <span className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#8c956a] bg-[#f8f6f1]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8c956a]" />
                  </span>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono-code text-[8px] uppercase tracking-[0.16em] text-[#8c956a]">
                      {String(index + 1).padStart(2, '0')} · {item.status}
                    </span>

                    <span className="font-mono-code text-[8px] uppercase tracking-[0.14em] text-[#4a4542]/40">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="mt-3 font-fraunces text-3xl leading-[1] text-[#2b2728]">
                    {item.name}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-[1.7] text-[#4a4542]">
                    {item.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 font-mono-code text-[8px] uppercase tracking-[0.15em] text-[#2b2728]">
                    {item.cta}
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#8c956a]" />
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* FOUNDERS                                                                    */
/* -------------------------------------------------------------------------- */

const FoundersSection = () => (
  <section className="border-b border-[#2b2728]/10 bg-[#f8f6f1]">
    <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
      <motion.div {...reveal} className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
        <p className="eyebrow">THE PEOPLE</p>

        <h2 className="max-w-4xl font-fraunces text-5xl leading-[0.94] tracking-[-0.025em] text-[#2b2728] sm:text-7xl lg:text-8xl">
          The people building sadhyaatra.
        </h2>
      </motion.div>

      <div className="mt-24">
        {FOUNDERS.map((founder, index) => (
          <motion.article
            key={`${founder.name}-${index}`}
            {...reveal}
            transition={{
              delay: index * 0.12,
              duration: 0.8,
              ease: studioEase,
            }}
            className="border-t border-[#2b2728]/15 py-10 sm:py-14"
          >
            <div className="grid gap-8 lg:grid-cols-[0.18fr_0.75fr_1fr] lg:items-start lg:gap-12">
              <span className="font-mono-code text-[9px] tracking-[0.18em] text-[#8c956a]">
                0{index + 1}
              </span>

              <div>
                <p className="font-mono-code text-[9px] uppercase tracking-[0.18em] text-[#8c956a]">
                  {founder.role}
                </p>

                <h3 className="mt-4 font-fraunces text-5xl lowercase leading-[0.9] tracking-[-0.02em] text-[#2b2728] sm:text-7xl">
                  {founder.name}
                </h3>

                <a
                  href={founder.link}
                  className="mt-7 inline-flex items-center font-mono-code text-[9px] uppercase tracking-[0.15em] text-[#4a4542] transition-colors hover:text-[#8c956a]"
                >
                  Connect <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>

              <div className="max-w-xl">
                {founder.bio && (
                  <p className="text-base leading-[1.75] text-[#4a4542] sm:text-lg">
                    {founder.bio}
                  </p>
                )}

                {founder.philosophy && (
                  <p className="mt-8 border-t border-[#2b2728]/12 pt-7 font-fraunces text-xl italic leading-[1.35] text-[#2b2728] sm:text-2xl">
                    {founder.philosophy}
                  </p>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* FUTURE PROSPECTS                                                            */
/* -------------------------------------------------------------------------- */

const FutureProspectsSection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden border-b border-[#2b2728]/10 bg-[#dfe4d6]/55">
      <div className="pointer-events-none absolute bottom-[-16vw] left-[-10vw] h-[42vw] w-[42vw] rounded-full border border-[#8c956a]/15" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <motion.div
          {...reveal}
          className="grid gap-8 lg:grid-cols-[0.45fr_1fr]"
        >
          <p className="eyebrow">THE JOURNEY AHEAD</p>

          <div>
            <h2 className="max-w-5xl font-fraunces text-5xl leading-[0.94] tracking-[-0.025em] text-[#2b2728] sm:text-7xl lg:text-8xl">
              Future prospects / coming soon
            </h2>

            <p className="mt-6 font-fraunces text-2xl italic text-[#4a4542]">
              The journey doesn't end with planning.
            </p>
          </div>
        </motion.div>

        <div className="mt-20 border-t border-[#2b2728]/15">
          {FUTURE_PROSPECTS.map((item, index) => {
            const isActive = active === index;

            return (
              <motion.article
                key={`${item.name}-${index}`}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                className={`group grid border-b border-[#2b2728]/15 py-7 transition-all duration-500 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:gap-8 ${isActive ? 'px-3 sm:px-5' : 'px-0'
                  }`}
              >
                <span className="font-mono-code text-[9px] tracking-[0.18em] text-[#8c956a]">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="font-fraunces text-3xl leading-none text-[#2b2728] transition-transform duration-500 group-hover:translate-x-1 sm:text-4xl">
                    {item.name}
                  </h3>

                  <span className="mt-2 block font-mono-code text-[8px] uppercase tracking-[0.14em] text-[#8c956a]">
                    {item.tag}
                  </span>

                  <motion.p
                    initial={false}
                    animate={{
                      height: isActive ? 'auto' : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 12 : 0,
                    }}
                    transition={{
                      duration: 0.35,
                      ease: studioEase,
                    }}
                    className="max-w-2xl overflow-hidden text-sm leading-[1.7] text-[#4a4542] sm:text-base"
                  >
                    {item.description}
                  </motion.p>
                </div>

                <ArrowUpRight
                  className={`mt-2 h-5 w-5 shrink-0 text-[#8c956a] transition-transform duration-500 sm:mt-0 ${isActive ? 'translate-x-1 -translate-y-1' : ''
                    }`}
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* CAREERS                                                                     */
/* -------------------------------------------------------------------------- */

const CareersSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="careers" className="border-b border-[#2b2728]/10 bg-[#f8f6f1]">
      <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
        <motion.div {...reveal} className="max-w-5xl">
          <p className="eyebrow">{STUDIO_CONTENT.careers.eyebrow}</p>

          <h2 className="mt-7 font-fraunces text-6xl leading-[0.9] tracking-[-0.03em] text-[#2b2728] sm:text-8xl lg:text-[9rem]">
            {STUDIO_CONTENT.careers.title}
          </h2>

          <p className="mt-8 max-w-xl text-base leading-[1.75] text-[#4a4542] sm:text-lg">
            {STUDIO_CONTENT.careers.intro}
          </p>
        </motion.div>

        <div className="mt-16 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#2b2728]/12 py-5 font-mono-code text-[8px] uppercase tracking-[0.18em] text-[#8c956a]">
          {[
            'DESIGN',
            'ENGINEERING',
            'TRAVEL',
            'PRODUCT',
            'STORYTELLING',
            'CURATION',
            'OPERATIONS',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <div className="mt-8">
          {CAREER_ROLES.length === 0 ? (
            <div className="flex flex-col gap-4 border-b border-[#2b2728]/15 py-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-fraunces text-2xl text-[#2b2728]">
                No careers available at the moment. Please check back later.
              </p>

              <span className="font-mono-code text-[8px] uppercase tracking-[0.16em] text-[#8c956a]">
                CHECK BACK LATER
              </span>
            </div>
          ) : (
            CAREER_ROLES.map((role, index) => (
              <div key={`${role.title}-${index}`} className="border-b border-[#2b2728]/15">
                <button
                  type="button"
                  onClick={() => setOpen(open === index ? null : index)}
                  className="flex w-full items-center justify-between py-6 text-left"
                  aria-expanded={open === index}
                >
                  <span className="font-fraunces text-2xl text-[#2b2728] sm:text-4xl">
                    {role.title}
                    <ArrowUpRight className="ml-2 inline h-4 w-4 text-[#8c956a]" />
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-[#8c956a] transition-transform ${open === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {open === index && (
                  <div className="grid gap-5 pb-7 text-sm leading-[1.7] text-[#4a4542] sm:grid-cols-3">
                    <span>
                      {role.location} / {role.type}
                    </span>
                    <span>{role.description}</span>
                    <span>
                      {role.requirements}
                      <a href={role.link} className="mt-2 block text-[#8c956a]">
                        Apply <ArrowUpRight className="inline h-3.5 w-3.5" />
                      </a>
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/* FINAL                                                                       */
/* -------------------------------------------------------------------------- */

const FinalSection = () => (
  <section className="relative overflow-hidden bg-[#e9eee5] px-5 py-36 sm:px-8 sm:py-56">
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[900px] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8c956a]/10" />

    <motion.div
      {...reveal}
      className="relative mx-auto max-w-6xl text-center"
    >
      <p className="eyebrow">SADHYAATRA / THE STUDIO</p>

      <h2 className="mt-10 font-fraunces text-6xl leading-[0.92] tracking-[-0.035em] text-[#2b2728] sm:text-8xl lg:text-[9rem]">
        {STUDIO_CONTENT.final.statement}
      </h2>

      <div className="mt-14 flex flex-wrap justify-center gap-8 font-mono-code text-[9px] uppercase tracking-[0.18em]">
        <a
          href="/"
          className="text-[#8c956a] transition-colors hover:text-[#2b2728]"
        >
          Explore SADHYAATRA <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
        </a>

        <a
          href="#careers"
          className="text-[#4a4542] transition-colors hover:text-[#2b2728]"
        >
          Work with us <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" />
        </a>
      </div>
    </motion.div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

export const StudioPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div className="min-h-screen overflow-hidden bg-[#f8f6f1] text-[#2b2728] font-jost">
      <StudioNav />

      <main>
        <HeroSection />
        <GapSection />
        <BuildingSection />
        <FeatureConstellation />
        <FoundersSection />
        <FutureProspectsSection />
        <CareersSection />
        <FinalSection />
      </main>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed bottom-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[#8c956a]"
      />
    </div>
  );
};
