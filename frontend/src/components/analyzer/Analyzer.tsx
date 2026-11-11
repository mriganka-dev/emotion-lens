import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { toast } from "sonner";
import { EmotionCard } from "@/components/analyzer/EmotionCard";
import { FaceSelector } from "@/components/analyzer/FaceSelector";
import { ImagePreview } from "@/components/analyzer/ImagePreview";
import { ResultSkeleton } from "@/components/analyzer/ResultSkeleton";
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
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const previewUrl = useImagePreview(selectedFile);
  const { analyze, reset, status, result, error } = useAnalyzeImage();

  // Active face defaults to first detected face on every new result
  const activeFaceId =
    selectedFaceId !== null && result?.faces.some((face) => face.id === selectedFaceId)
      ? selectedFaceId
      : (result?.faces[0]?.id ?? 0);

  // Move focus to result heading when analysis finishes successfully
  useEffect(() => {
    if (status === "success" && result && result.faces.length > 0) {
      resultHeadingRef.current?.focus();
    }
  }, [status, result]);

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

  const selectedFaceIndex = result?.faces.findIndex((face) => face.id === activeFaceId) ?? 0;

  // Live announcement text for screen readers
  const liveAnnouncement =
    status === "success" && selectedFace
      ? `Face ${selectedFaceIndex + 1}: ${selectedFace.emotion}, ${Math.round(
          selectedFace.confidence * 100,
        )} percent confidence`
      : "";

  return (
    <div className="w-full space-y-8">
      {/* Visually hidden live region for screen readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* State 1: Idle (Upload zone) */}
      {!selectedFile && (
        <UploadZone onFileAccepted={handleFile} onError={(msg) => toast.error(msg)} />
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

                  {/* Cross-fading Content when switching faces */}
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeFaceId}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="space-y-6"
                    >
                      {/* Primary Emotion Result Card with Spring Animation */}
                      <EmotionCard face={selectedFace} headingRef={resultHeadingRef} />

                      {/* Full 7-Emotion Score Breakdown Panel */}
                      <div className="relative rounded-xl border border-white/15 bg-black/85 p-6 shadow-xl backdrop-blur-xl">
                        {/* 4 Corner Reticles */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-2 left-2 size-2.5 border-t border-l border-white/20"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-2 right-2 size-2.5 border-t border-r border-white/20"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-2 left-2 size-2.5 border-b border-l border-white/20"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-2 right-2 size-2.5 border-b border-r border-white/20"
                        />

                        <div className="border-b border-white/10 pb-3 mb-4">
                          <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                            Emotion breakdown
                          </h4>
                        </div>
                        <ScoreBars scores={selectedFace.scores} />
                      </div>
                    </m.div>
                  </AnimatePresence>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
