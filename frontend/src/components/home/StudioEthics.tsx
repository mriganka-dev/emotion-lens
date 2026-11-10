import { Lock, Sparkles, Users } from "lucide-react";

export function StudioEthics() {
  return (
    <section aria-label="Studio Principles & Guarantees" className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-border/60 pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Core Principles
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Crafted with Human Privacy at the Center
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Principle 1 */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-xs transition-shadow hover:shadow-md space-y-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            <Lock className="size-5" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Zero Storage, Zero Retention
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Photos reside exclusively in volatile memory for the brief milliseconds required for
            neural inference. No databases, no disk writes, and no biometric training datasets.
          </p>
        </div>

        {/* Principle 2 */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-xs transition-shadow hover:shadow-md space-y-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="size-5" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            True Multi-Person Recognition
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Whether analyzing a single headshot or a lively dinner table with friends, each detected
            face is isolated and assigned its own independent emotion probability breakdown.
          </p>
        </div>

        {/* Principle 3 */}
        <div className="rounded-3xl border border-border/70 bg-card/60 p-6 shadow-xs transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-1 space-y-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400">
            <Sparkles className="size-5" />
          </div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Honest Confidence Curves
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            No synthetic certainty. If facial lighting or angles create ambiguity, Emotion Lens
            transparently indicates low confidence alongside the full 7-factor softmax spread.
          </p>
        </div>
      </div>
    </section>
  );
}
