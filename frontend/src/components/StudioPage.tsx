import React, { useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, ChevronDown, Compass, ExternalLink, Plus } from 'lucide-react';
import { CAREER_ROLES, FEATURES, FOUNDERS, FUTURE_PROSPECTS, STUDIO_CONTENT } from '../data/studioContent';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.25 }, transition: { duration: 0.8 } };

const RouteLines = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="none" aria-hidden="true">
    <motion.path d="M-40 580C170 560 130 300 370 340S530 630 700 500 860 110 1250 220" stroke="#8c956a" strokeWidth="1" strokeDasharray="3 12" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.65 }} transition={{ duration: 3, ease: 'easeInOut' }} />
    <motion.path d="M-40 260C180 160 250 520 470 420S690 180 900 300 1060 650 1250 560" stroke="#2b2728" strokeWidth="0.8" strokeDasharray="1 16" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }} transition={{ duration: 4, delay: 0.4, ease: 'easeInOut' }} />
    <path d="M80 0V800M340 0V800M920 0V800" stroke="#2b2728" strokeOpacity="0.06" strokeWidth="1" />
  </svg>
);

const StudioNav = () => (
  <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#2b2728]/10 bg-[#f8f6f1]/85 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
      <a href="/" className="flex items-center gap-3 text-[#2b2728]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2b2728]/15 bg-white text-[#8c956a]"><Compass className="h-4 w-4" /></span>
        <span className="font-mono-code text-[11px] tracking-[0.2em]">SADHYAATRA</span>
      </a>
      <div className="flex items-center gap-5 text-[10px] font-mono-code uppercase tracking-[0.16em] text-[#4a4542]">
        <span className="hidden text-[#8c956a] sm:inline">The Studio</span>
        <a href="/" className="transition-colors hover:text-[#8c956a]">Return to journeys <ArrowUpRight className="ml-1 inline h-3 w-3" /></a>
      </div>
    </div>
  </header>
);

