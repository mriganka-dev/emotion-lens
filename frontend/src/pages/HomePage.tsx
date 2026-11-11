import { AlternatingFeatures } from "@/components/home/AlternatingFeatures";
import { ChapterCards } from "@/components/home/ChapterCards";
import { EvolveHero } from "@/components/home/EvolveHero";
import { InteractiveWordGrid } from "@/components/home/InteractiveWordGrid";
import { SkyBreakBanner } from "@/components/home/SkyBreakBanner";
import { StudioSection } from "@/components/home/StudioSection";
import { EmotionSpectrum } from "@/components/home/EmotionSpectrum";
import { StudioEthics } from "@/components/home/StudioEthics";

export default function HomePage() {
  const scrollToStudio = () => {
    const el = document.getElementById("studio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToChapters = () => {
    const el = document.getElementById("chapters");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Precision Evolve Biometric Hero */}
      <EvolveHero
        onScrollToStudio={scrollToStudio}
        onScrollToChapters={scrollToChapters}
      />

      {/* 2. Main Studio Section with Analyzer */}
      <StudioSection />

      {/* 3. The 4 Illustrated Affective Chapters */}
      <ChapterCards />

      {/* 4. Alternating Engineering Deep-Dives */}
      <AlternatingFeatures />

      {/* 5. Mid-Page Anime Sky Break Banner */}
      <SkyBreakBanner />

      {/* 6. The Seven Universal Expressions Spectrum */}
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <EmotionSpectrum />
      </div>

      {/* 7. Interactive Vocabulary Matrix */}
      <InteractiveWordGrid />

      {/* 8. Studio Principles & Privacy Architecture */}
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <StudioEthics />
      </div>
    </div>
  );
}
