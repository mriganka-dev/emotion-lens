import { ScanFace } from "lucide-react";
import { Link } from "react-router";

export function Logo() {
  return (
    <Link
      to="/"
      className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label="Emotion Lens home"
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
        <ScanFace className="size-5" />
      </span>
      <span className="text-base font-semibold tracking-tight text-foreground">Emotion Lens</span>
    </Link>
  );
}
