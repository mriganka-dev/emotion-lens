import { EmotionIcon } from "@/components/analyzer/EmotionIcon";
import { EMOTIONS_BY_LABEL } from "@/lib/emotions";
import type { FaceResult } from "@/types/api";

interface FaceOverlayProps {
  faces: FaceResult[];
  selectedFaceId: number;
  imageWidth: number;
  imageHeight: number;
  onSelectFace: (id: number) => void;
}

export function FaceOverlay({
  faces,
  selectedFaceId,
  imageWidth,
  imageHeight,
  onSelectFace,
}: FaceOverlayProps) {
  if (faces.length === 0 || imageWidth <= 0 || imageHeight <= 0) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {faces.map((face, index) => {
        const isSelected = face.id === selectedFaceId;
        const meta = EMOTIONS_BY_LABEL[face.emotion];
        const emotionColor = meta?.colorVar ?? "var(--primary)";

        const leftPercent = (face.box.x / imageWidth) * 100;
        const topPercent = (face.box.y / imageHeight) * 100;
        const widthPercent = (face.box.width / imageWidth) * 100;
        const heightPercent = (face.box.height / imageHeight) * 100;

        // Threshold to determine if box is too compact to show full chip
        const isCompact = widthPercent < 14;

        return (
          <button
            key={face.id}
            type="button"
            onClick={() => onSelectFace(face.id)}
            aria-label={`Face ${index + 1}, ${face.emotion}`}
            aria-pressed={isSelected}
            className={`pointer-events-auto absolute rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${
              isSelected
                ? "border-2 shadow-md ring-1 ring-black/20"
                : "border border-white/70 bg-white/10 hover:border-white hover:bg-white/20"
            }`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
              borderColor: isSelected ? emotionColor : undefined,
              backgroundColor: isSelected ? "rgba(0, 0, 0, 0.08)" : undefined,
            }}
          >
            {/* Corner Badge with Face Number */}
            <span
              className={`absolute -top-2.5 -left-2.5 flex size-5 items-center justify-center rounded-full text-[10px] font-bold shadow-xs ${
                isSelected ? "text-white" : "bg-black/75 text-white"
              }`}
              style={{
                backgroundColor: isSelected ? emotionColor : undefined,
              }}
            >
              {index + 1}
            </span>

            {/* Selected Emotion Chip */}
            {isSelected && !isCompact && (
              <span
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium text-white shadow-sm"
                style={{ backgroundColor: emotionColor }}
              >
                <EmotionIcon label={face.emotion} size={12} />
                <span>{face.emotion}</span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
