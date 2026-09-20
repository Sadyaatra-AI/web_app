import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';

interface TripIntentCardProps {
  onSelectOption: (prompt: string) => void;
}

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const STORY_CARDS = [
  {
    number: '01',
    label: 'THE FRICTION',
    title: 'Why does planning a journey feel harder than taking one?',
    copy: 'Travelling is exciting. Preparing for it can feel like a project. Destinations, stays, transport, restaurants, activities, reviews — the information exists, but it is scattered across places. Travellers are left to connect the dots, compare endless options, coordinate with others, and keep adjusting when plans change.',
    accent: '#8c956a',
    surface: '#f8f6f1',
    eyebrow: 'STILL TOO SCATTERED',
    footer: 'The problem we wanted to solve.',
  },
  {
    number: '02',
    label: 'THE IDEA',
    title: 'What if the journey was planned around you?',
    copy: 'We started SADHYAATRA with a simple question: “What if the entire journey could be planned around the traveller, instead of the traveller planning around disconnected platforms?”',
    accent: '#526a45',
    surface: '#ded7cb',
    eyebrow: 'IT CAN BE DIFFERENT',
    footer: 'The question that started it all.',
  },
  {
    number: '03',
    label: 'OUR VISION',
    title: 'Make the journey easier to imagine, experience, and plan.',
    copy: 'We envision a unified travel ecosystem where planning feels as natural as experiencing a journey. One connected place that understands what you want and need, helping make travel more accessible, personalised, transparent, and experience-driven.',
    accent: '#a66f5b',
    surface: '#d6cfcc',
    eyebrow: 'A MORE OPEN MAP',
    footer: 'The future we are building.',
  },
  {
    number: '04',
    label: 'OUR MISSION',
    title: 'Not just where to go. How you want to travel.',
    copy: 'SADHYAATRA brings the different parts of travel into one experience — helping you discover destinations, build practical itineraries, explore stays and transport, find activities and local experiences, and shape the journey around your own preferences.',
    accent: '#71815c',
    surface: '#c6cab2',
    eyebrow: 'BUILT AROUND YOU',
    footer: 'How we want to make a difference.',
  },
];

/* -------------------------------------------------------------------------- */
/* SHARED VISUAL COMPONENTS                                                   */
/* -------------------------------------------------------------------------- */

const FloatingTab = ({
  label,
  icon,
  className = '',
  delay = 0,
}: {
  label: string;
  icon: string;
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, delay }}
      animate={{
        y: [0, -5, 0],
      }}
      className={`absolute flex items-center gap-2 rounded-full border border-[#2b2728]/10 bg-[#f8f6f1]/90 px-3 py-2 shadow-[0_10px_30px_rgba(43,39,40,0.08)] backdrop-blur-md ${className}`}
    >
      <span className="text-[11px]">{icon}</span>
      <span className="font-mono-code text-[9px] tracking-[0.08em] text-[#2b2728]/70">
        {label}
      </span>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/* CARD 01 — SCATTERED TRAVEL TABS                                           */
/* -------------------------------------------------------------------------- */

