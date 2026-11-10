import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Eye } from "lucide-react";

interface SpectrumItem {
  id: string;
  name: string;
  tagline: string;
  cueSummary: string;
  detail: string;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
}

const SPECTRUM_DATA: readonly SpectrumItem[] = [
  {
    id: "Happy",
    name: "Joy",
    tagline: "The Authentic Duchenne Smile",
    cueSummary: "Symmetric upward cheek displacement and distinct eye crinkle",
    detail:
      "A genuine smile contracts both the mouth corners and the eye muscles simultaneously. Synthetic or posed smiles typically lack the subtle eye squint, making this cue one of the most reliable indicators of authentic emotion.",
    colorClass: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "Surprise",
    name: "Surprise",
    tagline: "The Instantaneous Reflex",
    cueSummary: "Elevated eyebrow arches, widened sclera exposure, parted jaw",
    detail:
      "Surprise is the briefest universal emotion, lasting barely a fraction of a second before transitioning into joy, fear, or relief. The widened eyes maximize visual field intake to rapidly process unexpected stimuli.",
    colorClass: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-700 dark:text-amber-400",
  },
  {
    id: "Neutral",
    name: "Calm / Neutral",
    tagline: "The Resting Equilibrium",
    cueSummary: "Balanced muscle tone, horizontal lip line, steady gaze",
    detail:
      "Neutral expressions provide the baseline against which all emotional variances are computed. Relaxed facial tension with an open, uncontracted gaze indicates emotional equilibrium and composure.",
    colorClass: "from-slate-500/20 to-slate-500/5 border-slate-500/30",
    badgeBg: "bg-slate-500/10",
    badgeText: "text-slate-700 dark:text-slate-400",
  },
  {
    id: "Sad",
    name: "Sadness",
    tagline: "The Reflective Inward State",
    cueSummary: "Inner brow corners drawn upward, slight lip downturn",
    detail:
      "Unlike active distress, nuanced sadness is marked by the unique upward tug of the inner eyebrow corners and softened eyelid tension. It is among the hardest expressions to deliberately feign.",
    colorClass: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30",
    badgeBg: "bg-indigo-500/10",
    badgeText: "text-indigo-700 dark:text-indigo-400",
  },
  {
    id: "Angry",
    name: "Anger",
    tagline: "The Direct Confrontation",
    cueSummary: "Brows drawn downward and together, tightened lower eyelids",
    detail:
      "Anger manifests through intense vertical forehead furrowing, fixed direct gaze, and narrowed lip margins. The optical classifier detects the compression between eyebrow landmarks and eyelid boundaries.",
    colorClass: "from-rose-500/20 to-rose-500/5 border-rose-500/30",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-700 dark:text-rose-400",
  },
  {
    id: "Fear",
    name: "Fear",
    tagline: "The Vigilance Alert",
    cueSummary: "Upper eyelids raised with tense lower eyelids, lips retracted",
    detail:
      "Fear shares brow elevation with surprise, but the eyebrows are pulled together horizontally into a straighter line while the lower lids remain tight and ready for protective response.",
    colorClass: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-700 dark:text-violet-400",
  },
  {
    id: "Disgust",
    name: "Disgust",
    tagline: "The Sensory Rejection",
    cueSummary: "Wrinkled nose bridge, elevated upper lip, squinted gaze",
    detail:
      "Rooted evolutionary in rejecting noxious foods or odors, disgust is characterized by the raising of the upper lip and the characteristic wrinkle across the bridge of the nose.",
    colorClass: "from-teal-500/20 to-teal-500/5 border-teal-500/30",
    badgeBg: "bg-teal-500/10",
    badgeText: "text-teal-700 dark:text-teal-400",
  },
];

export function EmotionSpectrum() {
  const [selectedId, setSelectedId] = useState(SPECTRUM_DATA[0].id);
  const activeEmotion = SPECTRUM_DATA.find((e) => e.id === selectedId) ?? SPECTRUM_DATA[0];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col gap-1 border-b border-border/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Emotional Psychology
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            The Seven Universal Expressions
          </h2>
        </div>
        <p className="text-xs text-muted-foreground sm:max-w-xs">
          Select an emotion to explore how subtle facial geometry is decoded by computer vision.
        </p>
      </div>

      {/* Horizontal Tab Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SPECTRUM_DATA.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isSelected
                  ? "bg-foreground text-background shadow-xs"
                  : "bg-secondary text-secondary-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Emotion Card */}
      <AnimatePresence mode="wait">
        <m.div
          key={activeEmotion.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 sm:p-8 backdrop-blur-md shadow-xs ${activeEmotion.colorClass}`}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
            {/* Left Narrative */}
            <div className="space-y-3 md:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-xs">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${activeEmotion.badgeBg} ${activeEmotion.badgeText}`}>
                  {activeEmotion.name}
                </span>
                <span className="text-xs text-muted-foreground">· {activeEmotion.tagline}</span>
              </div>

              <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {activeEmotion.cueSummary}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {activeEmotion.detail}
              </p>
            </div>

            {/* Right Diagnostic Box */}
            <div className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-xs md:col-span-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Eye className="size-4 text-primary" />
                <span>Detection Cues</span>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground leading-normal">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Isolates eye and brow curvature coordinates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Measures mouth corner lift and lip thickness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Calculates softmax distribution across RAF-DB weights</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Confidence Target</span>
                <span className="font-semibold text-foreground">Continuous Softmax</span>
              </div>
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
