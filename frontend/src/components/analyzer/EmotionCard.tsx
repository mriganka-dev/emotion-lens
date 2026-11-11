import React from "react";
import { m } from "motion/react";
import { ConfidenceRing } from "@/components/analyzer/ConfidenceRing";
import { EmotionIcon } from "@/components/analyzer/EmotionIcon";
import { EMOTIONS_BY_LABEL } from "@/lib/emotions";
import type { FaceResult } from "@/types/api";

interface EmotionCardProps {
  face: FaceResult;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}

export function EmotionCard({ face, headingRef }: EmotionCardProps) {
  const meta = EMOTIONS_BY_LABEL[face.emotion];
  const isLowConf = face.low_confidence;

  const activeColor = isLowConf ? "var(--emotion-neutral)" : (meta?.colorVar ?? "#4c97ff");
  const activeBg = isLowConf ? "rgba(255, 255, 255, 0.06)" : (meta?.bgVar ?? "rgba(76, 151, 255, 0.12)");

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="relative flex flex-col gap-6 rounded-xl border border-white/15 bg-black/85 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between shadow-xl"
    >
      {/* 4 Corner Tech Reticles */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-white/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-white/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-white/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 size-2.5 border-b border-r border-white/20"
      />

      <div className="flex items-start gap-4">
        {/* Biometric Emotion Icon Box */}
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/15 shadow-sm transition-colors"
          style={{ backgroundColor: activeBg, color: activeColor }}
        >
          <EmotionIcon label={face.emotion} size={30} />
        </div>

        {/* Emotion Details */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="font-sans text-3xl font-bold tracking-tight text-white uppercase outline-none focus:outline-none"
            >
              {face.emotion}
            </h3>
            {isLowConf ? (
              <span className="rounded border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                Low confidence
              </span>
            ) : (
              <span className="rounded border border-[#4c97ff]/40 bg-[#4c97ff]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#8dd8ff]">
                Primary Vector
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Confidence Telemetry Meter */}
      <div className="self-end sm:self-center shrink-0">
        <ConfidenceRing
          confidence={face.confidence}
          colorVar={activeColor}
          size={78}
          strokeWidth={6}
        />
      </div>
    </m.div>
  );
}
