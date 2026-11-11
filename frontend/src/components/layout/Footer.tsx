import { Link } from "react-router";
import { ScanFace, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative isolate w-full border-t border-white/10 bg-black pt-16 pb-10 text-white overflow-hidden">
      {/* 1. Technical 4-Column Hairline Grid Substrate */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid grid-cols-4 -z-10"
      >
        <div className="border-r border-[#1a1a1a]" />
        <div className="border-r border-[#1a1a1a]" />
        <div className="border-r border-[#1a1a1a]" />
        <div className="border-r border-transparent" />
      </div>

      {/* 2. Precision Crosshair Markers at Grid Coordinates */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {[
          { left: "12.5%", top: "25%" },
          { left: "37.5%", top: "60%" },
          { left: "62.5%", top: "30%" },
          { left: "87.5%", top: "75%" },
        ].map((marker, idx) => (
          <span
            key={idx}
            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 text-[#666666]"
            style={{ left: marker.left, top: marker.top }}
          >
            <svg viewBox="0 0 11 11" fill="currentColor" className="size-full">
              <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" />
            </svg>
          </span>
        ))}
      </div>

      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 space-y-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Brand, Mission & Monospace Link Matrix */}
          <div className="space-y-8 lg:col-span-7">
            {/* Brand Lockup */}
            <div className="flex items-center gap-3">
              <span className="relative flex size-9 items-center justify-center rounded-md border border-[#4c97ff]/40 bg-black text-[#8dd8ff] shadow-[0_0_12px_rgba(76,151,255,0.35)]">
                <ScanFace className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Emotion Lens
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8dd8ff]">
                  Optical Perception Studio
                </span>
              </div>
            </div>

            <p className="max-w-lg font-mono text-xs leading-relaxed text-white/60">
              A private, real-time facial affect studio. Built with ethical machine perception
              principles, multi-face spatial tracking, and zero persistent storage.
            </p>

            {/* Quick Links Matrix */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 pt-2 font-mono text-xs">
              <div className="space-y-3">
                <p className="font-semibold text-[#8dd8ff] uppercase tracking-wider text-[11px]">
                  01 // Studio
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <Link
                      to="/scan"
                      className="inline-flex items-center hover:text-white transition-colors"
                    >
                      Scanner
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/#pipeline"
                      className="inline-flex items-center hover:text-white transition-colors"
                    >
                      Pipeline
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#spectrum"
                      className="inline-flex items-center hover:text-white transition-colors"
                    >
                      Spectrum
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#ethics"
                      className="inline-flex items-center hover:text-white transition-colors"
                    >
                      Ethics
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-[#8dd8ff] uppercase tracking-wider text-[11px]">
                  02 // System
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <Link
                      to="/about"
                      className="inline-flex items-center hover:text-white transition-colors"
                    >
                      About Project
                    </Link>
                  </li>
                  <li>
                    <span className="text-white/40">Zero Storage</span>
                  </li>
                  <li>
                    <span className="text-white/40">Ephemeral RAM</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-[#8dd8ff] uppercase tracking-wider text-[11px]">
                  03 // Telemetry
                </p>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <span className="text-white/40">RAF-DB Weights</span>
                  </li>
                  <li>
                    <span className="text-white/40">Haar Multi-Scale</span>
                  </li>
                  <li>
                    <span className="text-white/40">7-Factor Softmax</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Biometric Cockpit Diagnostic Console */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/15 bg-black/85 p-6 backdrop-blur-2xl shadow-2xl space-y-5">
              {/* 4 Corner Targeting Reticles */}
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

              {/* Console Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#4c97ff] animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8dd8ff]">
                    DIAGNOSTIC // HEAP STATUS
                  </span>
                </div>
                <span className="font-mono text-[10px] text-white/40 uppercase">
                  ONLINE
                </span>
              </div>

              {/* Telemetry Matrix */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex justify-between items-center text-white/60">
                  <span>MEMORY ALLOCATION</span>
                  <span className="text-[#8dd8ff]">TRANSIENT HEAP</span>
                </div>
                <div className="flex justify-between items-center text-white/60">
                  <span>PERSISTENCE RISK</span>
                  <span className="text-[#8dd8ff]">ZERO DISK I/O</span>
                </div>
                <div className="flex justify-between items-center text-white/60">
                  <span>AFFECT INFERENCE</span>
                  <span className="text-white/80">7-CLASS PROBABILITY</span>
                </div>
                <div className="flex justify-between items-center text-white/60">
                  <span>MODEL LATENCY</span>
                  <span className="text-[#8dd8ff]">&lt; 80 MS</span>
                </div>
              </div>

              {/* Call to action button */}
              <div className="pt-2">
                <Link
                  to="/scan"
                  className="gradient-frame group relative isolate flex h-11 w-full items-center justify-center overflow-hidden rounded-md bg-black px-5 transition-transform duration-200 active:scale-98 focus-visible:outline-2 focus-visible:outline-[#4c97ff]"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] opacity-0 transition-opacity duration-300 group-hover:opacity-15"
                  />
                  <ScanFace className="size-4 text-[#8dd8ff] mr-2 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative z-10 bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text font-mono text-xs font-semibold tracking-wider text-transparent uppercase">
                    Start Scanning
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="138 19.5 42 15"
                    className="ml-3 h-3 w-8 shrink-0 text-[#8dd8ff] transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M141.6 20.3L147.2 27L141.6 33.7H138.8L144.4 27L138.8 20.3H141.6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M149.6 20.3L155.2 27L149.6 33.7H146.8L152.4 27L146.8 20.3H149.6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M157.6 20.3L163.2 27L157.6 33.7H154.8L160.4 27L154.8 20.3H157.6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M165.6 20.3L171.2 27L165.6 33.7H162.8L168.4 27L162.8 20.3H165.6Z"
                      fill="currentColor"
                    />
                    <path
                      d="M173.6 20.3L179.2 27L173.6 33.7H170.8L176.4 27L170.8 20.3H173.6Z"
                      fill="currentColor"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-xs text-white/50 sm:flex-row">
          <p className="text-center sm:text-left">
            SYS.ID: EMOTION-LENS-V2 // PHOTOS ARE EVALUATED IN VOLATILE HEAP MEMORY AND NEVER STORED ON DISK.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/60">
              <ShieldCheck className="size-3.5 text-[#8dd8ff]" />
              <span>WCAG AA COMPLIANT</span>
            </span>
            <Link
              to="/about"
              className="text-[#8dd8ff] underline-offset-4 hover:underline"
            >
              System Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
