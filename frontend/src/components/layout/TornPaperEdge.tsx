interface TornPaperEdgeProps {
  className?: string;
  flip?: boolean;
}

export function TornPaperEdge({ className = "", flip = false }: TornPaperEdgeProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 48"
        fill="currentColor"
        preserveAspectRatio="none"
        className={`w-full h-8 sm:h-12 block ${flip ? "rotate-180" : ""}`}
      >
        <path d="M0,0 L0,22 Q12,28 24,19 T48,25 T72,18 T96,27 T120,20 T144,26 T168,17 T192,29 T216,21 T240,26 T264,18 T288,30 T312,22 T336,27 T360,19 T384,28 T408,21 T432,27 T456,18 T480,29 T504,22 T528,27 T552,19 T576,30 T600,21 T624,26 T648,18 T672,29 T696,22 T720,27 T744,19 T768,30 T792,21 T816,26 T840,18 T864,29 T888,22 T912,27 T936,19 T960,30 T984,21 T1008,26 T1032,18 T1056,29 T1080,22 T1104,27 T1128,19 T1152,30 T1176,21 T1200,26 T1224,18 T1248,29 T1272,22 T1296,27 T1320,19 T1344,30 T1368,21 T1392,26 T1416,18 T1440,24 L1440,48 L0,48 Z" />
      </svg>
    </div>
  );
}
