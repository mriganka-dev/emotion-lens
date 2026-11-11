import { useEffect, useState } from "react";
import { Link } from "react-router";
import { EvolveBiometricVisual } from "@/components/home/EvolveBiometricVisual";
import { loadSampleIntoStudio } from "@/lib/samples";

interface EvolveHeroProps {
  onScrollToStudio: () => void;
  onScrollToChapters: () => void;
}

export function EvolveHero({ onScrollToStudio, onScrollToChapters }: EvolveHeroProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initial Preloader sequence
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 12;
      if (progress >= 100) {
        progress = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsPreloaderDone(true), 250);
      } else {
        setLoadingProgress(progress);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleStartScanning = () => {
    loadSampleIntoStudio("/samples/joy-elena.jpg");
    onScrollToStudio();
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative h-dvh w-full overflow-hidden bg-black text-white select-none max-md:flex max-md:flex-col max-md:px-4 max-md:pt-20 max-md:pb-6"
    >
      {/* 1. Initial Precision Preloader Bar */}
      {!isPreloaderDone && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Calibrating vision model"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4 transition-opacity duration-500"
          style={{
            opacity: loadingProgress === 100 ? 0 : 1,
            pointerEvents: loadingProgress === 100 ? "none" : "auto",
          }}
        >
          <div className="w-[min(70vw,26rem)]">
            <p className="flex items-baseline justify-between font-mono text-xs uppercase tracking-wider text-white/50">
              <span>INITIALIZING AFFECTIVE SENSORS</span>
              <span>{loadingProgress}%</span>
            </p>
            <span className="mt-3 block h-[1px] w-full bg-white/15 overflow-hidden">
              <span
                className="block h-full w-full origin-left bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] transition-transform duration-100 ease-out"
                style={{ transform: `scaleX(${loadingProgress / 100})` }}
              />
            </span>
          </div>
        </div>
      )}

      {/* 2. Technical 8-Column Hairline Grid Blueprint & Plus Crosshairs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 max-xl:opacity-60 max-md:hidden"
      >
        <div className="absolute inset-0">
          <span className="absolute inset-y-0 left-0 w-[1px] bg-white/20" />
          <span className="absolute inset-y-0 right-0 w-[1px] bg-white/20" />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "12.5%" }} />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "25%" }} />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "37.5%" }} />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "50%" }} />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "62.5%" }} />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "75%" }} />
          <span className="absolute inset-y-0 w-[1px] bg-white/10" style={{ left: "87.5%" }} />
          <span className="absolute inset-x-0 h-[1px] bg-white/10" style={{ top: "74.875%" }} />
        </div>

        {/* Plus Markers (+) on Grid Intersections */}
        {[
          { left: "75%", top: "1.9375%" },
          { left: "37.5%", top: "11.6875%" },
          { left: "87.5%", top: "25.8125%" },
          { left: "25%", top: "50.9375%" },
          { left: "75%", top: "50.9375%" },
          { left: "12.5%", top: "74.875%" },
          { left: "87.5%", top: "74.875%" },
          { left: "25%", top: "99.3125%" },
        ].map((marker, idx) => (
          <span
            key={idx}
            className="absolute -translate-x-1/2 -translate-y-1/2 size-3 text-[#666666]"
            style={{ left: marker.left, top: marker.top }}
          >
            <svg viewBox="0 0 11 11" fill="currentColor" className="size-full">
              <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" />
            </svg>
          </span>
        ))}
      </div>

      {/* 3. Central 3D Biometric Facial Topology Visual */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <EvolveBiometricVisual />
      </div>

      {/* 4. Top-Left Primary Navigation */}
      <nav
        aria-label="Primary"
        className="absolute top-9 left-10 z-30 max-md:top-4 max-md:left-4"
      >
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hidden size-12 shrink-0 items-center justify-center rounded-md border border-white/20 bg-black/50 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-[#4c97ff] max-md:flex"
        >
          <span className="relative block h-3 w-4.5">
            <span
              className={`absolute inset-x-0 top-1/2 h-[1px] bg-white transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute inset-x-0 top-1/2 h-[1px] bg-white transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute inset-x-0 top-1/2 h-[1px] bg-white transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </span>
        </button>

        {/* Desktop Nav Links */}
        <ul
          data-open={mobileMenuOpen}
          className="flex items-center gap-12 font-mono text-xs uppercase tracking-wider text-white/80 max-md:absolute max-md:top-14 max-md:left-0 max-md:hidden max-md:w-48 max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:rounded-lg max-md:border max-md:border-white/20 max-md:bg-black/90 max-md:p-2 max-md:backdrop-blur-xl max-md:data-[open=true]:flex"
        >
          <li>
            <button
              type="button"
              onClick={onScrollToStudio}
              className="hover:text-white transition-opacity focus-visible:outline-none max-md:px-3 max-md:py-2.5 max-md:text-left"
            >
              Studio
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={onScrollToChapters}
              className="hover:text-white transition-opacity focus-visible:outline-none max-md:px-3 max-md:py-2.5 max-md:text-left"
            >
              Curriculum
            </button>
          </li>
          <li>
            <a
              href="#pipeline"
              className="hover:text-white transition-opacity focus-visible:outline-none max-md:px-3 max-md:py-2.5 max-md:block"
            >
              Pipeline
            </a>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-white transition-opacity focus-visible:outline-none max-md:px-3 max-md:py-2.5 max-md:block"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* 5. Center Scroll Cue Chevron */}
      <div className="absolute top-9 left-1/2 -translate-x-1/2 z-20 max-xl:hidden">
        <button
          type="button"
          onClick={onScrollToStudio}
          aria-label="Scroll down to studio"
          className="transition-transform duration-300 hover:translate-y-1 focus-visible:outline-none"
        >
          <svg width="27" height="11" viewBox="0 0 27 11" fill="none">
            <path
              d="M0.64 0L0 1.125L13.55 11L27 1.125L26.36 0H15.03L13.55 1.5L12.07 0H0.64Z"
              fill="url(#scroll-cue-gradient)"
            />
            <defs>
              <linearGradient id="scroll-cue-gradient" x1="14" y1="0" x2="14" y2="11" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8DD8FF" />
                <stop offset="0.45" stopColor="#69BEFF" />
                <stop offset="1" stopColor="#4C97FF" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>

      {/* 6. Top-Right Signature Gradient Frame Button */}
      <div className="absolute top-4 right-10 z-30 max-md:right-4">
        <button
          type="button"
          onClick={handleStartScanning}
          className="gradient-frame group relative isolate flex h-[3.375rem] w-[13rem] items-center overflow-hidden rounded-md bg-black px-5 transition-transform duration-200 active:scale-98 focus-visible:outline-2 focus-visible:outline-[#4c97ff] max-md:h-12 max-md:w-auto"
        >
          {/* Subtle gradient hover wash */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] opacity-0 transition-opacity duration-300 group-hover:opacity-15"
          />

          <span className="relative z-10 bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text font-mono text-xs font-semibold tracking-wider text-transparent uppercase">
            Start Scanning
          </span>

          {/* Staggered Chevrons Trail (>>>>>) */}
          <svg
            aria-hidden="true"
            viewBox="138 19.5 42 15"
            className="absolute left-[8.75rem] z-10 h-3.5 w-10 transition-transform duration-300 group-hover:translate-x-1.5"
          >
            <defs>
              <linearGradient id="cta-chevrons" gradientUnits="userSpaceOnUse" x1="0" y1="27" x2="204" y2="27">
                <stop stopColor="#8dd8ff" />
                <stop offset="0.45" stopColor="#69beff" />
                <stop offset="1" stopColor="#4c97ff" />
              </linearGradient>
            </defs>
            {[0, 9, 18, 27, 36].map((offset) => (
              <path
                key={offset}
                d="M138 34.1444L138.614 34.5L144 26.9725L138.614 19.5L138 19.8556L138 26.1513L138.818 26.9725L138 27.7937L138 34.1444Z"
                fill="url(#cta-chevrons)"
                transform={`translate(${offset} 0)`}
              />
            ))}
          </svg>
        </button>
      </div>

      {/* 7. Asymmetric Architectural Typography (h1) */}
      <h1
        id="hero-title"
        className="pointer-events-none absolute inset-0 font-sans leading-none font-normal max-md:static max-md:order-1 max-md:mt-8"
        style={{ fontSize: "clamp(38px, 6.2vw, 84px)" }}
      >
        {/* Top-Left Title Block */}
        <span className="absolute top-[8.5rem] left-10 tracking-tight text-white max-md:static max-md:block max-md:text-left">
          <span className="block">AFFECTIVE</span>
          <span className="block text-white/90">INTELLIGENCE</span>
        </span>

        {/* Bottom-Right Title Block */}
        <span className="absolute right-10 bottom-10 text-right tracking-tight text-white max-md:static max-md:block max-md:text-left max-md:mt-4">
          <span className="block">THAT DECODES</span>
          <span className="block bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text text-transparent">
            HUMAN AFFECT.
          </span>
        </span>
      </h1>

      {/* 8. Precision Floating Telemetry Statistics */}
      <div className="contents max-md:order-2 max-md:mt-6 max-md:flex max-md:flex-col max-md:gap-3">
        {/* Stat 1: Facial Accuracy */}
        <div
          className="absolute font-mono text-xs uppercase tracking-wider text-white/50 max-md:static"
          style={{ top: "27.125%", left: "calc(87.5% + 0.625rem)" }}
        >
          <span className="block text-sm font-semibold text-white">84%</span>
          <span>Facial Accuracy</span>
        </div>

        {/* Stat 2: Inference Latency */}
        <div
          className="absolute font-mono text-xs uppercase tracking-wider text-white/50 max-md:static"
          style={{ top: "52.25%", left: "calc(75% + 0.625rem)" }}
        >
          <span className="block text-sm font-semibold text-white">&lt; 120MS</span>
          <span>Inference Latency</span>
        </div>

        {/* Stat 3: Stateless Memory */}
        <div
          className="absolute font-mono text-xs uppercase tracking-wider text-white/50 max-md:static"
          style={{ top: "70.875%", left: "calc(12.5% + 0.625rem)" }}
        >
          <span className="block text-sm font-semibold text-white">0 BYTES</span>
          <span>Persistent Storage</span>
        </div>
      </div>

      {/* 9. Bottom-Left Editorial Mission Paragraph */}
      <p className="absolute bottom-10 left-10 w-60 font-mono text-xs leading-relaxed tracking-tight text-white/60 max-md:static max-md:order-3 max-md:mt-auto max-md:w-auto max-md:pt-4">
        From raw camera pixels to 7-factor affective intelligence. Built with private ephemeral
        inference.
      </p>
    </section>
  );
}

