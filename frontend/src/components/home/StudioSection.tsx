import { Analyzer } from "@/components/analyzer/Analyzer";
import { Cpu, Layers, Lock } from "lucide-react";

export function StudioSection() {
  return (
    <section id="studio" className="relative w-full py-12 sm:py-16 scroll-mt-16">
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Observation Platform
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
            Decode subtle facial cues in a single glance.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
            Upload any portrait, group photo, or snap a selfie to see instant confidence scores
            across seven discrete emotion dimensions.
          </p>
        </div>

        {/* Central Studio Workspace Card */}
        <div className="rounded-3xl border border-border/80 bg-card p-4 sm:p-8 shadow-xl backdrop-blur-sm">
          <Analyzer />
        </div>

        {/* 3 Editorial Pillars Below Card */}
        <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-3 border-t border-border/60">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Layers className="size-4 text-primary" />
              <span>Multi-Face Spatial Tracking</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Isolates every face independently using multi-scale Haar cascades without downscaling
              or distorting original pixel coordinates.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Cpu className="size-4 text-primary" />
              <span>Continuous Softmax Spread</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Evaluates normalized crops through deep convolutional layers, yielding full mathematical
              probability curves across all seven emotions.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              <Lock className="size-4 text-primary" />
              <span>Transient Ephemeral Memory</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Images exist exclusively in volatile heap RAM during inference. No disk writes, no
              biometric storage, and zero tracking cookies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
