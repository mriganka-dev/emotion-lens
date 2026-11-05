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

  const activeColor = isLowConf ? "var(--emotion-neutral)" : (meta?.colorVar ?? "var(--primary)");
  const activeBg = isLowConf ? "var(--emotion-neutral-bg)" : (meta?.bgVar ?? "var(--muted)");

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.96, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4">
        {/* Large Emotion Icon in Tinted Circle */}
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl transition-colors"
          style={{ backgroundColor: activeBg, color: activeColor }}
        >
          <EmotionIcon label={face.emotion} size={32} />
        </div>

        {/* Emotion Details */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3
              ref={headingRef}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-tight text-foreground outline-none focus:outline-none"
            >
              {face.emotion}
            </h3>
            {isLowConf && (
              <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                Low confidence
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {isLowConf
              ? "Not sure about this one. Try a clearer, front-facing photo."
              : meta?.description}
          </p>
        </div>
      </div>

      {/* Confidence Meter */}
      <div className="self-end sm:self-center">
        <ConfidenceRing
          confidence={face.confidence}
          colorVar={activeColor}
          size={76}
          strokeWidth={6}
        />
      </div>
    </m.div>
  );
}
