import { AlertCircle, Info, UserX, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-3.5 py-2 text-xs text-muted-foreground"
        role="status"
      >
        <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span>{message}</span>
      </div>
    );
  }

  const renderIcon = () => {
    switch (variant) {
      case "error":
        return <AlertCircle className="size-6 text-destructive" />;
      case "offline":
        return <WifiOff className="size-6 text-muted-foreground" />;
      case "no_face":
      default:
        return <UserX className="size-6 text-muted-foreground" />;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center shadow-xs"
      role="alert"
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted/80">
        {renderIcon()}
      </div>

      {title && (
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      )}

      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">{message}</p>

      {(onRetry || onChooseAnother) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onRetry && <Button onClick={onRetry}>Try again</Button>}
          {onChooseAnother && (
            <Button variant={onRetry ? "outline" : "default"} onClick={onChooseAnother}>
              Choose another photo
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
