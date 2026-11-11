import { Lock, Sparkles, Users } from "lucide-react";

export function StudioEthics() {
  return (
    <section aria-label="Studio Principles & Guarantees" className="space-y-10 text-white">
      {/* Section Header */}
      <header className="space-y-4 max-w-4xl">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4c97ff]/40 bg-black/80 px-4 py-1.5 font-mono text-xs font-semibold text-[#8dd8ff] uppercase tracking-wider backdrop-blur-md">
          <span className="size-2 rounded-full bg-[#4c97ff] animate-pulse" />
          <span>SYS.05 // Privacy Protocol</span>
        </div>

        <h2
          className="font-sans leading-none font-normal tracking-tight text-white uppercase text-balance"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          <span>HUMAN PRIVACY AT </span>
          <span className="bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text text-transparent">
            THE ABSOLUTE CENTER.
          </span>
        </h2>

        <p className="font-mono text-xs leading-relaxed tracking-tight text-white/60 max-w-2xl">
          Architectural guarantees engineered into every inference cycle. No covert data collection,
          no facial recognition profiling, and zero biometric persistence.
        </p>
      </header>

      {/* 3 Cockpit Console Pillars */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Principle 1 */}
        <div className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 size-2.5 border-b border-r border-[#8dd8ff]"
          />

          <div className="flex size-11 items-center justify-center rounded-xl border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.25)]">
            <Lock className="size-5" />
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8dd8ff]">
              01 // ZERO RETENTION
            </span>
            <h3 className="font-sans text-xl font-bold tracking-tight text-white uppercase">
              Zero Storage, Zero Retention
            </h3>
          </div>

          <p className="font-mono text-xs leading-relaxed text-white/60">
            Photos reside exclusively in volatile heap memory for the brief milliseconds required for
            neural inference. No databases, zero disk writes, and no biometric training datasets.
          </p>

          <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-white/40 uppercase tracking-wider">
            RAM LIFECYCLE: EPHEMERAL // PERSISTENCE: 0B
          </div>
        </div>

        {/* Principle 2 */}
        <div className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 size-2.5 border-b border-r border-[#8dd8ff]"
          />

          <div className="flex size-11 items-center justify-center rounded-xl border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.25)]">
            <Users className="size-5" />
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8dd8ff]">
              02 // SPATIAL EXTRACTION
            </span>
            <h3 className="font-sans text-xl font-bold tracking-tight text-white uppercase">
              True Multi-Person Recognition
            </h3>
          </div>

          <p className="font-mono text-xs leading-relaxed text-white/60">
            Whether analyzing a single headshot or a group photo, each detected face is isolated and
            assigned its own independent emotion probability breakdown without spatial bleed.
          </p>

          <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-white/40 uppercase tracking-wider">
            CONCURRENCY: 10 FACES // ASPECT: PRESERVED
          </div>
        </div>

        {/* Principle 3 */}
        <div className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl sm:col-span-2 lg:col-span-1 space-y-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-[#8dd8ff]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 size-2.5 border-b border-r border-[#8dd8ff]"
          />

          <div className="flex size-11 items-center justify-center rounded-xl border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.25)]">
            <Sparkles className="size-5" />
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#8dd8ff]">
              03 // TRANSPARENCY
            </span>
            <h3 className="font-sans text-xl font-bold tracking-tight text-white uppercase">
              Honest Confidence Curves
            </h3>
          </div>

          <p className="font-mono text-xs leading-relaxed text-white/60">
            No synthetic certainty. If facial lighting or angles create ambiguity, Emotion Lens
            transparently indicates low confidence alongside the full 7-factor softmax spread.
          </p>

          <div className="pt-2 border-t border-white/10 font-mono text-[10px] text-white/40 uppercase tracking-wider">
            REPORTING: 7D SOFTMAX // THRESHOLD: PROBABILISTIC
          </div>
        </div>
      </div>
    </section>
  );
}
