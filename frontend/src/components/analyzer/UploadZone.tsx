import { useCallback, useRef, type ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

export function UploadZone({ onFileAccepted, onError, disabled = false }: UploadZoneProps) {
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    disabled,
    onDropRejected: (rejections) => {
      const error = rejections[0]?.errors[0];
      if (error?.code === "file-invalid-type") {
        onError?.("Please choose a JPEG, PNG or WebP image.");
      } else if (error?.code === "file-too-large") {
        onError?.("This file is too large. Please choose a smaller photo.");
      } else {
        onError?.("Please choose a JPEG, PNG or WebP image.");
      }
    },
  });

  const handleCameraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileAccepted(file);
      e.target.value = "";
    }
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          isDragReject
            ? "border-destructive bg-destructive/5"
            : isDragActive
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/50 hover:bg-muted/30"
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
      >
        <input {...getInputProps()} />

        <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
          <ImageUp className="size-7" />
        </div>

        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {isDragActive ? "Drop the photo here" : "Drop a photo here, or browse"}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          JPEG, PNG or WebP, up to 8 MB. Photos are not stored.
        </p>

        <div className="mt-6">
          <span className="inline-flex min-h-[44px] items-center rounded-xl bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground shadow-xs transition-all group-hover:bg-primary group-hover:text-primary-foreground group-active:scale-98">
            Browse files
          </span>
        </div>
      </div>

      {/* Secondary Take a Photo Button (Camera Capture) with 44px min target */}
      <div className="flex justify-center">
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={handleCameraChange}
        />
        <Button
          type="button"
          variant="outline"
          size="default"
          disabled={disabled}
          onClick={() => cameraInputRef.current?.click()}
          className="gap-2 text-xs min-h-[44px] active:scale-98"
        >
          <Camera className="size-4" />
          Take a photo
        </Button>
      </div>
    </div>
  );
}
