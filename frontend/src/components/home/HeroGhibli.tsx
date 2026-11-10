import { ArrowDown, Camera, BookOpen, Sparkles } from "lucide-react";
import { TornPaperEdge } from "@/components/layout/TornPaperEdge";

interface HeroGhibliProps {
  onScrollToStudio: () => void;
  onScrollToChapters: () => void;
}

export function HeroGhibli({ onScrollToStudio, onScrollToChapters }: HeroGhibliProps) {
  return (
    <section className="relative w-full overflow-hidden bg-sky-400">
      {/* Background Illustrated Anime Landscape */}
      <img
        src="/hero-landscape.jpg"
        alt=""
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 size-full object-cover object-center sm:object-bottom"
        aria-hidden="true"
      />
      {/* Soft atmosphere gradient overlay for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-sky-950/75 via-sky-900/45 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-sky-900/20"
        aria-hidden="true"
      />

      {/* Hero Content Stage */}
      <div className="relative mx-auto max-w-[1152px] px-4 pt-12 pb-24 sm:px-6 sm:pt-20 sm:pb-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Human Narrative */}
          <div className="space-y-6 lg:col-span-7">
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-md shadow-xs">
              <Sparkles className="size-3 text-amber-300" />
              <span>Affective Neural Studio</span>
              <span className="text-white/40">/</span>
              <span className="text-white/80">7 Discrete States</span>
            </div>

            {/* Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl text-balance">
                Understand every expression behind the human face.
              </h1>
              <p className="max-w-xl text-base text-white/90 leading-relaxed drop-shadow-xs sm:text-lg text-balance">
                A private, neural affective vision studio. Detect multiple faces, map subtle
                micro-expressions in real time, and explore emotional psychology—with zero cloud
                storage and complete client-side privacy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onScrollToStudio}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition-all hover:bg-white/90 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Camera className="size-4 text-emerald-600" />
                <span>Analyze Portrait</span>
                <ArrowDown className="size-3.5" />
              </button>

              <button
                type="button"
                onClick={onScrollToChapters}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/40 bg-black/25 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-black/40 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <BookOpen className="size-4" />
                <span>Explore Curriculum</span>
              </button>
            </div>

            {/* Trust Matrix Chips */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20 text-white font-mono text-xs max-w-lg">
              <div className="rounded-xl border border-white/20 bg-black/25 p-2.5 backdrop-blur-xs">
                <p className="text-[10px] text-white/70 uppercase">Privacy</p>
                <p className="font-semibold">Ephemeral RAM</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-black/25 p-2.5 backdrop-blur-xs">
                <p className="text-[10px] text-white/70 uppercase">Tracking</p>
                <p className="font-semibold">Multi-Face</p>
              </div>
              <div className="rounded-xl border border-white/20 bg-black/25 p-2.5 backdrop-blur-xs">
                <p className="text-[10px] text-white/70 uppercase">Speed</p>
                <p className="font-semibold">&lt; 150ms</p>
              </div>
            </div>
          </div>

          {/* Right Column: Open Studio Laptop on the Meadow */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Floating Telemetry Glass Chip Above Laptop */}
            <div className="absolute -top-6 right-2 sm:right-6 z-20 hidden sm:flex items-center gap-2 rounded-xl border border-white/30 bg-black/60 px-3 py-1.5 text-white backdrop-blur-md text-[11px] font-mono shadow-lg">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE SENSOR // 60 FPS</span>
            </div>

            {/* Stylized Laptop Hardware Mockup */}
            <div className="relative w-full max-w-md rounded-2xl border border-white/30 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-xl">
              {/* Laptop Screen Bezel */}
              <div className="overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950">
                {/* Screen Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-1.5 text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-rose-500/80" />
                    <span className="size-2 rounded-full bg-amber-500/80" />
                    <span className="size-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span>AFFECTIVE CAMERA DECK</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>

                {/* Staged Face Scan Preview */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                  <img
                    src="/samples/joy-elena.jpg"
                    alt="Facial affect scanner preview"
                    className="size-full object-cover"
                  />
                  {/* Viewfinder Reticles */}
                  <div className="pointer-events-none absolute inset-4 border border-emerald-400/40 rounded-lg">
                    <span className="absolute -top-1 -left-1 size-3 border-t-2 border-l-2 border-emerald-400" />
                    <span className="absolute -top-1 -right-1 size-3 border-t-2 border-r-2 border-emerald-400" />
                    <span className="absolute -bottom-1 -left-1 size-3 border-b-2 border-l-2 border-emerald-400" />
                    <span className="absolute -bottom-1 -right-1 size-3 border-b-2 border-r-2 border-emerald-400" />
                  </div>

                  {/* Bounding Tag */}
                  <div className="absolute top-6 left-6 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-semibold font-mono text-white backdrop-blur-xs shadow-xs">
                    FACE 01 · JOY 98%
                  </div>

                  {/* Softmax Readout Chip */}
                  <div className="absolute bottom-3 inset-x-3 rounded-lg border border-white/20 bg-black/75 p-2 text-[10px] font-mono text-white backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400">DUCHENNE SMILE DETECTED</span>
                      <span>120ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Keyboard Base Hinge */}
              <div className="mt-2 h-2.5 rounded-full bg-slate-800 border-t border-slate-700/50 flex justify-center">
                <div className="w-16 h-1 rounded-full bg-slate-600/70 mt-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Torn-Paper Organic Deckle Edge Transition */}
      <div className="absolute bottom-0 inset-x-0 text-background">
        <TornPaperEdge />
      </div>
    </section>
  );
}
