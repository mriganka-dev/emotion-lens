import { SAMPLE_PHOTOS } from "@/lib/samples";

interface SamplePhotosProps {
  onSelectSample?: (path: string) => void;
}

export function SamplePhotos({ onSelectSample }: SamplePhotosProps) {
  if (SAMPLE_PHOTOS.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Or try with a sample photo:</p>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_PHOTOS.map((sample) => (
          <button
            key={sample.path}
            type="button"
            onClick={() => onSelectSample?.(sample.path)}
            className="flex items-center gap-2 rounded-lg border border-border bg-card p-1 text-xs transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <img src={sample.path} alt={sample.name} className="size-8 rounded object-cover" />
            <span className="pr-2 font-medium">{sample.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
