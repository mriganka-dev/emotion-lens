import { SAMPLE_PHOTOS } from "@/lib/samples";

interface SamplePhotosProps {
  onSelectSample?: (path: string) => void;
}

export function SamplePhotos({ onSelectSample }: SamplePhotosProps) {
  if (SAMPLE_PHOTOS.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 pt-2">
      <div className="font-mono text-xs uppercase tracking-wider text-white/50">
        <span>Sample photos:</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {SAMPLE_PHOTOS.map((sample, idx) => (
          <button
            key={sample.path}
            type="button"
            onClick={() => onSelectSample?.(sample.path)}
            className="group relative flex items-center gap-3 overflow-hidden rounded-lg border border-white/15 bg-black/70 p-2 text-left transition-all hover:border-[#4c97ff]/60 hover:bg-black/95 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff]"
          >
            <img
              src={sample.path}
              alt={sample.name}
              className="size-10 rounded border border-white/20 object-cover transition-transform group-hover:scale-105 group-hover:border-[#8dd8ff]"
            />
            <div className="min-w-0 flex-1">
              <span className="block truncate font-mono text-xs font-semibold uppercase text-white group-hover:text-[#8dd8ff]">
                0{idx + 1} {sample.name}
              </span>
              <span className="block truncate font-mono text-[10px] uppercase tracking-tight text-white/50">
                {sample.emotion}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
