import { formatPercent } from "@/lib/format";

interface ConfidenceRingProps {
  confidence: number;
  colorVar?: string;
  size?: number;
  strokeWidth?: number;
}

export function ConfidenceRing({
  confidence,
  colorVar = "var(--primary)",
  size = 72,
  strokeWidth = 6,
}: ConfidenceRingProps) {
  const normalized = Math.min(Math.max(confidence, 0), 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - normalized * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      role="meter"
      aria-valuenow={Math.round(normalized * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Confidence score"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-muted/40"
          strokeWidth={strokeWidth}
        />
        {/* Progress meter */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorVar}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="tabular-numbers text-sm font-semibold tracking-tight text-foreground">
          {formatPercent(normalized)}
        </span>
      </div>
    </div>
  );
}
