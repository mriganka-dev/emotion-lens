import { Smile } from "lucide-react";
import { EMOTIONS_BY_LABEL } from "@/lib/emotions";
import type { EmotionLabel } from "@/types/api";

interface EmotionIconProps {
  label: EmotionLabel;
  className?: string;
  size?: number;
}

export function EmotionIcon({ label, className = "size-5", size = 20 }: EmotionIconProps) {
  const meta = EMOTIONS_BY_LABEL[label];
  const IconComponent = meta?.icon ?? Smile;

  return <IconComponent size={size} strokeWidth={2} className={className} aria-hidden="true" />;
}
