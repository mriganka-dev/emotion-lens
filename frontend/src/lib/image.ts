import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_DIMENSION,
  MAX_INPUT_FILE_SIZE,
  SERVER_MAX_UPLOAD_SIZE,
} from "@/lib/constants";

export function validateFile(file: File): string | null {
  const isAccepted = (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type);
  if (!isAccepted) {
    return "Please choose a JPEG, PNG or WebP image.";
  }

  if (file.size > MAX_INPUT_FILE_SIZE) {
    return "This file is too large. Please choose a smaller photo.";
  }

  return null;
}

export async function prepareImage(file: File): Promise<File> {
  if (typeof window === "undefined" || typeof createImageBitmap === "undefined") {
    return file;
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    return file;
  }

  const { width: origWidth, height: origHeight } = bitmap;
  const longestSide = Math.max(origWidth, origHeight);

  if (file.size <= SERVER_MAX_UPLOAD_SIZE && longestSide <= MAX_IMAGE_DIMENSION) {
    bitmap.close?.();
    return file;
  }

  let targetWidth = origWidth;
  let targetHeight = origHeight;
  if (longestSide > MAX_IMAGE_DIMENSION) {
    const scale = MAX_IMAGE_DIMENSION / longestSide;
    targetWidth = Math.max(1, Math.round(origWidth * scale));
    targetHeight = Math.max(1, Math.round(origHeight * scale));
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    bitmap.close?.();
    return file;
  }

  // Fill canvas with white first so transparent PNGs do not turn black
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
  bitmap.close?.();

  const toBlob = (quality: number): Promise<Blob | null> =>
    new Promise((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", quality);
    });

  let quality = 0.9;
  let blob = await toBlob(quality);

  while (blob && blob.size > SERVER_MAX_UPLOAD_SIZE && quality > 0.3) {
    quality -= 0.15;
    blob = await toBlob(quality);
  }

  if (!blob) {
    return file;
  }

  const baseName = file.name.replace(/\.[^/.]+$/, "");
  return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
}
