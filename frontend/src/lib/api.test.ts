import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { analyzeImage, getHealth } from "@/lib/api";
import type { PredictResponse } from "@/types/api";

const mockPredictResponse: PredictResponse = {
  image_width: 512,
  image_height: 512,
  faces: [
    {
      id: 0,
      box: { x: 100, y: 100, width: 80, height: 80 },
      emotion: "Happy",
      confidence: 0.85,
      low_confidence: false,
      scores: [
        { label: "Happy", score: 0.85 },
        { label: "Neutral", score: 0.1 },
      ],
    },
  ],
  used_whole_image: false,
  message: null,
  processing_ms: 120.5,
};

describe("lib/api", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("handles a successful analyzeImage response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockPredictResponse,
      }),
    );

    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    const result = await analyzeImage(file);
    expect(result).toEqual(mockPredictResponse);
  });

  it("handles a successful getHealth response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          status: "ok",
          model_loaded: true,
          labels: ["Happy", "Sad"],
        }),
      }),
    );

    const health = await getHealth();
    expect(health.status).toBe("ok");
    expect(health.model_loaded).toBe(true);
  });

  it.each([
    [400, "That file could not be read as an image. Try a different photo."],
    [413, "This photo is too large. Please use one under 8 MB."],
    [415, "This file type is not supported. Please use a JPEG, PNG or WebP image."],
    [503, "The analysis server is starting up. Please try again in a few seconds."],
    [500, "Something went wrong. Please try again."],
  ])("maps status %i to '%s'", async (status, expectedMessage) => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status,
        json: async () => ({ detail: "Error" }),
      }),
    );

    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    await expect(analyzeImage(file)).rejects.toThrow(expectedMessage);
  });

  it("maps network connection failures", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("Failed to fetch")));

    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    await expect(analyzeImage(file)).rejects.toThrow(
      "Could not reach the server. Check your connection and try again.",
    );
  });

  it("maps timeout failures", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((_url, options) => {
        return new Promise((_, reject) => {
          options?.signal?.addEventListener("abort", () => {
            const err = new DOMException("The operation was aborted.", "AbortError");
            reject(err);
          });
        });
      }),
    );

    vi.useFakeTimers();
    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    const promise = analyzeImage(file);
    vi.advanceTimersByTime(31000);
    await expect(promise).rejects.toThrow("The analysis took too long. Please try again.");
    vi.useRealTimers();
  });

  it("rejects malformed responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ unexpected: "payload" }),
      }),
    );

    const file = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    await expect(analyzeImage(file)).rejects.toThrow("Something went wrong. Please try again.");
  });
});
