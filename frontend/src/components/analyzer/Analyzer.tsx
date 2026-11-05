import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { EmotionCard } from "@/components/analyzer/EmotionCard";
import { FaceSelector } from "@/components/analyzer/FaceSelector";
import { ImagePreview } from "@/components/analyzer/ImagePreview";
import { ResultSkeleton } from "@/components/analyzer/ResultSkeleton";
import { SamplePhotos } from "@/components/analyzer/SamplePhotos";
import { ScoreBars } from "@/components/analyzer/ScoreBars";
import { StatusMessage } from "@/components/analyzer/StatusMessage";
import { UploadZone } from "@/components/analyzer/UploadZone";
import { useAnalyzeImage } from "@/hooks/useAnalyzeImage";
import { useImagePreview } from "@/hooks/useImagePreview";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { validateFile } from "@/lib/image";

export function Analyzer() {
  const isOnline = useOnlineStatus();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFaceId, setSelectedFaceId] = useState<number | null>(null);

  const previewUrl = useImagePreview(selectedFile);
  const { analyze, reset, status, result, error } = useAnalyzeImage();

  // Active face defaults to first detected face on every new result
  const activeFaceId =
    selectedFaceId !== null && result?.faces.some((face) => face.id === selectedFaceId)
      ? selectedFaceId
      : (result?.faces[0]?.id ?? 0);

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      setSelectedFile(file);
      setSelectedFaceId(null);

      if (!isOnline) {
        return;
      }

      analyze(file);
    },
    [analyze, isOnline],
  );

  const handleChooseAnother = () => {
    reset();
    setSelectedFile(null);
    setSelectedFaceId(null);
  };

  const handleRetry = () => {
    if (!selectedFile) {
      return;
    }
    if (!isOnline) {
      toast.error("You are offline. Reconnect to analyze a photo.");
      return;
    }
    analyze(selectedFile);
  };

  // Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) {
        return;
      }

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            handleFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handleFile]);

  const selectedFace = result?.faces.find((face) => face.id === activeFaceId) ?? result?.faces[0];

  return (
    <div className="w-full space-y-8">
      {/* State 1: Idle (Upload zone and sample photos) */}
      {!selectedFile && (
        <div className="space-y-6">
          <UploadZone onFileAccepted={handleFile} onError={(msg) => toast.error(msg)} />
          <SamplePhotos />
        </div>
      )}

      {/* Active States: Preview + Result Grid */}
      {selectedFile && previewUrl && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
          {/* Left Column: Image Preview with Face Overlay */}
          <div className="space-y-4">
            <ImagePreview
              imageUrl={previewUrl}
              isAnalyzing={status === "analyzing"}
              faces={result?.faces}
              selectedFaceId={activeFaceId}
              imageWidth={result?.image_width}
              imageHeight={result?.image_height}
              onSelectFace={setSelectedFaceId}
              onChooseAnother={handleChooseAnother}
            />

            {/* Face Selector Tabs if multi-face */}
            {result?.faces && result.faces.length > 1 && (
              <FaceSelector
                faces={result.faces}
                selectedFaceId={activeFaceId}
                onSelectFace={setSelectedFaceId}
              />
            )}
          </div>

          {/* Right Column: Status Panels */}
          <div className="space-y-6">
            {/* Offline Status */}
            {!isOnline && (
              <StatusMessage
                variant="offline"
                message="You are offline. Reconnect to analyze a photo."
                onRetry={handleRetry}
                onChooseAnother={handleChooseAnother}
              />
            )}

            {/* Analyzing Skeleton */}
            {isOnline && status === "analyzing" && <ResultSkeleton />}

            {/* Error State */}
            {isOnline && status === "error" && (
              <StatusMessage
                variant="error"
                title="Analysis failed"
                message={error?.message ?? "Something went wrong. Please try again."}
                onRetry={handleRetry}
                onChooseAnother={handleChooseAnother}
              />
            )}

            {/* No Face Detected State */}
            {isOnline && status === "success" && result && result.faces.length === 0 && (
              <StatusMessage
                variant="no_face"
                title="No face found"
                message="Try a clear, front-facing photo with good lighting."
                onChooseAnother={handleChooseAnother}
              />
            )}

            {/* Success State with Face Results */}
            {isOnline &&
              status === "success" &&
              result &&
              result.faces.length > 0 &&
              selectedFace && (
                <div className="space-y-6">
                  {/* Optional Whole Image Note Banner */}
                  {result.used_whole_image && (
                    <StatusMessage
                      variant="info_banner"
                      message="No face was detected, so the whole image was analyzed as a face crop."
                    />
                  )}

                  {/* Primary Emotion Result Card */}
                  <EmotionCard face={selectedFace} />

                  {/* Full 7-Emotion Score Breakdown */}
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
                    <h4 className="text-sm font-semibold tracking-tight text-foreground pb-4 border-b border-border mb-4">
                      Emotion breakdown
                    </h4>
                    <ScoreBars scores={selectedFace.scores} />
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
