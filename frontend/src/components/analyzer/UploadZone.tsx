import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  onError?: (message: string) => void;
  disabled?: boolean;
}

function FannedCardsGraphic({ isHoveredOrActive }: { isHoveredOrActive: boolean }) {
  return (
    <div className="relative mx-auto flex h-28 w-44 items-center justify-center select-none pointer-events-none">
      {/* Left Back Card */}
      <div
        className={`absolute h-24 w-20 rounded-xl border border-blue-200/70 bg-white/95 p-1.5 shadow-sm transition-all duration-300 dark:border-white/20 dark:bg-slate-800 ${
          isHoveredOrActive
            ? "-translate-x-8 -translate-y-1 -rotate-12 opacity-85 scale-95"
            : "-translate-x-2 rotate-0 opacity-0 scale-75"
        }`}
      >
        <div className="relative size-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-50/50 to-blue-100/40 dark:from-slate-700 dark:to-slate-800">
          <div className="absolute top-3 left-3 size-4 rounded-full bg-blue-300 dark:bg-blue-400" />
          <svg
            viewBox="0 0 100 60"
            className="absolute bottom-0 inset-x-0 w-full text-blue-200 dark:text-blue-500/40"
            fill="currentColor"
          >
            <path d="M0 60 L35 25 L65 50 L85 35 L100 60 Z" />
          </svg>
        </div>
      </div>

      {/* Right Back Card */}
      <div
        className={`absolute h-24 w-20 rounded-xl border border-blue-200/70 bg-white/95 p-1.5 shadow-sm transition-all duration-300 dark:border-white/20 dark:bg-slate-800 ${
          isHoveredOrActive
            ? "translate-x-8 -translate-y-1 rotate-12 opacity-85 scale-95"
            : "translate-x-2 rotate-0 opacity-0 scale-75"
        }`}
      >
        <div className="relative size-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-50/50 to-blue-100/40 dark:from-slate-700 dark:to-slate-800">
          <div className="absolute top-3 right-3 size-4 rounded-full bg-blue-300 dark:bg-blue-400" />
          <svg
            viewBox="0 0 100 60"
            className="absolute bottom-0 inset-x-0 w-full text-blue-200 dark:text-blue-500/40"
            fill="currentColor"
          >
            <path d="M0 60 L25 35 L55 55 L75 25 L100 60 Z" />
          </svg>
        </div>
      </div>

      {/* Center Main Card */}
      <div
        className={`relative z-10 h-26 w-22 rounded-xl border border-blue-100 bg-white p-2 shadow-md transition-all duration-300 dark:border-white/20 dark:bg-slate-800 ${
          isHoveredOrActive
            ? "-translate-y-1 shadow-[0_14px_28px_-6px_rgba(37,99,235,0.25)]"
            : "shadow-sm"
        }`}
      >
        <div className="relative size-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-50/40 via-sky-50/30 to-blue-100/30 dark:from-slate-700 dark:to-slate-800">
          {/* Blue Sun */}
          <div className="absolute top-3.5 left-4 size-5 rounded-full bg-[#0070f3] shadow-[0_0_10px_rgba(0,112,243,0.35)]" />
          {/* Blue Mountain */}
          <svg viewBox="0 0 100 65" className="absolute bottom-0 inset-x-0 w-full" fill="none">
            <path
              d="M0 65 L42 26 L74 54 L88 40 L100 65 Z"
              fill="url(#center-card-mountain-gradient)"
            />
            <defs>
              <linearGradient
                id="center-card-mountain-gradient"
                x1="0"
                y1="26"
                x2="100"
                y2="65"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

export function UploadZone({ onFileAccepted, onError, disabled = false }: UploadZoneProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const isHighlighted = isDragActive || isHovered;

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-2xl sm:rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070f3] ${
          isDragReject
            ? "border-red-400 bg-red-50/50 dark:border-red-500/60 dark:bg-red-950/20"
            : isHighlighted
              ? "border-[#0070f3] bg-[#eff6ff] dark:border-[#4c97ff] dark:bg-[#1e293b]/80 shadow-[0_0_28px_rgba(0,112,243,0.15)]"
              : "border-[#c7d8ea] bg-white hover:border-[#0070f3] hover:bg-[#f8faff] dark:border-white/20 dark:bg-black/60 dark:hover:border-[#4c97ff] dark:hover:bg-black/80"
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
      >
        <input {...getInputProps()} />

        {/* Fanned Cards Graphic matching provided reference */}
        <FannedCardsGraphic isHoveredOrActive={isHighlighted} />

        {/* Main Instruction Text matching design */}
        <p className="mt-5 text-base sm:text-lg font-medium text-[#1e293b] dark:text-white transition-colors">
          Drop your image here, or{" "}
          <span className="text-[#0070f3] dark:text-[#4c97ff] font-medium hover:underline">
            browse
          </span>
        </p>

        {/* Supports Text matching design */}
        <p className="mt-1.5 text-xs sm:text-sm text-[#64748b] dark:text-white/60">
          Supports: JPG, JPEG2000, PNG
        </p>
      </div>
    </div>
  );
}
