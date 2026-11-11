import { AlternatingFeatures } from "@/components/home/AlternatingFeatures";
import { EmotionSpectrum } from "@/components/home/EmotionSpectrum";
import { EvolveHero } from "@/components/home/EvolveHero";
import { StudioEthics } from "@/components/home/StudioEthics";

export default function HomePage() {
  const scrollToExplore = () => {
    const el = document.getElementById("pipeline");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative isolate w-full bg-black text-white overflow-hidden">
      {/* 1. Precision Evolve Biometric Hero */}
      <EvolveHero onScrollToExplore={scrollToExplore} />

      {/* Grid Substrate & Crosshairs for Sections below Hero */}
      <div className="relative isolate w-full">
        {/* Continuous 4-Column Hairline Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid grid-cols-4 -z-10"
        >
          <div className="border-r border-[#1a1a1a]" />
          <div className="border-r border-[#1a1a1a]" />
          <div className="border-r border-[#1a1a1a]" />
          <div className="border-r border-transparent" />
        </div>

        {/* Plus Markers (+) on Grid Coordinates */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {[
            { left: "25%", top: "8%" },
            { left: "75%", top: "14%" },
            { left: "50%", top: "28%" },
            { left: "12.5%", top: "42%" },
            { left: "87.5%", top: "56%" },
            { left: "25%", top: "70%" },
            { left: "75%", top: "84%" },
            { left: "50%", top: "95%" },
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

        {/* Subtle Cyan Radial Aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 left-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4c97ff]/5 blur-3xl -z-10"
        />

        {/* 2. Engineering Architecture & Pipeline Blueprint */}
        <AlternatingFeatures />

        {/* 3. The Seven Universal Expressions Spectrum */}
        <section id="spectrum" className="scroll-mt-16 py-20 sm:py-32 border-t border-white/10">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
            <EmotionSpectrum />
          </div>
        </section>

        {/* 4. Studio Principles & Privacy Architecture */}
        <section id="ethics" className="scroll-mt-16 py-20 sm:py-32 border-t border-white/10">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
            <StudioEthics />
          </div>
        </section>
      </div>
    </div>
  );
}
