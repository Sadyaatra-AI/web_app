import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, RotateCcw, Compass, MapPin, Heart } from 'lucide-react';
import { Destination } from '../types';

interface MatchQuizModalProps {
  destinations: Destination[];
  onSelectDestination: (destination: Destination) => void;
  onClose?: () => void;
}

const MOOD_OPTIONS = [
  { id: 'Slow & Peaceful', label: 'Slow & Peaceful', icon: '🍃', desc: 'Unhurried mornings, quiet shores, and calm atmosphere.' },
  { id: 'Spiritual', label: 'Spiritual & Introspective', icon: '🪷', desc: 'Temple bells, river aartis, meditation, and ashram sanctuaries.' },
  { id: 'Adventurous', label: 'Wild & Adventurous', icon: '⛰️', desc: 'High alpine passes, white water rapids, and rugged nature.' },
  { id: 'Romantic', label: 'Romantic & Timeless', icon: '✨', desc: 'Lakeside palaces, rooftop candlelight, and poetic sunsets.' },
  { id: 'Cultural', label: 'Heritage & Ancient Ruins', icon: '🏛️', desc: 'Centuries of architecture, craft workshops, and folklore.' },
  { id: 'Wellness', label: 'Yoga & Holistic Wellness', icon: '🧘', desc: 'Ayurvedic meals, restorative routines, and mountain air.' },
];

const DURATION_OPTIONS = [
  { id: 'weekend', label: 'Weekend Respite (2–3 days)', minDays: 2, maxDays: 3 },
  { id: 'mid', label: 'Sweet Spot (3–4 days)', minDays: 3, maxDays: 4 },
  { id: 'week', label: 'Full Expedition (5–7 days)', minDays: 5, maxDays: 7 },
  { id: 'long', label: 'Deep Immersion (8+ days)', minDays: 8, maxDays: 14 },
];

const BUDGET_OPTIONS = [
  { id: 'budget', label: 'Mindful & Modest (₹10k – ₹15k)', desc: 'Clean beach shacks, ashrams, local thalis' },
  { id: 'comfortable', label: 'Comfortable Boutique (₹15k – ₹25k)', desc: 'Charming homestays, rooftop cafes, smooth transit' },
  { id: 'heritage', label: 'Heritage & Luxury (₹25k – ₹45k+)', desc: 'Palace havelis, private transfers, fine dining' },
];

