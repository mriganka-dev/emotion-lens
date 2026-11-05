import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScoreBars } from "@/components/analyzer/ScoreBars";
import type { Score } from "@/types/api";

const mockScores: Score[] = [
  { label: "Happy", score: 0.72 },
  { label: "Surprise", score: 0.12 },
  { label: "Neutral", score: 0.08 },
  { label: "Sad", score: 0.04 },
  { label: "Fear", score: 0.02 },
  { label: "Disgust", score: 0.01 },
  { label: "Angry", score: 0.01 },
];

describe("ScoreBars", () => {
  it("renders seven rows with the right labels and percentages, and marks the top one", () => {
    render(<ScoreBars scores={mockScores} />);

    // Check all labels and percentages
    expect(screen.getByText("Happy")).toBeInTheDocument();
    expect(screen.getByText("72%")).toBeInTheDocument();

    expect(screen.getByText("Surprise")).toBeInTheDocument();
    expect(screen.getByText("12%")).toBeInTheDocument();

    expect(screen.getByText("Neutral")).toBeInTheDocument();
    expect(screen.getByText("8%")).toBeInTheDocument();

    expect(screen.getByText("Sad")).toBeInTheDocument();
    expect(screen.getByText("4%")).toBeInTheDocument();

    expect(screen.getByText("Fear")).toBeInTheDocument();
    expect(screen.getByText("2%")).toBeInTheDocument();

    expect(screen.getByText("Disgust")).toBeInTheDocument();
    expect(screen.getAllByText("1%")).toHaveLength(2);

    expect(screen.getByText("Angry")).toBeInTheDocument();

    // Seven rows present
    const rows = screen.getAllByRole("listitem");
    expect(rows).toHaveLength(7);

    // Top row highlights
    expect(screen.getByText("Happy")).toHaveClass("font-medium");
    expect(screen.getByText("72%")).toHaveClass("font-semibold");
  });
});

