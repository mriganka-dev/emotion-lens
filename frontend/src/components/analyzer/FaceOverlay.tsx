import { m } from "motion/react";
import type { FaceResult } from "@/types/api";
import { EMOTIONS_BY_LABEL } from "@/lib/emotions";

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {faces.map((face, index) => {
        const isSelected = face.id === selectedFaceId;
        const meta = EMOTIONS_BY_LABEL[face.emotion];
        const emotionColor = meta?.colorVar ?? "#4c97ff";

        const leftPercent = (face.box.x / imageWidth) * 100;
        const topPercent = (face.box.y / imageHeight) * 100;
        const widthPercent = (face.box.width / imageWidth) * 100;
        const heightPercent = (face.box.height / imageHeight) * 100;

        return (
          <m.button
            key={face.id}
            type="button"
            onClick={() => onSelectFace(face.id)}
            aria-label={`Face ${index + 1}, ${face.emotion}`}
            aria-pressed={isSelected}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
            className={`pointer-events-auto absolute rounded-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff] ${
              isSelected
                ? "border-2 shadow-[0_0_15px_rgba(76,151,255,0.4)]"
                : "border border-white/60 bg-white/5 hover:border-white hover:bg-white/10"
            }`}
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${widthPercent}%`,
              height: `${heightPercent}%`,
              borderColor: isSelected ? emotionColor : undefined,
              backgroundColor: isSelected ? "rgba(0, 0, 0, 0.15)" : undefined,
            }}
          >
            {/* 4 Precision Corner Reticles */}
            <span
              aria-hidden="true"
              className="absolute -top-1 -left-1 size-2 border-t-2 border-l-2"
              style={{ borderColor: emotionColor }}
            />
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 size-2 border-t-2 border-r-2"
              style={{ borderColor: emotionColor }}
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -left-1 size-2 border-b-2 border-l-2"
              style={{ borderColor: emotionColor }}
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-1 -right-1 size-2 border-b-2 border-r-2"
              style={{ borderColor: emotionColor }}
            />

            {/* Corner Badge with Face Number & Emotion Tag */}
            <span
              className="absolute -top-3 left-0 flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-md"
              style={{ backgroundColor: emotionColor }}
            >
              <span>#{index + 1}</span>
              {isSelected && <span>{face.emotion}</span>}
            </span>
          </m.button>
        );
      })}
    </div>
  );
}