export const MatchQuizModal: React.FC<MatchQuizModalProps> = ({
  destinations,
  onSelectDestination,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedMood, setSelectedMood] = useState<string>('Slow & Peaceful');
  const [selectedDuration, setSelectedDuration] = useState<string>('mid');
  const [selectedBudget, setSelectedBudget] = useState<string>('comfortable');

  // Compute recommendation
  const getRecommendation = () => {
    let topDest = destinations[0];
    let highestScore = 0;
    let reasons: string[] = [];

    destinations.forEach((dest) => {
      let score = dest.matchScore;
      let curReasons: string[] = [];

      // Mood match
      if (dest.travelMoods.some(m => m.toLowerCase().includes(selectedMood.toLowerCase()) || selectedMood.toLowerCase().includes(m.toLowerCase()))) {
        score += 8;
        curReasons.push(`Matches your intention for a **${selectedMood}** escape.`);
      }

      // Budget match
      if (selectedBudget === 'budget' && dest.budgetTypical <= 16000) {
        score += 6;
        curReasons.push(`Fits within your modest budget (${dest.budgetFormatted}).`);
      } else if (selectedBudget === 'comfortable' && dest.budgetTypical >= 12000 && dest.budgetTypical <= 25000) {
        score += 6;
        curReasons.push(`Ideal tier for boutique homestays and comfortable exploration.`);
      } else if (selectedBudget === 'heritage' && dest.budgetTypical >= 20000) {
        score += 6;
        curReasons.push(`Offers exceptional heritage havelis and elevated boutique stays.`);
      }

      // Duration match
      curReasons.push(`Recommended timeline: **${dest.idealDuration}**.`);

      if (score > highestScore) {
        highestScore = score;
        topDest = dest;
        reasons = curReasons;
      }
    });

    return { destination: topDest, score: Math.min(highestScore, 98), reasons };
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood('Slow & Peaceful');
    setSelectedDuration('mid');
    setSelectedBudget('comfortable');
  };

  const result = getRecommendation();

  return (
    <div id="trip-matcher-container" className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Container Card */}
      <div className="bg-[#1e1b19] border border-[#2d2927] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#9EB094]/10 blur-[90px] rounded-full pointer-events-none" />

        {/* Progress Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2d2927]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#151311] border border-[#383432] flex items-center justify-center text-[#9EB094]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-ebGaramond text-xl sm:text-2xl text-[#e8e1de]">Intelligent Sanctuary Matcher</h2>
              <p className="font-mono-code text-[11px] text-[#cfc4c6]/70">Step {step} of 3</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  step === s ? 'w-8 bg-[#9EB094]' : step > s ? 'w-4 bg-[#9EB094]/50' : 'w-4 bg-[#2d2927]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Mood */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-ebGaramond text-2xl sm:text-3xl text-[#e8e1de] mb-2">
                What energy are you seeking from this voyage?
              </h3>
              <p className="text-xs sm:text-sm text-[#cfc4c6] font-light">
                Select the primary atmosphere you need to replenish your mind and spirit.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.id}
                  id={`quiz-mood-${m.id.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    selectedMood === m.id
                      ? 'bg-[#2d2927] border-[#9EB094] text-[#e8e1de] shadow-md'
                      : 'bg-[#151311] border-[#2d2927] text-[#cfc4c6] hover:border-[#383432]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{m.icon}</span>
                    {selectedMood === m.id && <Check className="w-4 h-4 text-[#9EB094]" />}
                  </div>
                  <div className="font-medium text-sm text-[#e8e1de]">{m.label}</div>
                  <div className="text-xs text-[#cfc4c6]/70 mt-1 font-light leading-relaxed">{m.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                id="quiz-step1-next"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9EB094] text-[#100e0c] font-medium text-xs tracking-wider uppercase shadow-md hover:bg-[#b0c2a5] transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Duration */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-ebGaramond text-2xl sm:text-3xl text-[#e8e1de] mb-2">
                How many days can you dedicate?
              </h3>
              <p className="text-xs sm:text-sm text-[#cfc4c6] font-light">
                We balance travel transit times so your journey feels restorative, never rushed.
              </p>
            </div>

            <div className="grid gap-3">
              {DURATION_OPTIONS.map((d) => (
                <button
                  key={d.id}
                  id={`quiz-dur-${d.id}`}
                  onClick={() => setSelectedDuration(d.id)}
                  className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                    selectedDuration === d.id
                      ? 'bg-[#2d2927] border-[#9EB094] text-[#e8e1de] shadow-md'
                      : 'bg-[#151311] border-[#2d2927] text-[#cfc4c6] hover:border-[#383432]'
                  }`}
                >
                  <div className="font-medium text-sm text-[#e8e1de]">{d.label}</div>
                  {selectedDuration === d.id && <Check className="w-4 h-4 text-[#9EB094]" />}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                id="quiz-step2-back"
                onClick={() => setStep(1)}
                className="px-5 py-2 rounded-full border border-[#383432] text-xs text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
              >
                Back
              </button>
              <button
                id="quiz-step2-next"
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9EB094] text-[#100e0c] font-medium text-xs tracking-wider uppercase shadow-md hover:bg-[#b0c2a5] transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Budget & Calculate */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-ebGaramond text-2xl sm:text-3xl text-[#e8e1de] mb-2">
                What budget spectrum feels most comfortable?
              </h3>
              <p className="text-xs sm:text-sm text-[#cfc4c6] font-light">
                Estimated per person inclusive of lodging, regional food, and local transit.
              </p>
            </div>

            <div className="grid gap-3">
              {BUDGET_OPTIONS.map((b) => (
                <button
                  key={b.id}
                  id={`quiz-bud-${b.id}`}
                  onClick={() => setSelectedBudget(b.id)}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    selectedBudget === b.id
                      ? 'bg-[#2d2927] border-[#9EB094] text-[#e8e1de] shadow-md'
                      : 'bg-[#151311] border-[#2d2927] text-[#cfc4c6] hover:border-[#383432]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm text-[#e8e1de]">{b.label}</div>
                    {selectedBudget === b.id && <Check className="w-4 h-4 text-[#9EB094]" />}
                  </div>
                  <div className="text-xs text-[#cfc4c6]/70 mt-1">{b.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <button
                id="quiz-step3-back"
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-full border border-[#383432] text-xs text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
              >
                Back
              </button>
              <button
                id="quiz-step3-reveal"
                onClick={() => setStep(4)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#9EB094] text-[#100e0c] font-medium text-xs tracking-wider uppercase shadow-md hover:bg-[#b0c2a5] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reveal Matched Sanctuary</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Result Card */}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#2d2927]">
              <div>
                <span className="font-mono-code text-[11px] text-[#9EB094] uppercase tracking-widest block mb-1">
                  Voyage Algorithm Recommendation
                </span>
                <h3 className="font-ebGaramond text-3xl sm:text-4xl text-[#e8e1de]">
                  Your Sanctuary is <span className="text-[#9EB094]">{result.destination.name}</span>
                </h3>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-[#151311] border border-[#383432] font-mono-code text-xs text-[#9EB094]">
                Match Score: {result.score}%
              </div>
            </div>

            {/* Destination Preview Card */}
            <div className="grid sm:grid-cols-2 gap-6 bg-[#151311] rounded-2xl p-5 border border-[#2d2927]">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#100e0c]">
                <img
                  src={result.destination.heroImage}
                  alt={result.destination.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-[#cfc4c6]">
                    <MapPin className="w-3.5 h-3.5 text-[#9EB094]" />
                    <span>{result.destination.state ? `${result.destination.state}, ` : ''}{result.destination.country}</span>
                  </div>
                  <p className="font-ebGaramond text-lg text-[#e8e1de] leading-snug">
                    "{result.destination.shortDescription}"
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono-code text-[#9EB094] uppercase tracking-wider block">
                    Why this matches you:
                  </span>
                  <ul className="text-xs text-[#cfc4c6] space-y-1.5 list-disc list-inside">
                    {result.reasons.map((r, i) => (
                      <li key={i} dangerouslySetInnerHTML={{ __html: r.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    id="quiz-view-sanctuary-btn"
                    onClick={() => onSelectDestination(result.destination)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#9EB094] hover:bg-[#b0c2a5] text-[#100e0c] font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Sanctuary Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    id="quiz-restart-btn"
                    onClick={handleReset}
                    className="p-2.5 rounded-xl bg-[#221f1d] hover:bg-[#2d2927] border border-[#383432] text-[#cfc4c6] hover:text-[#e8e1de] transition-colors"
                    title="Retake Quiz"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
