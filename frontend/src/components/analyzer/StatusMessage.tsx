import { AlertCircle, Info, UserX, WifiOff } from "lucide-react";

interface StatusMessageProps {
  variant: "error" | "no_face" | "offline" | "info_banner";
  title?: string;
  message: string;
  onRetry?: () => void;
  onChooseAnother?: () => void;
}

export function StatusMessage({
  variant,
  title,
  message,
  onRetry,
  onChooseAnother,
}: StatusMessageProps) {
  if (variant === "info_banner") {
    return (
      <div
        className="flex items-center gap-2.5 rounded-lg border border-[#4c97ff]/30 bg-[#4c97ff]/10 px-4 py-2.5 font-mono text-xs text-[#8dd8ff] break-words"
        role="status"
      >
        <Info className="size-4 shrink-0 text-[#8dd8ff]" aria-hidden="true" />
        <span className="leading-normal">{message}</span>
      </div>
    );
  }

  const renderIcon = () => {
    switch (variant) {
      case "error":
        return <AlertCircle className="size-6 text-red-400" />;
      case "offline":
        return <WifiOff className="size-6 text-white/50" />;
      case "no_face":
      default:
        return <UserX className="size-6 text-[#8dd8ff]" />;
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-xl border border-white/15 bg-black/85 p-8 text-center shadow-xl backdrop-blur-xl"
      role="alert"
    >
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

      <div className="flex size-14 items-center justify-center rounded-xl border border-white/15 bg-black">
        {renderIcon()}
      </div>

      {title && (
        <h3 className="mt-4 font-mono text-base font-semibold tracking-wider text-white uppercase">
          {title}
        </h3>
      )}

      <p className="mt-2 max-w-sm font-mono text-xs text-white/60 leading-relaxed break-words">
        {message}
      </p>

      {(onRetry || onChooseAnother) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#4c97ff]/50 bg-[#4c97ff]/15 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#8dd8ff] transition-all hover:bg-[#4c97ff]/25 active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff]"
            >
              Try again
            </button>
          )}
          {onChooseAnother && (
            <button
              type="button"
              onClick={onChooseAnother}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-white/20 bg-black/80 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-white/80 transition-all hover:border-[#4c97ff]/60 hover:text-white active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff]"
            >
              Choose another photo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
