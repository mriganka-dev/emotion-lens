import { RefreshCw } from "lucide-react";
import { FaceOverlay } from "@/components/analyzer/FaceOverlay";
import { ScanLine } from "@/components/analyzer/ScanLine";
import type { FaceResult } from "@/types/api";

interface ImagePreviewProps {
  imageUrl: string;
  isAnalyzing: boolean;
  faces?: FaceResult[];
  selectedFaceId?: number;
  imageWidth?: number;
  imageHeight?: number;
  onSelectFace?: (id: number) => void;
  onChooseAnother?: () => void;
}

export function ImagePreview({
  imageUrl,
  isAnalyzing,
  faces = [],
  selectedFaceId = 0,
  imageWidth = 0,
  imageHeight = 0,
  onSelectFace,
  onChooseAnother,
}: ImagePreviewProps) {
  return (
    <div className="relative mx-auto flex max-h-[520px] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-black/5 dark:bg-black/40 shadow-xs">
      {/* Photo with alt text */}
      <img
        src={imageUrl}
        alt="Uploaded photo"
        className="max-h-[520px] w-auto max-w-full object-contain select-none"
      />

      {/* Dynamic Scan Line while analyzing */}
      {isAnalyzing && <ScanLine />}

      {/* Face Bounding Box Overlay */}
      {faces.length > 0 && imageWidth > 0 && imageHeight > 0 && onSelectFace && (
        <FaceOverlay
          faces={faces}
          selectedFaceId={selectedFaceId}
          imageWidth={imageWidth}
          imageHeight={imageHeight}
          onSelectFace={onSelectFace}
        />
      )}

      {/* Change Photo Shortcut Button */}
      {onChooseAnother && (
        <button
          type="button"
          onClick={onChooseAnother}
          aria-label="Choose another photo"
          title="Choose another photo"
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-xl bg-background/80 text-foreground backdrop-blur-sm transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-xs"
        >
          <RefreshCw className="size-4" />
        </button>
      )}
    </div>
  );
}