const FrictionVisual = ({ progress }: { progress: any }) => {
  const x1 = useTransform(progress, [0, 1], [35, 0]);
  const x2 = useTransform(progress, [0, 1], [-20, 0]);
  const y1 = useTransform(progress, [0, 1], [20, 0]);
  const y2 = useTransform(progress, [0, 1], [-15, 0]);

  return (
    <div className="relative h-[320px] w-full sm:h-[370px]">
      {/* subtle route lines */}
      <svg
        viewBox="0 0 500 360"
        className="absolute inset-0 h-full w-full opacity-30"
        fill="none"
      >
        <motion.path
          d="M60 270 C130 170 155 260 230 190 C290 135 310 220 365 130 C400 75 430 105 455 55"
          stroke="#526a45"
          strokeWidth="1"
          strokeDasharray="4 8"
          style={{
            pathLength: useTransform(progress, [0, 1], [0.35, 1]),
          }}
        />
      </svg>

      <motion.div style={{ x: x1, y: y1 }}>
        <FloatingTab
          label="DESTINATIONS"
          icon="⌖"
          className="left-[8%] top-[8%]"
        />
      </motion.div>

      <motion.div style={{ x: x2, y: y2 }}>
        <FloatingTab
          label="STAYS"
          icon="⌂"
          className="right-[12%] top-[18%]"
          delay={0.1}
        />
      </motion.div>

      <FloatingTab
        label="TRANSPORT"
        icon="→"
        className="left-[24%] top-[39%]"
        delay={0.2}
      />

      <FloatingTab
        label="RESTAURANTS"
        icon="✦"
        className="right-[26%] top-[42%]"
        delay={0.3}
      />

      <FloatingTab
        label="ACTIVITIES"
        icon="○"
        className="left-[5%] bottom-[18%]"
        delay={0.4}
      />

      <FloatingTab
        label="REVIEWS"
        icon="☆"
        className="right-[8%] bottom-[10%]"
        delay={0.5}
      />

      {/* editorial note */}
      <motion.div
        style={{
          opacity: useTransform(progress, [0.2, 0.7], [0.5, 1]),
          rotate: useTransform(progress, [0, 1], [-3, 0]),
        }}
        className="absolute bottom-4 left-1/2 max-w-[130px] -translate-x-1/2 text-center"
      >
        <p className="font-fraunces text-sm italic leading-tight text-[#526a45]">
          So many tabs
          <br />
          for one journey?
        </p>
      </motion.div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CARD 02 — CONNECTED JOURNEY                                               */
/* -------------------------------------------------------------------------- */

const IdeaVisual = ({ progress, accent }: { progress: any; accent: string }) => {
  const scale = useTransform(progress, [0, 1], [0.85, 1]);

  return (
    <div className="relative flex h-[320px] w-full items-center justify-center sm:h-[370px]">
      {/* connecting lines */}
      <svg
        viewBox="0 0 500 360"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {[
          'M250 180 C190 180 150 105 75 105',
          'M250 180 C190 180 150 180 65 180',
          'M250 180 C190 180 150 255 75 255',
          'M250 180 C310 180 350 105 425 105',
          'M250 180 C310 180 350 180 435 180',
          'M250 180 C310 180 350 255 425 255',
        ].map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="4 6"
            style={{
              pathLength: useTransform(progress, [0, 0.8], [0, 1]),
            }}
          />
        ))}
      </svg>

      {/* central identity */}
      <motion.div
        style={{ scale }}
        className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#f8f6f1]/70 bg-[#71815c] text-center shadow-[0_20px_50px_rgba(43,39,40,0.14)] sm:h-32 sm:w-32"
      >
        <span className="font-fraunces text-sm italic text-[#f8f6f1]">
          SADHYAATRA
        </span>
        <span className="mt-1 font-mono-code text-[7px] tracking-[0.14em] text-[#f8f6f1]/70">
          YOUR JOURNEY, CONNECTED
        </span>
      </motion.div>

      {[
        ['DESTINATIONS', '⌖', 'left-[4%] top-[16%]'],
        ['STAYS', '⌂', 'left-[7%] bottom-[18%]'],
        ['TRANSPORT', '→', 'left-[20%] top-[43%]'],
        ['EXPERIENCES', '✦', 'right-[2%] top-[16%]'],
        ['FOOD', '◇', 'right-[7%] bottom-[18%]'],
        ['ITINERARIES', '□', 'right-[18%] top-[43%]'],
      ].map(([label, icon, position], index) => (
        <FloatingTab
          key={label}
          label={label}
          icon={icon}
          className={position}
          delay={index * 0.08}
        />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CARD 03 — CONTOUR MAP                                                     */
/* -------------------------------------------------------------------------- */

const VisionVisual = ({ progress, accent }: { progress: any; accent: string }) => {
  const pathProgress = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="relative h-[320px] w-full overflow-hidden sm:h-[370px]">
      {/* contour lines */}
      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 h-full w-full opacity-50"
        fill="none"
      >
        {[
          'M-20 100 C100 20 180 180 300 90 C400 15 470 120 620 40',
          'M-20 130 C100 50 180 210 300 120 C400 45 470 150 620 70',
          'M-20 160 C100 80 180 240 300 150 C400 75 470 180 620 100',
          'M-20 190 C100 110 180 270 300 180 C400 105 470 210 620 130',
          'M-20 220 C100 140 180 300 300 210 C400 135 470 240 620 160',
          'M-20 250 C100 170 180 330 300 240 C400 165 470 270 620 190',
          'M-20 280 C100 200 180 360 300 270 C400 195 470 300 620 220',
          'M-20 310 C100 230 180 390 300 300 C400 225 470 330 620 250',
        ].map((path, index) => (
          <motion.path
            key={index}
            d={path}
            stroke={accent}
            strokeWidth="0.8"
            strokeOpacity="0.22"
            style={{
              pathLength: pathProgress,
            }}
          />
        ))}

        {/* main route */}
        <motion.path
          d="M55 285 C130 235 145 155 220 195 C285 230 305 95 370 130 C430 165 470 90 545 65"
          stroke={accent}
          strokeWidth="2"
          strokeDasharray="5 7"
          style={{
            pathLength: pathProgress,
          }}
        />
      </svg>

      {/* route markers */}
      {[
        ['DISCOVER', 'PLACES THAT\nRESONATE', 'left-[13%] top-[54%]'],
        ['UNDERSTAND', 'WHAT YOU NEED', 'left-[46%] top-[31%]'],
        ['CURATE', 'TAILORED\nPOSSIBILITIES', 'right-[22%] top-[28%]'],
        ['JOURNEY', 'YOUR WAY', 'right-[5%] top-[12%]'],
      ].map(([title, subtitle, position], index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: index * 0.12 }}
          className={`absolute ${position}`}
        >
          <div
            className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#f8f6f1]"
            style={{ backgroundColor: accent }}
          >
            <div className="h-1 w-1 rounded-full bg-[#f8f6f1]" />
          </div>

          <div className="mt-2 whitespace-pre-line">
            <p className="font-mono-code text-[8px] tracking-[0.12em] text-[#2b2728]/70">
              {title}
            </p>
            <p className="mt-1 font-mono-code text-[7px] leading-relaxed text-[#2b2728]/45">
              {subtitle}
            </p>
          </div>
        </motion.div>
      ))}

      <div className="absolute bottom-4 left-4 font-mono-code text-[8px] tracking-[0.12em] text-[#2b2728]/35">
        28.6139° N
        <br />
        77.2090° E
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* CARD 04 — FINAL JOURNEY                                                   */
/* -------------------------------------------------------------------------- */

const MissionVisual = ({ progress, accent }: { progress: any; accent: string }) => {
  const pathProgress = useSpring(
    useTransform(progress, [0, 1], [0, 1]),
    { stiffness: 80, damping: 25 }
  );

  return (
    <div className="relative h-[320px] w-full overflow-hidden sm:h-[370px]">
      {/* soft mountain silhouette */}
      <svg
        viewBox="0 0 600 320"
        className="absolute bottom-0 left-0 w-full opacity-20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 290 L80 220 L145 270 L230 145 L310 235 L390 120 L470 220 L530 165 L600 245 L600 320 L0 320 Z"
          fill={accent}
        />
      </svg>

      {/* journey route */}
      <svg
        viewBox="0 0 600 320"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <motion.path
          d="M55 260 C120 235 125 155 205 185 C280 215 300 90 375 125 C450 160 460 65 545 45"
          stroke="#f8f6f1"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: pathProgress }}
        />

        <motion.path
          d="M55 260 C120 235 125 155 205 185 C280 215 300 90 375 125 C450 160 460 65 545 45"
          stroke={accent}
          strokeWidth="1"
          strokeDasharray="3 8"
          style={{ pathLength: pathProgress }}
        />
      </svg>

      {/* route points */}
      {[
        ['YOU', 'Your pace', 'left-[7%] bottom-[14%]'],
        ['DESTINATION', 'Your places', 'left-[31%] top-[45%]'],
        ['EXPERIENCE', 'Your moments', 'left-[57%] top-[28%]'],
        ['JOURNEY', 'Your way', 'right-[5%] top-[8%]'],
      ].map(([title, subtitle, position], index) => (
        <motion.div
          key={title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: index * 0.15, duration: 0.7 }}
          className={`absolute ${position}`}
        >
          <div
            className="h-4 w-4 rounded-full border-2 border-[#f8f6f1]"
            style={{ backgroundColor: accent }}
          />

          <div className="mt-2">
            <p className="font-mono-code text-[8px] tracking-[0.14em] text-[#2b2728]/75">
              {title}
            </p>
            <p className="mt-1 font-fraunces text-xs italic text-[#2b2728]/55">
              {subtitle}
            </p>
          </div>
        </motion.div>
      ))}

      <motion.p
        style={{
          opacity: useTransform(progress, [0.3, 0.8], [0, 1]),
          y: useTransform(progress, [0.3, 0.8], [15, 0]),
        }}
        className="absolute bottom-5 right-5 max-w-[130px] text-right font-fraunces text-sm italic leading-tight text-[#526a45]"
      >
        Travel on
        <br />
        your own terms.
      </motion.p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* VISUAL SWITCHER                                                            */
/* -------------------------------------------------------------------------- */

const JourneyVisual = ({
  index,
  progress,
  accent,
}: {
  index: number;
  progress: any;
  accent: string;
}) => {
  return (
    <div className="relative w-full">
      {index === 0 && <FrictionVisual progress={progress} />}
      {index === 1 && (
        <IdeaVisual progress={progress} accent={accent} />
      )}
      {index === 2 && (
        <VisionVisual progress={progress} accent={accent} />
      )}
      {index === 3 && (
        <MissionVisual progress={progress} accent={accent} />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* STORY CARD                                                                 */
/* -------------------------------------------------------------------------- */

const StoryCard: React.FC<{
  card: (typeof STORY_CARDS)[number];
  index: number;
  onActiveChange: (index: number) => void;
}> = ({ card, index, onActiveChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
  const element = cardRef.current;
  if (!element) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        onActiveChange(index);
      }
    },
    {
      /*
       * The middle/upper part of the viewport is our
       * "active card" detection zone.
       */
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0,
    }
  );

  observer.observe(element);

  return () => observer.disconnect();
}, [index, onActiveChange]);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 85%', 'start 15%'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 0.985]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [45, 0, -8]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -1.2 : 1.2, 0, index % 2 === 0 ? 0.15 : -0.15]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.3],
    [0.5, 1]
  );

  return (
    <div
      ref={cardRef}
      className="sticky top-20 sm:top-24"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        style={{
          scale,
          y,
          rotate,
          backgroundColor: card.surface,
        }}
        className="relative min-h-[70vh] overflow-hidden rounded-[2rem] border border-[#2b2728]/10 px-5 py-7 shadow-[0_24px_70px_rgba(43,39,40,0.10)] sm:min-h-[68vh] sm:px-10 sm:py-10 lg:px-14 lg:py-12"
      >
        {/* ambient gradient */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 80% 45%, ${card.accent}25, transparent 34%)`,
          }}
        />

        {/* subtle grain-like grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(#2b2728 1px, transparent 1px), linear-gradient(90deg, #2b2728 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 flex min-h-[calc(70vh-3.5rem)] flex-col sm:min-h-[calc(68vh-5rem)]">
          {/* HEADER */}
          <div className="flex items-start justify-between gap-5 border-b border-[#2b2728]/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-[10px] tracking-[0.2em] text-[#2b2728]/55 sm:text-xs">
                {card.number} — {card.label}
              </span>

              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: card.accent }}
              />
            </div>

            <span className="hidden font-mono-code text-[8px] tracking-[0.18em] text-[#2b2728]/40 sm:block">
              {card.eyebrow}
            </span>
          </div>

          {/* MAIN CONTENT */}
          <div className="grid flex-1 items-center gap-8 py-8 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:py-5">
            {/* TEXT */}
            <motion.div
              style={{ opacity: contentOpacity }}
              className="relative z-20 max-w-2xl"
            >
              <h3 className="font-fraunces text-[2.6rem] font-normal leading-[1.02] tracking-[-0.025em] text-[#2b2728] sm:text-5xl lg:text-[4.25rem] xl:text-[4.65rem]">
                {index === 0 ? (
                  <>
                    Why does{' '}
                    <em
                      className="font-fraunces"
                      style={{ color: card.accent }}
                    >
                      planning
                    </em>{' '}
                    a journey feel harder than taking one?
                  </>
                ) : index === 1 ? (
                  <>
                    What if the journey was planned around{' '}
                    <em
                      className="font-fraunces"
                      style={{ color: card.accent }}
                    >
                      you?
                    </em>
                  </>
                ) : index === 2 ? (
                  <>
                    Make the journey easier to{' '}
                    <em
                      className="font-fraunces"
                      style={{ color: card.accent }}
                    >
                      imagine,
                    </em>{' '}
                    experience, and plan.
                  </>
                ) : (
                  <>
                    Not just where to go.{' '}
                    <em
                      className="font-fraunces"
                      style={{ color: card.accent }}
                    >
                      How you want to travel.
                    </em>
                  </>
                )}
              </h3>

              <p className="mt-6 max-w-xl text-[15px] font-light leading-[1.75] text-[#4a4542] sm:text-base lg:text-[17px]">
                {card.copy}
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span
                  className="font-mono-code text-[9px] tracking-[0.16em]"
                  style={{ color: card.accent }}
                >
                  {card.footer.toUpperCase()}
                </span>

                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ color: card.accent }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>

            {/* VISUAL */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <JourneyVisual
                index={index}
                progress={scrollYProgress}
                accent={card.accent}
              />
            </motion.div>
          </div>

          {/* FOOTER */}
          <div className="flex items-end justify-between gap-6 border-t border-[#2b2728]/15 pt-4">
            <span className="font-fraunces text-xs italic text-[#4a4542]/65 sm:text-sm">
              SADHYAATRA — journeys with intention
            </span>

            <div className="flex items-center gap-3">
              <span className="hidden font-mono-code text-[8px] tracking-[0.14em] text-[#2b2728]/35 sm:block">
                SCROLL TO CONTINUE
              </span>

              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-xs"
                style={{ color: card.accent }}
              >
                ↓
              </motion.span>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SECTION                                                                    */
/* -------------------------------------------------------------------------- */

export const TripIntentCard: React.FC<TripIntentCardProps> = ({
  onSelectOption,
}) => {
  void onSelectOption;
  const [activeIndex, setActiveIndex] = useState(0);

const handleActiveChange = (index: number) => {
  setActiveIndex(index);
};

  return (
    <section
      id="trip-intent-section"
      className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* SECTION INTRO */}
      <header className="mx-auto mb-16 max-w-4xl text-center sm:mb-24">
        <p className="mb-5 font-mono-code text-[10px] uppercase tracking-[0.24em] text-[#8c956a]">
          The idea behind SADHYAATRA
        </p>

        <h2 className="font-fraunces text-4xl font-normal leading-[1.05] tracking-[-0.025em] text-[#2b2728] sm:text-6xl lg:text-7xl">
          The journey begins before
          <br className="hidden sm:block" /> the journey.
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-[#4a4542] sm:text-lg">
          We started SADHYAATRA with a simple belief: the journey should be
          shaped around the traveller, not around a collection of disconnected
          platforms.
        </p>
      </header>

      {/* STORY STACK */}
      <div className="relative">
        {/* ---------------------------------------------------------------------- */}
{/* JOURNEY PROGRESS RAIL                                                  */}
{/* ---------------------------------------------------------------------- */}

<div className="pointer-events-none absolute -right-16 inset-y-0 hidden xl:block">
  <div className="sticky top-1/2 -translate-y-1/2">
    <div className="relative flex flex-col items-center">
      
      {/* vertical track */}
      <div className="absolute top-4 bottom-4 left-1/2 w-px -translate-x-1/2 bg-[#2b2728]/10" />

      {/* animated progress line */}
      <motion.div
        className="absolute left-1/2 top-4 w-[2px] -translate-x-1/2 origin-top"
        animate={{
          height: `${(activeIndex / (STORY_CARDS.length - 1)) * 100}%`,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          backgroundColor: STORY_CARDS[activeIndex].accent,
        }}
      />

      {STORY_CARDS.map((card, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={card.number}
            className="relative z-10 flex h-20 w-16 items-center justify-center"
            animate={{
              scale: isActive ? 1.08 : 1,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* active breathing ring */}
            {isActive && (
              <motion.span
                className="absolute h-8 w-8 rounded-full"
                style={{
                  border: `1px solid ${card.accent}`,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.55,
                }}
                animate={{
                  opacity: [0.7, 0, 0.7],
                  scale: [0.75, 1.45, 0.75],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}

            {/* dot */}
            <motion.span
              className="relative z-10 rounded-full"
              animate={{
                width: isActive ? 10 : 5,
                height: isActive ? 10 : 5,
                backgroundColor: isActive
                  ? card.accent
                  : '#2b2728',
                opacity: isActive ? 1 : 0.18,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            />

            {/* number */}
            <motion.span
              className="absolute left-full ml-3 font-mono-code text-[10px] tracking-[0.18em]"
              animate={{
                color: isActive ? card.accent : '#2b2728',
                opacity: isActive ? 1 : 0.28,
                x: isActive ? 2 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              {card.number}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  </div>
</div>

        {STORY_CARDS.map((card, index) => (
  <StoryCard
    key={card.number}
    card={card}
    index={index}
    onActiveChange={handleActiveChange}
  />
))}
        </div>
    </section>
  );
};