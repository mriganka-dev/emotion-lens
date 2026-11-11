import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Analyzer } from "@/components/analyzer/Analyzer";

export default function ScanPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-black text-white pt-24 sm:pt-28 pb-16">
      {/* 1. Technical 4-Column Grid Substrate */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-4 -z-10">
        <div className="border-r border-[#1a1a1a]" />
        <div className="border-r border-[#1a1a1a]" />
        <div className="border-r border-[#1a1a1a]" />
        <div className="border-r border-transparent" />
      </div>

      {/* 2. Precision Crosshair Markers at Grid Coordinates */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {[
          { left: "12.5%", top: "18%" },
          { left: "25%", top: "42%" },
          { left: "37.5%", top: "78%" },
          { left: "50%", top: "12%" },
          { left: "62.5%", top: "65%" },
          { left: "75%", top: "35%" },
          { left: "87.5%", top: "82%" },
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
        className="pointer-events-none absolute top-1/3 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4c97ff]/5 blur-3xl -z-10"
      />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1 text-[#8dd8ff]" />
            <span>[ Back to Overview ]</span>
          </Link>
        </div>

        {/* Central Cockpit Workspace Card */}
        <main className="relative rounded-2xl border border-white/20 bg-black/85 p-5 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-2xl">
          {/* 4 Corner Crosshair Accents */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-2 size-3 text-[#666666]"
          >
            <svg viewBox="0 0 11 11" fill="currentColor" className="size-full">
              <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 size-3 text-[#666666]"
          >
            <svg viewBox="0 0 11 11" fill="currentColor" className="size-full">
              <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-2 size-3 text-[#666666]"
          >
            <svg viewBox="0 0 11 11" fill="currentColor" className="size-full">
              <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" />
            </svg>
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 right-2 size-3 text-[#666666]"
          >
            <svg viewBox="0 0 11 11" fill="currentColor" className="size-full">
              <path d="M6 5H11V6H6V11H5V6H0V5H5V0H6V5Z" />
            </svg>
          </span>

          <Analyzer />
        </main>
      </div>
    </div>
  );
}
