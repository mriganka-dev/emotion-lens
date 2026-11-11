import { m } from "motion/react";
import { EmotionIcon } from "@/components/analyzer/EmotionIcon";
import { EMOTIONS_BY_LABEL } from "@/lib/emotions";
import { formatPercent } from "@/lib/format";
import type { Score } from "@/types/api";

interface ScoreBarsProps {
  scores: Score[];
}

export function ScoreBars({ scores }: ScoreBarsProps) {
  return (
    <div className="space-y-3" role="list" aria-label="Emotion score breakdown">
      {scores.map((score, index) => {
        const isTop = index === 0;
        const meta = EMOTIONS_BY_LABEL[score.label];
        const highlightColor = meta?.colorVar ?? "#4c97ff";

        return (
          <div key={score.label} className="flex items-center gap-3 text-sm" role="listitem">
            {/* Icon & Label */}
            <div className="flex w-28 items-center gap-2 shrink-0">
              <span
                style={{
                  color: isTop ? highlightColor : "rgba(255, 255, 255, 0.4)",
                }}
              >
                <EmotionIcon label={score.label} size={15} />
              </span>
              <span
                className={`truncate font-mono text-xs uppercase tracking-wider ${
                  isTop ? "font-medium text-white" : "text-white/60"
                }`}
              >
                {score.label}
              </span>
            </div>

            {/* Scale-X Bar Track */}
            <div
              className="relative h-2 flex-1 rounded-xs bg-white/10 overflow-hidden"
              aria-hidden="true"
            >
              <m.div
                className="absolute inset-y-0 left-0 w-full rounded-xs"
                style={{
                  backgroundColor: isTop ? highlightColor : "rgba(255, 255, 255, 0.3)",
                  opacity: isTop ? 1 : 0.6,
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: Math.max(0, Math.min(score.score, 1)) }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
              />
            </div>

            {/* Percentage with tabular numbers */}
            <span
              className={`w-12 text-right tabular-numbers font-mono text-xs shrink-0 ${
                isTop ? "font-semibold text-white" : "text-white/50"
              }`}
            >
              {formatPercent(score.score)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