const GapSection = () => {
  const [active, setActive] = useState<'traveller' | 'agency' | null>(null);
  const sides = [
    { key: 'traveller' as const, label: 'TRAVELLER', title: 'Finding the right journey should feel personal.', items: ['[Traveller problem 01]', '[Traveller problem 02]', '[Traveller problem 03]'] },
    { key: 'agency' as const, label: 'AGENCY', title: 'Great experiences need better ways to reach the right traveller.', items: ['[Agency problem 01]', '[Agency problem 02]', '[Agency problem 03]'] },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
      <motion.div {...reveal} className="mb-12 max-w-xl">
        <p className="eyebrow">{STUDIO_CONTENT.gap.eyebrow}</p>
        <p className="mt-5 text-lg font-normal leading-relaxed text-[#2b2728]">{STUDIO_CONTENT.gap.subheading}</p>
      </motion.div>
      <div className="relative flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 lg:grid lg:grid-cols-2 lg:items-stretch lg:overflow-visible lg:pb-0">
        {sides.map((side) => (
          <motion.article
            key={side.key}
            onMouseEnter={() => setActive(side.key)}
            onMouseLeave={() => setActive(null)}
            animate={{ flex: active === side.key ? 1.08 : active ? 0.92 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative min-w-[85vw] snap-center sm:min-w-0 min-h-[420px] overflow-hidden border border-[#2b2728]/15 bg-white/35 p-7 transition-colors hover:bg-[#ded7cb]/45 sm:p-10"
          >
            <div className="flex items-center justify-between border-b border-[#2b2728]/12 pb-5">
              <span className="font-mono-code text-[10px] tracking-[0.2em] text-[#8c956a]">{side.label}</span>
              <span className="h-2 w-2 rounded-full bg-[#8c956a] transition-transform group-hover:scale-150" />
            </div>
            <h3 className="mt-16 max-w-sm font-fraunces text-4xl leading-[1.05] text-[#2b2728] sm:text-5xl">{side.title}</h3>
            <ul className="mt-12 space-y-3 border-t border-[#2b2728]/12 pt-5 text-base font-normal text-[#2b2728]">
              {side.items.map((item) => <li key={item} className="flex gap-3"><span className="text-[#8c956a]">/</span>{item}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

const BuildingSection = () => {
  const [active, setActive] = useState(0);
  const stage = STUDIO_CONTENT.building.stages[active];
  return (
    <section className="border-y border-[#2b2728]/10 bg-[#ded7cb]/35 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div {...reveal} className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="eyebrow">{STUDIO_CONTENT.building.eyebrow}</p><h2 className="mt-4 max-w-2xl font-fraunces text-4xl text-[#2b2728] sm:text-6xl">A journey in four movements.</h2></div>
          <span className="hidden lg:block font-mono-code text-[10px] tracking-[0.16em] text-[#4a4542]/60">SELECT A STAGE</span>
          <span className="block lg:hidden font-mono-code text-[10px] tracking-[0.16em] text-[#4a4542]/60">SWIPE TO EXPLORE</span>
        </motion.div>
        
        {/* Desktop Layout */}
        <div className="hidden lg:grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-2">
            {STUDIO_CONTENT.building.stages.map((item, index) => (
              <button key={item.number} onClick={() => setActive(index)} className={`w-full border-b px-3 py-4 text-left transition-all ${active === index ? 'border-[#8c956a] bg-[#f8f6f1]/55 text-[#2b2728]' : 'border-[#2b2728]/12 text-[#4a4542] hover:text-[#2b2728]'}`}>
                <span className="font-mono-code text-[10px] text-[#8c956a]">{item.number}</span><span className="ml-5 font-fraunces text-2xl">{item.title}</span>
              </button>
            ))}
          </div>
          <motion.article key={stage.number} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} className="min-h-[340px] border-l border-[#2b2728]/15 pl-12">
            <span className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#8c956a]">{stage.tag}</span>
            <h3 className="mt-12 max-w-xl font-fraunces text-5xl text-[#2b2728] sm:text-7xl">{stage.title}</h3>
            <p className="mt-6 max-w-md text-xl font-normal leading-relaxed text-[#2b2728]">{stage.short}</p>
            <p className="mt-8 max-w-lg border-t border-[#2b2728]/12 pt-5 text-base font-normal leading-relaxed text-[#2b2728]">{stage.long}</p>
          </motion.article>
        </div>

        {/* Mobile Auto-Scrolling Cards Layout */}
        <div className="block lg:hidden overflow-hidden mt-10 w-full relative -mx-5 px-5 sm:-mx-8 sm:px-8 max-w-[100vw]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="flex gap-5 w-max pb-8"
          >
            {[...STUDIO_CONTENT.building.stages, ...STUDIO_CONTENT.building.stages].map((item, idx) => (
              <article key={`${item.number}-${idx}`} className="w-[85vw] sm:w-[350px] shrink-0 bg-[#f8f6f1]/60 border border-[#2b2728]/10 p-7 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono-code text-[10px] text-[#8c956a]">{item.number}</span>
                  <span className="font-mono-code text-[9px] uppercase tracking-[0.18em] text-[#4a4542]">{item.tag}</span>
                </div>
                <h3 className="font-fraunces text-3xl sm:text-4xl text-[#2b2728] mb-4">{item.title}</h3>
                <p className="text-base sm:text-lg font-normal leading-relaxed text-[#2b2728] mb-6">{item.short}</p>
                <p className="border-t border-[#2b2728]/12 pt-5 mt-auto text-sm sm:text-base font-normal leading-relaxed text-[#4a4542]">{item.long}</p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureConstellation = () => {
  const [active, setActive] = useState(0);
  const feature = FEATURES[active];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
      <motion.div {...reveal} className="mb-16 max-w-2xl"><p className="eyebrow">THE PRODUCT</p><h2 className="mt-4 font-fraunces text-4xl text-[#2b2728] sm:text-6xl">A constellation of better ways to travel.</h2></motion.div>
      {/* Desktop Graph Layout */}
      <div className="hidden lg:block">
        <div className="w-full overflow-hidden border-y border-[#2b2728]/10 py-16 flex justify-center items-center h-[660px]">
          <div className="relative w-full max-w-7xl mx-auto h-[660px] flex items-center justify-center">
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true"><circle cx="500" cy="300" r="145" stroke="#2b2728" strokeOpacity=".1" strokeDasharray="2 9" fill="none" /><circle cx="500" cy="300" r="240" stroke="#8c956a" strokeOpacity=".16" strokeDasharray="1 14" fill="none" />{FEATURES.map((_, i) => <line key={i} x1="500" y1="300" x2={170 + (i % 3) * 330} y2={120 + Math.floor(i / 3) * 360} stroke={active === i ? '#8c956a' : '#2b2728'} strokeOpacity={active === i ? '.75' : '.1'} strokeWidth={active === i ? '2' : '1'} />)}</svg>
            <motion.div layout className="relative z-10 flex h-36 w-36 shrink-0 items-center justify-center rounded-full border border-[#8c956a]/50 bg-[#f8f6f1] text-center shadow-[0_12px_40px_rgba(43,39,40,0.08)]"><span className="font-mono-code text-[10px] tracking-[0.18em]">SADHYAATRA</span></motion.div>
            <div className="absolute inset-0">
              {FEATURES.map((item, index) => {
                const positions = ['left-[4%] top-[10%]', 'left-1/2 -translate-x-1/2 top-[2%]', 'right-[4%] top-[10%]', 'left-[4%] bottom-[8%]', 'left-1/2 -translate-x-1/2 bottom-[2%]', 'right-[4%] bottom-[8%]'];
                return <button key={item.name} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} className={`absolute ${positions[index]} z-20 w-[260px] border p-4 text-left transition-all duration-500 ${active === index ? 'border-[#8c956a] bg-[#f8f6f1] shadow-lg' : 'border-[#2b2728]/12 bg-[#f8f6f1]/65 hover:border-[#8c956a]/60'}`}><span className="font-mono-code text-[9px] text-[#8c956a]">{item.status}</span><span className="mt-2 block font-fraunces text-xl leading-none text-[#2b2728]">{item.name}</span></button>;
              })}
            </div>
          </div>
        </div>
        <motion.div key={feature.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mt-10 max-w-2xl text-center"><p className="font-mono-code text-[10px] uppercase tracking-[0.18em] text-[#8c956a]">{feature.date}</p><p className="mt-4 text-lg font-normal leading-relaxed text-[#2b2728]">{feature.description}</p><span className="mt-5 inline-flex items-center gap-2 text-xs text-[#2b2728]">{feature.cta} <ArrowUpRight className="h-3.5 w-3.5" /></span></motion.div>
      </div>

      {/* Mobile Vertical Timeline Layout */}
      <div className="block lg:hidden relative border-t border-[#2b2728]/10 pt-16 mt-8">
        <div className="absolute left-9 sm:left-12 top-16 bottom-0 w-px bg-[#8c956a]/30" />
        <div className="space-y-16 pl-16 sm:pl-20 pr-4">
          {FEATURES.map((item) => (
             <div key={item.name} className="relative">
                <div className="absolute -left-[33px] sm:-left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8c956a] ring-4 ring-[#f8f6f1]" />
                <span className="font-mono-code text-[10px] text-[#8c956a] tracking-widest">{item.status}</span>
                <h3 className="mt-2 font-fraunces text-3xl sm:text-4xl text-[#2b2728] leading-[1.1]">{item.name}</h3>
                <p className="mt-4 text-base sm:text-lg text-[#4a4542] leading-relaxed">{item.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-mono-code text-[9px] uppercase tracking-[0.18em] text-[#8c956a]">{item.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2b2728]">{item.cta} <ArrowUpRight className="h-3.5 w-3.5 text-[#8c956a]" /></span>
                </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FoundersSection = () => (
  <section className="border-y border-[#2b2728]/10 bg-[#f8f6f1] py-24 sm:py-36">
    <div className="mx-auto max-w-7xl px-5 sm:px-8"><motion.div {...reveal} className="mb-16"><p className="eyebrow">THE PEOPLE</p><h2 className="mt-4 max-w-2xl font-fraunces text-4xl text-[#2b2728] sm:text-6xl">The people building sadhyaatra.</h2></motion.div><div className="grid gap-10 md:grid-cols-2 md:items-start">{FOUNDERS.map((founder, index) => <motion.article key={`${founder.name}-${index}`} {...reveal} transition={{ delay: index * 0.12, duration: 0.8 }} className={`${index === 1 ? 'md:mt-16' : ''}`}><div className="overflow-hidden border border-[#2b2728]/12 bg-[#ded7cb]/45"><div className="p-8 sm:p-12"><p className="font-mono-code text-[10px] uppercase tracking-[0.16em] text-[#8c956a]">{founder.role}</p><h3 className="mt-4 font-fraunces text-4xl text-[#2b2728]">{founder.name}</h3>{founder.bio && <p className="mt-6 text-base font-normal leading-relaxed text-[#2b2728]">{founder.bio}</p>}{founder.philosophy && <p className="mt-8 border-t border-[#2b2728]/12 pt-6 font-fraunces text-lg italic text-[#2b2728]">{founder.philosophy}</p>}<a href={founder.link} className="mt-8 inline-flex text-xs font-mono-code tracking-[0.1em] text-[#8c956a] uppercase">Connect <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></a></div></div></motion.article>)}</div></div>
  </section>
);

const FutureProspectsSection = () => (
  <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-36"><motion.div {...reveal} className="mb-14 max-w-2xl"><p className="eyebrow">THE JOURNEY AHEAD</p><h2 className="mt-4 font-fraunces text-4xl text-[#2b2728] sm:text-6xl">Future prospects / coming soon</h2><p className="mt-5 text-xl font-normal text-[#2b2728]">The journey doesn't end with planning.</p></motion.div><div className="relative ml-3 border-l border-[#8c956a]/45">{FUTURE_PROSPECTS.map((item, index) => <motion.article key={`${item.name}-${index}`} {...reveal} className="relative pb-14 pl-8 last:pb-0 sm:grid sm:grid-cols-[150px_1fr] sm:gap-8"><span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[#8c956a] ring-4 ring-[#f8f6f1]" /><span className="font-mono-code text-[10px] tracking-[0.18em] text-[#8c956a]">0{index + 1}</span><div><h3 className="font-fraunces text-3xl text-[#2b2728]">{item.name}</h3><span className="mt-2 block font-mono-code text-[10px] tracking-[0.1em] text-[#8c956a] uppercase">{item.tag}</span><p className="mt-4 max-w-3xl text-lg font-normal leading-relaxed text-[#2b2728]">{item.description}</p></div></motion.article>)}</div></section>
);

const CareersSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  return <section className="border-y border-[#2b2728]/10 bg-[#ded7cb]/35 py-24 sm:py-36"><div className="mx-auto max-w-7xl px-5 sm:px-8"><motion.div {...reveal} className="max-w-3xl"><p className="eyebrow">{STUDIO_CONTENT.careers.eyebrow}</p><h2 className="mt-4 font-fraunces text-5xl text-[#2b2728] sm:text-7xl">{STUDIO_CONTENT.careers.title}</h2><p className="mt-6 max-w-xl text-lg font-normal leading-relaxed text-[#2b2728]">{STUDIO_CONTENT.careers.intro}</p></motion.div><div className="mt-14 flex flex-wrap gap-x-6 gap-y-3 border-y border-[#2b2728]/12 py-5 font-mono-code text-[10px] tracking-[0.16em] text-[#8c956a]">{['DESIGN', 'ENGINEERING', 'TRAVEL', 'PRODUCT', 'STORYTELLING', 'CURATION', 'OPERATIONS'].map((item) => <span key={item}>{item}</span>)}</div><div className="mt-10">{CAREER_ROLES.length === 0 ? <p className="text-lg font-normal text-[#2b2728]">No careers available at the moment. Please check back later.</p> : CAREER_ROLES.map((role, index) => <div key={`${role.title}-${index}`} className="border-b border-[#2b2728]/15"><button onClick={() => setOpen(open === index ? null : index)} className="flex w-full items-center justify-between py-6 text-left"><span className="font-fraunces text-2xl text-[#2b2728] sm:text-4xl">{role.title} <ArrowUpRight className="ml-2 inline h-5 w-5 text-[#8c956a]" /></span><ChevronDown className={`h-5 w-5 text-[#8c956a] transition-transform ${open === index ? 'rotate-180' : ''}`} /></button>{open === index && <div className="grid gap-5 pb-7 text-base font-normal leading-relaxed text-[#2b2728] sm:grid-cols-3"><span>{role.location} / {role.type}</span><span>{role.description}</span><span>{role.requirements} <a href={role.link} className="mt-2 block text-[#8c956a]">Apply <ArrowUpRight className="inline h-3.5 w-3.5" /></a></span></div>}</div>)}</div></div></section>;
};

export const StudioPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroY = useTransform(scrollYProgress, [0, 0.25], ['0%', '18%']);
  return <div className="min-h-screen overflow-hidden bg-[#f8f6f1] text-[#2b2728] font-jost"><StudioNav /><main><section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-[#2b2728]/10 px-5 pb-24 pt-32 sm:px-8"><RouteLines /><motion.div style={{ y: heroY }} className="relative z-10 mx-auto w-full max-w-7xl"><motion.p {...reveal} className="eyebrow">{STUDIO_CONTENT.hero.eyebrow}</motion.p><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }} className="mt-8 max-w-5xl font-fraunces text-5xl leading-[0.95] break-words text-[#2b2728] sm:text-7xl lg:text-[9rem]">{STUDIO_CONTENT.hero.title}</motion.h1><motion.p {...reveal} transition={{ delay: 0.35, duration: 0.8 }} className="mt-10 max-w-md text-xl font-normal leading-relaxed text-[#2b2728]">{STUDIO_CONTENT.hero.intro}</motion.p><div className="absolute bottom-0 right-0 flex items-center gap-3 font-mono-code text-[10px] tracking-[0.18em] text-[#4a4542]/70"><span>{STUDIO_CONTENT.hero.scrollLabel}</span><ArrowDown className="h-4 w-4 text-[#8c956a]" /></div></motion.div></section><GapSection /><BuildingSection /><FeatureConstellation /><FoundersSection /><FutureProspectsSection /><CareersSection /><section className="px-5 py-32 sm:px-8 sm:py-52"><motion.div {...reveal} className="mx-auto max-w-5xl text-center"><h2 className="font-fraunces text-5xl leading-[0.98] break-words text-[#2b2728] sm:text-8xl">{STUDIO_CONTENT.final.statement}</h2><div className="mt-12 flex flex-wrap justify-center gap-8 font-mono-code text-[10px] uppercase tracking-[0.18em]"><a href="/" className="text-[#8c956a] hover:text-[#2b2728]">Explore SADHYAATRA <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></a><a href="#careers" className="text-[#4a4542] hover:text-[#2b2728]">Work with us <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></a></div></motion.div></section></main><motion.div style={{ scaleX: progress }} className="fixed bottom-0 left-0 right-0 z-[60] h-1 origin-left bg-[#8c956a]" /></div>;
};
