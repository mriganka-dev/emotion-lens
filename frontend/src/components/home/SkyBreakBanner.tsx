import { ShieldCheck, Sparkles } from "lucide-react";
import { TornPaperEdge } from "@/components/layout/TornPaperEdge";

export function SkyBreakBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-sky-400 my-12 sm:my-20">
      {/* Top Deckle Edge */}
      <div className="absolute top-0 inset-x-0 z-10 text-background">
        <TornPaperEdge flip />
      </div>

      {/* Illustrated Sky & Cloud Background */}
      <div
        className="relative w-full py-24 sm:py-32 bg-cover bg-center"
        style={{ backgroundImage: `url('/hero-landscape.jpg')` }}
      >
        <div
          className="absolute inset-0 bg-sky-900/40 backdrop-blur-[1px]"
          aria-hidden="true"
        />

        {/* Floating Callout Card */}
        <div className="relative mx-auto max-w-xl px-4 text-center">
          <div className="rounded-3xl border border-white/30 bg-black/60 p-6 sm:p-8 text-white backdrop-blur-xl shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-xs">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>Universal Observation</span>
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl text-balance">
              Designed to respect human privacy without compromise.
            </h3>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed text-balance">
              Every expression analyzed in ephemeral memory. No personal profiles, no biometric
              databases, and zero user tracking across the entire web.
            </p>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-emerald-300">
              <ShieldCheck className="size-4" />
              <span>100% EPHEMERAL BUFFER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Deckle Edge */}
      <div className="absolute bottom-0 inset-x-0 z-10 text-background">
        <TornPaperEdge />
      </div>
    </section>
  );
}
