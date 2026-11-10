import { BarChart3, Layers, Lock, ShieldCheck, Zap } from "lucide-react";

export function AlternatingFeatures() {
  return (
    <section id="pipeline" className="relative w-full py-16 sm:py-24 scroll-mt-16">
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Engineering Blueprint
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
            Build your observation pipeline with architectural clarity.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
            Designed like a physical darkroom tool. Every step from pixel acquisition to probability
            distribution is observable and transparent.
          </p>
        </div>

        {/* Feature 1: Multi-Face Extraction */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Narrative */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Layers className="size-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold">
              01 // SPATIAL TRACKING
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Multi-Face Geometric Coordinate Extraction
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              OpenCV cascade classifiers compute adjacent edge differentials across multiple scale
              factors, isolating region-of-interest coordinates for every person in the frame without
              distorting aspect ratios.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-muted-foreground">
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Haar Cascades
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Aspect Preserved
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Multi-Subject
              </span>
            </div>
          </div>

          {/* Right Mockup Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  COORDINATE MATRIX
                </span>
                <span>ROI BOUNDS</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">Face 01 Bounds</span>
                  <p className="font-semibold text-foreground">[X: 142, Y: 98, W: 210, H: 210]</p>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Locked 98.4%</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">Face 02 Bounds</span>
                  <p className="font-semibold text-foreground">[X: 380, Y: 110, W: 195, H: 195]</p>
                  <p className="text-[10px] text-sky-600 dark:text-sky-400">Locked 94.1%</p>
                </div>
              </div>
              <div className="rounded-xl border border-dashed border-border p-3 text-center text-xs text-muted-foreground">
                Supports up to 10 simultaneous faces in high-resolution photographs
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: 7-Factor Softmax Distribution */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Mockup Card (Flipped on desktop) */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-2">
                  <BarChart3 className="size-4 text-primary" />
                  PROBABILITY TENSOR SPREAD
                </span>
                <span>RAF-DB SOFTMAX</span>
              </div>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-foreground">Joy (Happy)</span>
                    <span className="font-mono text-emerald-700 dark:text-emerald-400">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-emerald-500 w-[92%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-foreground">Neutral / Calm</span>
                    <span className="font-mono text-slate-700 dark:text-slate-400">6%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-slate-400 w-[6%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span className="text-foreground">Surprise</span>
                    <span className="font-mono text-amber-700 dark:text-amber-400">2%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400 w-[2%]" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between pt-2 border-t border-border/40 text-[11px] font-mono text-muted-foreground">
                <span>Sum Probability: 1.000</span>
                <span>Confidence: High</span>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="space-y-4 lg:col-span-5 lg:order-2 order-1">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BarChart3 className="size-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold">
              02 // SOFTMAX INFERENCE
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Deep Convolutional Affective Distribution
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Extracted crops are normalized to 48x48 matrices and evaluated through deep
              convolutional layers trained on the RAF-DB benchmark to compute true normalized
              probabilities.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-muted-foreground">
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Normalized 48x48
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                RAF-DB Weights
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                7 Discrete Softmax
              </span>
            </div>
          </div>
        </div>

        {/* Feature 3: Transient Ephemeral Memory */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Narrative */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Lock className="size-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold">
              03 // PRIVACY ETHICS
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Stateless Memory Protection by Design
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Uploaded photos reside exclusively in volatile server heap RAM during the millisecond
              inference window. Zero disk writes, zero databases, and zero tracking cookies are
              initialized.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-muted-foreground">
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Volatile Buffer Only
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Zero Disk Persistence
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                No Face Datasets
              </span>
            </div>
          </div>

          {/* Right Mockup Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                  PERSISTENCE STATUS
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  0 BYTES STORED
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center font-mono text-xs">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">Disk Writes</span>
                  <p className="text-base font-bold text-foreground">0</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">DB Records</span>
                  <p className="text-base font-bold text-foreground">0</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">Telemetry Logs</span>
                  <p className="text-base font-bold text-foreground">0</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>
                  Your facial images are immediately garbage-collected from transient memory once the
                  response is dispatched.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 4: Performance & Speed */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Mockup Card (Flipped on desktop) */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Zap className="size-4 text-amber-500" />
                  BENCHMARK TELEMETRY
                </span>
                <span>SUB-SECOND EXECUTION</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono sm:grid-cols-4">
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">Face Detect</span>
                  <p className="text-sm font-bold text-foreground">42ms</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">CNN Softmax</span>
                  <p className="text-sm font-bold text-foreground">68ms</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">JSON Payload</span>
                  <p className="text-sm font-bold text-foreground">4ms</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-3 space-y-1">
                  <span className="text-muted-foreground text-[10px] uppercase">Total Roundtrip</span>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">114ms</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Optimized with multi-scale cascades and lightweight PyTorch inference.
              </p>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="space-y-4 lg:col-span-5 lg:order-2 order-1">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
              <Zap className="size-5" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold">
              04 // REAL-TIME EXECUTION
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              Sub-150ms End-to-End Processing Speed
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built for instant feedback. The pipeline crops, scales, and infers simultaneously,
              delivering responsive, real-time results whether on mobile 5G or desktop fiber.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 text-[11px] font-mono text-muted-foreground">
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                FastAPI Async
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Zero Blocking I/O
              </span>
              <span className="rounded-md border border-border bg-muted/40 px-2.5 py-1">
                Instant UI Stream
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
