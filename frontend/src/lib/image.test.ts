import { describe, expect, it } from "vitest";
import { prepareImage, validateFile } from "@/lib/image";

describe("lib/image", () => {
  it("rejects unsupported file types", () => {
    const file = new File(["dummy"], "document.pdf", {
      type: "application/pdf",
    });
    expect(validateFile(file)).toBe("Please choose a JPEG, PNG or WebP image.");
  });

  it("rejects files exceeding 25 MB", () => {
    // Mock a large file by mocking the size property
    const file = new File(["dummy"], "large.jpg", { type: "image/jpeg" });
    Object.defineProperty(file, "size", { value: 26 * 1024 * 1024 });

    expect(validateFile(file)).toBe("This file is too large. Please choose a smaller photo.");
  });

  it("accepts valid JPEG, PNG and WebP files under 25 MB", () => {
    const jpg = new File(["dummy"], "photo.jpg", { type: "image/jpeg" });
    const png = new File(["dummy"], "photo.png", { type: "image/png" });
    const webp = new File(["dummy"], "photo.webp", { type: "image/webp" });

    expect(validateFile(jpg)).toBeNull();
    expect(validateFile(png)).toBeNull();
    expect(validateFile(webp)).toBeNull();
  });

  it("returns a small file unchanged", async () => {
    const smallFile = new File(["sample image bytes"], "sample.jpg", {
      type: "image/jpeg",
    });
    const result = await prepareImage(smallFile);
    expect(result).toBe(smallFile);
  });
});
