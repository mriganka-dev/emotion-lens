import { describe, expect, it } from "vitest";
import { EMOTIONS, EMOTIONS_BY_LABEL } from "@/lib/emotions";
import type { EmotionLabel } from "@/types/api";

const EXPECTED_LABELS: EmotionLabel[] = [
  "Surprise",
  "Fear",
  "Disgust",
  "Happy",
  "Sad",
  "Angry",
  "Neutral",
];

describe("lib/emotions", () => {
  it("contains exactly the seven required emotions", () => {
    expect(EMOTIONS).toHaveLength(7);
  });

  it.each(EXPECTED_LABELS)("configures an icon, color token, and description for '%s'", (label) => {
    const meta = EMOTIONS_BY_LABEL[label];
    expect(meta).toBeDefined();
    expect(meta.label).toBe(label);
    expect(meta.icon).toBeDefined();
    expect(meta.colorVar).toMatch(/^var\(--emotion-[a-z]+\)$/);
    expect(meta.bgVar).toMatch(/^var\(--emotion-[a-z]+-bg\)$/);
    expect(meta.description.trim().length).toBeGreaterThan(0);
  });
});
