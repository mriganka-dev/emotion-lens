import type * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Analyzer } from "@/components/analyzer/Analyzer";
import * as api from "@/lib/api";
import type { PredictResponse } from "@/types/api";

vi.mock("@/lib/api", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/api")>();
  return {
    ...actual,
    analyzeImage: vi.fn(),
    getHealth: vi.fn(),
  };
});

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockSuccessResponse: PredictResponse = {
  image_width: 512,
  image_height: 512,
  faces: [
    {
      id: 0,
      box: { x: 100, y: 100, width: 80, height: 80 },
      emotion: "Happy",
      confidence: 0.82,
      low_confidence: false,
      scores: [
        { label: "Happy", score: 0.82 },
        { label: "Neutral", score: 0.18 },
        { label: "Surprise", score: 0.0 },
        { label: "Sad", score: 0.0 },
        { label: "Fear", score: 0.0 },
        { label: "Disgust", score: 0.0 },
        { label: "Angry", score: 0.0 },
      ],
    },
  ],
  used_whole_image: false,
  message: null,
  processing_ms: 120,
};

const mockNoFaceResponse: PredictResponse = {
  image_width: 512,
  image_height: 512,
  faces: [],
  used_whole_image: false,
  message: "No face found",
  processing_ms: 80,
};

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

describe("Analyzer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("choosing a valid file shows a result", async () => {
    vi.mocked(api.analyzeImage).mockResolvedValue(mockSuccessResponse);

    const { container } = renderWithClient(<Analyzer />);
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const validFile = new File(["fake image content"], "portrait.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    await waitFor(() => {
      expect(api.analyzeImage).toHaveBeenCalled();
    });

    expect(
      await screen.findByRole("heading", { name: "Happy" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Emotion breakdown")).toBeInTheDocument();
    expect(screen.getAllByText("82%").length).toBeGreaterThanOrEqual(1);
  });

  it("a response with no faces shows 'No face found'", async () => {
    vi.mocked(api.analyzeImage).mockResolvedValue(mockNoFaceResponse);

    const { container } = renderWithClient(<Analyzer />);
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const validFile = new File(["fake landscape content"], "scenery.jpg", {
      type: "image/jpeg",
    });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    expect(await screen.findByText("No face found")).toBeInTheDocument();
    expect(
      screen.getByText("Try a clear, front-facing photo with good lighting."),
    ).toBeInTheDocument();
  });

  it("an API error shows the error message and a 'Try again' button", async () => {
    const errorMsg =
      "The analysis server is starting up. Please try again in a few seconds.";
    vi.mocked(api.analyzeImage).mockRejectedValue(
      new api.ApiError(503, errorMsg),
    );

    const { container } = renderWithClient(<Analyzer />);
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const validFile = new File(["fake content"], "photo.png", {
      type: "image/png",
    });

    fireEvent.change(fileInput, { target: { files: [validFile] } });

    expect(await screen.findByText("Analysis failed")).toBeInTheDocument();
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  it("a wrong file type shows the file type message and sends no request", async () => {
    const { container } = renderWithClient(<Analyzer />);
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    const wrongFile = new File(["document text"], "document.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(fileInput, { target: { files: [wrongFile] } });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please choose a JPEG, PNG or WebP image.",
      );
    });
    expect(api.analyzeImage).not.toHaveBeenCalled();
  });
});
