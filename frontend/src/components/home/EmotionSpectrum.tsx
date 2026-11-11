import { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { ScanFace } from "lucide-react";

interface SpectrumItem {
  id: string;
  name: string;
  code: string;
  tagline: string;
  cueSummary: string;
  detail: string;
  actionUnits: string;
}

const SPECTRUM_DATA: readonly SpectrumItem[] = [
  {
    id: "Happy",
    name: "Joy",
    code: "01",
    tagline: "The Authentic Duchenne Smile",
    cueSummary: "Symmetric upward cheek displacement and distinct eye crinkle",
    detail:
      "A genuine smile contracts both the zygomaticus major at the mouth corners and the orbicularis oculi muscles around the eyes simultaneously. Synthetic smiles typically lack the subtle eye squint, making this optical cue a primary marker of authentic affect.",
    actionUnits: "AU6 (Cheek Raiser) + AU12 (Lip Corner Puller)",
  },
  {
    id: "Surprise",
    name: "Surprise",
    code: "02",
    tagline: "The Instantaneous Reflex",
    cueSummary: "Elevated eyebrow arches, widened sclera exposure, parted jaw",
    detail:
      "Surprise is the briefest universal emotion, lasting barely a fraction of a second before transitioning into joy, fear, or relief. Widened eye aperture maximizes visual field intake to rapidly process unexpected environmental stimuli.",
    actionUnits: "AU1 (Inner Brow) + AU2 (Outer Brow) + AU5 (Upper Lid) + AU26 (Jaw Drop)",
  },
  {
    id: "Neutral",
    name: "Calm / Neutral",
    code: "03",
    tagline: "The Resting Equilibrium",
    cueSummary: "Balanced muscle tone, horizontal lip line, steady gaze",
    detail:
      "Neutral expressions provide the baseline against which all active emotional variances and deviations are computed. Relaxed facial tension with an open, uncontracted gaze indicates emotional equilibrium and composure.",
    actionUnits: "Baseline State // Resting Muscle Homeostasis",
  },
  {
    id: "Sad",
    name: "Sadness",
    code: "04",
    tagline: "The Reflective Inward State",
    cueSummary: "Inner brow corners drawn upward, slight lip downturn",
    detail:
      "Unlike active distress, nuanced sadness is marked by the unique upward tug of the inner eyebrow corners (frontalis pars medialis) and softened eyelid tension. It is among the hardest expressions to deliberately feign.",
    actionUnits: "AU1 (Inner Brow Raiser) + AU4 (Brow Lowerer) + AU15 (Lip Corner Depressor)",
  },
  {
    id: "Angry",
    name: "Anger",
    code: "05",
    tagline: "The Direct Confrontation",
    cueSummary: "Brows drawn downward and together, tightened lower eyelids",
    detail:
      "Anger manifests through intense vertical forehead furrowing, fixed direct gaze, and narrowed lip margins. The optical classifier detects the spatial compression between eyebrow landmarks and eyelid boundaries.",
    actionUnits: "AU4 (Brow Lowerer) + AU5 (Upper Lid) + AU7 (Lid Tightener) + AU23 (Lip Tightener)",
  },
  {
    id: "Fear",
    name: "Fear",
    code: "06",
    tagline: "The Vigilance Alert",
    cueSummary: "Upper eyelids raised with tense lower eyelids, lips retracted",
    detail:
      "Fear shares brow elevation with surprise, but the eyebrows are pulled together horizontally into a straighter line while the lower lids remain tight and ready for protective response.",
    actionUnits: "AU1 (Inner Brow) + AU2 (Outer Brow) + AU4 (Brow Lowerer) + AU20 (Lip Stretcher)",
  },
  {
    id: "Disgust",
    name: "Disgust",
    code: "07",
    tagline: "The Sensory Rejection",
    cueSummary: "Wrinkled nose bridge, elevated upper lip, squinted gaze",
    detail:
      "Rooted evolutionary in rejecting noxious foods or odors, disgust is characterized by the raising of the upper lip and the characteristic wrinkle across the bridge of the nose.",
    actionUnits: "AU9 (Nose Wrinkler) + AU10 (Upper Lip Raiser) + AU17 (Chin Raiser)",
  },
];

export function EmotionSpectrum() {
  const [selectedId, setSelectedId] = useState(SPECTRUM_DATA[0].id);
  const activeEmotion = SPECTRUM_DATA.find((e) => e.id === selectedId) ?? SPECTRUM_DATA[0];

  return (
    <div className="w-full space-y-10 text-white">
      {/* Section Header */}
      <header className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4c97ff]/40 bg-black/80 px-4 py-1.5 font-mono text-xs font-semibold text-[#8dd8ff] uppercase tracking-wider backdrop-blur-md">
          <span className="size-2 rounded-full bg-[#4c97ff] animate-pulse" />
          <span>SYS.04 // Expression Spectrum</span>
        </div>

        <h2
          className="font-sans leading-none font-normal tracking-tight text-white uppercase text-balance"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          <span>THE SEVEN UNIVERSAL </span>
          <span className="bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text text-transparent">
            HUMAN EXPRESSIONS.
          </span>
        </h2>

        <p className="font-mono text-xs leading-relaxed tracking-tight text-white/60 max-w-2xl">
          Select an emotion vector to inspect how subtle facial muscle coordinate displacements are
          deconstructed into mathematical confidence distributions.
        </p>
      </header>

      {/* Biometric Vector Selector Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none font-mono text-xs uppercase tracking-wider">
        {SPECTRUM_DATA.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff] active:scale-98 ${
                isSelected
                  ? "border border-[#4c97ff] bg-[#4c97ff]/20 text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.3)] font-semibold"
                  : "border border-white/15 bg-black/70 text-white/60 hover:text-white hover:border-white/30"
              }`}
            >
              <span className="text-white/40">{item.code}</span>
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Emotion Cockpit Panel */}
      <AnimatePresence mode="wait">
        <m.div
          key={activeEmotion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl"
        >
          {/* 4 Corner Reticles */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-2 size-3 border-t-2 border-l-2 border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 size-3 border-t-2 border-r-2 border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 size-3 border-b-2 border-l-2 border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 size-3 border-b-2 border-r-2 border-[#8dd8ff]"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="space-y-4 lg:col-span-8">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-1 font-mono text-xs">
                <span className="text-[#8dd8ff] font-semibold">{activeEmotion.name}</span>
                <span className="text-white/40">// {activeEmotion.tagline}</span>
              </div>

              <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                {activeEmotion.cueSummary}
              </h3>

              <p className="font-mono text-xs leading-relaxed text-white/60">
                {activeEmotion.detail}
              </p>

              <div className="pt-2 font-mono text-[11px] text-[#8dd8ff]">
                <span>PHYSIOLOGICAL ACTION UNITS: </span>
                <span className="text-white font-medium">{activeEmotion.actionUnits}</span>
              </div>
            </div>

            {/* Right Diagnostic Console Box */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 lg:col-span-4 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-white">
                <div className="flex items-center gap-2">
                  <ScanFace className="size-4 text-[#8dd8ff]" />
                  <span className="font-semibold uppercase tracking-wider">Detection Vectors</span>
                </div>
                <span className="text-[10px] text-white/40">7D TENSOR</span>
              </div>

              <ul className="space-y-2.5 text-white/60 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#4c97ff] mt-1 shrink-0" />
                  <span>Isolates eye and brow curvature coordinates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#4c97ff] mt-1 shrink-0" />
                  <span>Measures mouth corner lift and lip compression</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#4c97ff] mt-1 shrink-0" />
                  <span>Calculates continuous softmax across RAF-DB weights</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/40 uppercase tracking-wider">
                <span>Inference Target</span>
                <span className="font-semibold text-[#8dd8ff]">Normalized Softmax</span>
              </div>
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
