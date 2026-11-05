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
        const highlightColor = meta?.colorVar ?? "var(--primary)";

        return (
          <div key={score.label} className="flex items-center gap-3 text-sm" role="listitem">
            {/* Icon & Label */}
            <div className="flex w-28 items-center gap-2 shrink-0">
              <span
                style={{
                  color: isTop ? highlightColor : "var(--muted-foreground)",
                }}
              >
                <EmotionIcon label={score.label} size={16} />
              </span>
              <span
                className={`truncate ${
                  isTop ? "font-medium text-foreground" : "text-muted-foreground"
                }`}
              >
                {score.label}
              </span>
            </div>

            {/* Scale-X Bar Track */}
            <div
              className="relative h-2 flex-1 rounded-full bg-muted/60 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="absolute inset-y-0 left-0 w-full rounded-full transition-transform duration-300 ease-out"
                style={{
                  backgroundColor: isTop ? highlightColor : "var(--muted-foreground)",
                  opacity: isTop ? 1 : 0.45,
                  transform: `scaleX(${Math.max(0, Math.min(score.score, 1))})`,
                  transformOrigin: "left",
                }}
              />
            </div>

            {/* Percentage */}
            <span
              className={`w-12 text-right tabular-numbers text-xs shrink-0 ${
                isTop ? "font-semibold text-foreground" : "text-muted-foreground"
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
