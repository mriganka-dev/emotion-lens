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
    <div className="relative mx-auto flex max-h-[560px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-black/95 p-3 sm:p-5 shadow-2xl">
      {/* Outer 4 Corner Targeting Reticles */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 left-2 z-20 size-3 border-t-2 border-l-2 border-[#8dd8ff]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-2 right-2 z-20 size-3 border-t-2 border-r-2 border-[#8dd8ff]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 left-2 z-20 size-3 border-b-2 border-l-2 border-[#8dd8ff]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-2 right-2 z-20 size-3 border-b-2 border-r-2 border-[#8dd8ff]"
      />

      {/* Tightly wrap image in an inline-block container matching its exact rendered bounds */}
      <div className="relative inline-block max-h-[520px] max-w-full">
        <img
          src={imageUrl}
          alt="Uploaded portrait"
          className="block max-h-[520px] w-auto max-w-full object-contain rounded select-none shadow-md"
        />

        {/* Dynamic Scan Line while analyzing */}
        {isAnalyzing && <ScanLine />}

        {/* Face Bounding Box Overlay exactly bounded by the photo dimensions */}
        {faces.length > 0 && imageWidth > 0 && imageHeight > 0 && onSelectFace && (
          <FaceOverlay
            faces={faces}
            selectedFaceId={selectedFaceId}
            imageWidth={imageWidth}
            imageHeight={imageHeight}
            onSelectFace={onSelectFace}
          />
        )}
      </div>

      {/* Change Photo Shortcut Button */}
      {onChooseAnother && (
        <button
          type="button"
          onClick={onChooseAnother}
          aria-label="Choose another photo"
          title="Choose another photo"
          className="absolute top-3 right-3 z-30 flex size-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-white/20 bg-black/80 text-white/80 backdrop-blur-md transition-all hover:border-[#4c97ff]/60 hover:bg-black hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff]"
        >
          <RefreshCw className="size-4" />
        </button>
      )}
    </div>
  );
}
