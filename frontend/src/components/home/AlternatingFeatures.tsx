import { BarChart3, Layers, Lock, ShieldCheck, Zap } from "lucide-react";

export function AlternatingFeatures() {
  return (
    <section id="pipeline" className="relative w-full py-20 sm:py-32 scroll-mt-16 text-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 space-y-24 sm:space-y-36">
        {/* Section Header */}
        <header className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#4c97ff]/40 bg-black/80 px-4 py-1.5 font-mono text-xs font-semibold text-[#8dd8ff] uppercase tracking-wider backdrop-blur-md">
            <span className="size-2 rounded-full bg-[#4c97ff] animate-pulse" />
            <span>SYS.03 // Pipeline Architecture</span>
          </div>

          <h2
            className="font-sans leading-none font-normal tracking-tight text-white uppercase text-balance"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            <span>OBSERVATION PIPELINE WITH </span>
            <span className="bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text text-transparent">
              ARCHITECTURAL CLARITY.
            </span>
          </h2>

          <p className="font-mono text-xs leading-relaxed tracking-tight text-white/60 max-w-2xl">
            Designed as an optical precision instrument. Every phase from raw photon acquisition to continuous
            softmax probability distribution operates with mathematical transparency.
          </p>
        </header>

        {/* Feature 1: Multi-Face Geometric Extraction */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Narrative */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.25)]">
              <Layers className="size-5" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8dd8ff]">
              01 // SPATIAL TRACKING
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              Multi-Face Geometric Coordinate Extraction
            </h3>
            <p className="font-mono text-xs leading-relaxed text-white/60">
              Multi-scale Haar cascade classifiers compute adjacent edge differentials across progressive
              resolutions, isolating exact bounding boxes for every face in the frame without downscaling
              or distorting natural aspect ratios.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-xs uppercase tracking-wider text-white/70">
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                Haar Cascades
              </span>
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                Aspect Preserved
              </span>
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                Multi-Subject
              </span>
            </div>
          </div>

          {/* Right Cockpit Console Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
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

              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-white/50 uppercase tracking-wider">
                <span className="flex items-center gap-2 text-white">
                  <span className="size-2 rounded-full bg-[#4c97ff] animate-pulse" />
                  COORDINATE MATRIX // ROI
                </span>
                <span>SUB-PIXEL PRECISION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1.5">
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">
                    Target 01 Vector Bounds
                  </span>
                  <p className="font-semibold text-white text-sm">[X: 142, Y: 98, W: 210, H: 210]</p>
                  <p className="text-[11px] text-[#8dd8ff] tracking-wider">LOCKED 98.4% // PASS</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-1.5">
                  <span className="text-white/40 text-[10px] uppercase tracking-wider">
                    Target 02 Vector Bounds
                  </span>
                  <p className="font-semibold text-white text-sm">[X: 380, Y: 110, W: 195, H: 195]</p>
                  <p className="text-[11px] text-[#8dd8ff] tracking-wider">LOCKED 94.1% // PASS</p>
                </div>
              </div>

              <div className="rounded-lg border border-dashed border-white/15 bg-black/60 p-3 text-center font-mono text-xs text-white/50 uppercase tracking-wider">
                Concurrent multi-subject inference up to 10 optical targets per frame
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: 7-Factor Softmax Distribution */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Console Card (Order 2 on mobile, 1 on desktop) */}
          <div className="lg:col-span-7 lg:order-1 order-2">
            <div className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
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

              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-white/50 uppercase tracking-wider">
                <span className="flex items-center gap-2 text-white">
                  <BarChart3 className="size-4 text-[#8dd8ff]" />
                  PROBABILITY TENSOR SPREAD
                </span>
                <span>RAF-DB // SOFTMAX</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-xs mb-1 uppercase tracking-wider">
                    <span className="text-white font-medium">Joy (Happy)</span>
                    <span className="text-[#8dd8ff] font-bold">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-sm bg-white/10 overflow-hidden">
                    <div className="h-full rounded-sm bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 uppercase tracking-wider">
                    <span className="text-white/70">Neutral / Baseline</span>
                    <span className="text-white/60">5%</span>
                  </div>
                  <div className="h-2 w-full rounded-sm bg-white/10 overflow-hidden">
                    <div className="h-full rounded-sm bg-white/30 w-[5%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 uppercase tracking-wider">
                    <span className="text-white/70">Surprise</span>
                    <span className="text-white/60">3%</span>
                  </div>
                  <div className="h-2 w-full rounded-sm bg-white/10 overflow-hidden">
                    <div className="h-full rounded-sm bg-white/30 w-[3%]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/40 uppercase tracking-wider">
                <span>CONFIDENCE MARGIN: &gt; 85% HIGH</span>
                <span>ENTROPY: 0.14</span>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="space-y-4 lg:col-span-5 lg:order-2 order-1">
            <div className="flex size-11 items-center justify-center rounded-xl border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.25)]">
              <Zap className="size-5" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8dd8ff]">
              02 // DEEP CONVOLUTION
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              7-Factor Continuous Softmax Distribution
            </h3>
            <p className="font-mono text-xs leading-relaxed text-white/60">
              Rather than collapsing predictions into binary labels, deep convolutional kernels compute
              the complete normalized mathematical distribution across all seven universal human expressions,
              preserving subtle micro-expression blends.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-xs uppercase tracking-wider text-white/70">
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                7 Dimensions
              </span>
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                Continuous Spread
              </span>
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                Sub-120ms Latency
              </span>
            </div>
          </div>
        </div>

        {/* Feature 3: Transient Ephemeral Architecture */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Narrative */}
          <div className="space-y-4 lg:col-span-5">
            <div className="flex size-11 items-center justify-center rounded-xl border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_15px_rgba(76,151,255,0.25)]">
              <Lock className="size-5" />
            </div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#8dd8ff]">
              03 // STATELESS MEMORY
            </span>
            <h3 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              Transient Ephemeral Memory Pipeline
            </h3>
            <p className="font-mono text-xs leading-relaxed text-white/60">
              Pixel buffers exist strictly in volatile application memory during tensor evaluation.
              Zero persistent disk writes, no facial telemetry databases, and complete session isolation
              by design.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-xs uppercase tracking-wider text-white/70">
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                Volatile RAM
              </span>
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                0 Bytes Stored
              </span>
              <span className="rounded-md border border-white/15 bg-black/80 px-3 py-1">
                No Analytics Tracking
              </span>
            </div>
          </div>

          {/* Right Console Card */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/15 bg-black/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-4">
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

              <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-white/50 uppercase tracking-wider">
                <span className="flex items-center gap-2 text-white">
                  <ShieldCheck className="size-4 text-[#8dd8ff]" />
                  DATA RETENTION VERIFICATION
                </span>
                <span>ISOLATION PROTOCOL</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center space-y-1">
                  <span className="text-white/40 text-[10px] uppercase">Storage State</span>
                  <p className="font-semibold text-white text-base">0 BYTES</p>
                  <p className="text-[10px] text-[#8dd8ff]">DISK WRITES: NULL</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center space-y-1">
                  <span className="text-white/40 text-[10px] uppercase">Telemetry Log</span>
                  <p className="font-semibold text-white text-base">CLEARED</p>
                  <p className="text-[10px] text-[#8dd8ff]">IDENTIFIERS: ZERO</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-center space-y-1">
                  <span className="text-white/40 text-[10px] uppercase">Execution Window</span>
                  <p className="font-semibold text-white text-base">&lt; 120MS</p>
                  <p className="text-[10px] text-[#8dd8ff]">HEAP FREED</p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-white/40 uppercase tracking-wider">
                <span>INFERENCE ENGINE: TENSORFLOW_LITE / ONNX</span>
                <span>STATUS: SECURE_STATELESS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
