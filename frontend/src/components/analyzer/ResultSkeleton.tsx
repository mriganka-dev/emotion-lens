import { Skeleton } from "@/components/ui/skeleton";

export function ResultSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Analyzing photo">
      {/* Status indicator line */}
      <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-[#8dd8ff]">
        <span className="flex size-2 rounded-full bg-[#4c97ff] animate-ping" />
        <span>Evaluating optical tensors...</span>
      </div>

      {/* Emotion Hero Card Skeleton */}
      <div className="relative flex flex-col gap-5 rounded-xl border border-white/15 bg-black/85 p-6 shadow-xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <Skeleton className="size-14 rounded-xl shrink-0 bg-white/10" />
          <div className="space-y-2 pt-1">
            <Skeleton className="h-6 w-32 bg-white/10" />
            <Skeleton className="h-4 w-48 bg-white/10" />
          </div>
        </div>
        <Skeleton className="size-16 rounded-full self-end sm:self-center shrink-0 bg-white/10" />
      </div>

      {/* Score Bars Skeleton */}
      <div className="relative rounded-xl border border-white/15 bg-black/85 p-6 shadow-xl space-y-4">
        <Skeleton className="h-4 w-28 bg-white/10" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="h-4 w-24 shrink-0 bg-white/10" />
              <Skeleton className="h-2 flex-1 rounded bg-white/10" />
              <Skeleton className="h-4 w-10 shrink-0 bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
