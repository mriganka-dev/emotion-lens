import { Skeleton } from "@/components/ui/skeleton";

export function ResultSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Analyzing photo">
      {/* Status indicator line */}
      <div className="flex items-center gap-2">
        <span className="flex size-2 rounded-full bg-primary animate-ping" />
        <span className="text-sm font-medium text-foreground">Analyzing photo</span>
      </div>

      {/* Emotion Hero Card Skeleton */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <Skeleton className="size-14 rounded-2xl shrink-0" />
          <div className="space-y-2 pt-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <Skeleton className="size-16 rounded-full self-end sm:self-center shrink-0" />
      </div>

      {/* Score Bars Skeleton */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
        <Skeleton className="h-4 w-28" />
        <div className="space-y-3 pt-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="h-4 w-24 shrink-0" />
              <Skeleton className="h-2 flex-1 rounded-full" />
              <Skeleton className="h-4 w-10 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
