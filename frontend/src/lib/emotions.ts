import type { LucideIcon } from "lucide-react";
import { Angry, Annoyed, Frown, Meh, Smile, TriangleAlert, Zap } from "lucide-react";
import type { EmotionLabel } from "@/types/api";

export interface EmotionMeta {
  label: EmotionLabel;
  icon: LucideIcon;
  colorVar: string;
  bgVar: string;
  description: string;
}

export const EMOTIONS: readonly EmotionMeta[] = [
  {
    label: "Happy",
    icon: Smile,
    colorVar: "var(--emotion-happy)",
    bgVar: "var(--emotion-happy-bg)",
    description: "Shows joy, contentment, or positive excitement.",
  },
  {
    label: "Sad",
    icon: Frown,
    colorVar: "var(--emotion-sad)",
    bgVar: "var(--emotion-sad-bg)",
    description: "Shows sorrow, disappointment, or feeling down.",
  },
  {
    label: "Angry",
    icon: Angry,
    colorVar: "var(--emotion-angry)",
    bgVar: "var(--emotion-angry-bg)",
    description: "Shows irritation, hostility, or sharp frustration.",
  },
  {
    label: "Neutral",
    icon: Meh,
    colorVar: "var(--emotion-neutral)",
    bgVar: "var(--emotion-neutral-bg)",
    description: "Shows a calm, restful expression with no strong emotion.",
  },
  {
    label: "Disgust",
    icon: Annoyed,
    colorVar: "var(--emotion-disgust)",
    bgVar: "var(--emotion-disgust-bg)",
    description: "Shows distaste, strong disapproval, or aversion.",
  },
  {
    label: "Surprise",
    icon: Zap,
    colorVar: "var(--emotion-surprise)",
    bgVar: "var(--emotion-surprise-bg)",
    description: "Shows sudden wonder, disbelief, or an unexpected reaction.",
  },
  {
    label: "Fear",
    icon: TriangleAlert,
    colorVar: "var(--emotion-fear)",
    bgVar: "var(--emotion-fear-bg)",
    description: "Shows anxiety, apprehension, or feeling startled.",
  },
];

export const EMOTIONS_BY_LABEL: Record<EmotionLabel, EmotionMeta> = EMOTIONS.reduce(
  (acc, item) => {
    acc[item.label] = item;
    return acc;
  },
  {} as Record<EmotionLabel, EmotionMeta>,
);
