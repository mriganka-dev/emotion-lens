import { API_URL, REQUEST_TIMEOUT_MS } from "@/lib/constants";
import type { HealthResponse, PredictResponse } from "@/types/api";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getErrorMessageForStatus(status: number): string {
  switch (status) {
    case 400:
      return "That file could not be read as an image. Try a different photo.";
    case 413:
      return "This photo is too large. Please use one under 8 MB.";
    case 415:
      return "This file type is not supported. Please use a JPEG, PNG or WebP image.";
    case 503:
      return "The analysis server is starting up. Please try again in a few seconds.";
    default:
      return "Something went wrong. Please try again.";
  }
}

function isPredictResponse(data: unknown): data is PredictResponse {
  if (!data || typeof data !== "object") {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.image_width === "number" &&
    typeof candidate.image_height === "number" &&
    Array.isArray(candidate.faces) &&
    typeof candidate.used_whole_image === "boolean" &&
    typeof candidate.processing_ms === "number"
  );
}

function isHealthResponse(data: unknown): data is HealthResponse {
  if (!data || typeof data !== "object") {
    return false;
  }
  const candidate = data as Record<string, unknown>;
  return (
    typeof candidate.status === "string" &&
    typeof candidate.model_loaded === "boolean" &&
    Array.isArray(candidate.labels)
  );
}

async function executeWithTimeout<T>(
  requestFn: (signal: AbortSignal) => Promise<T>,
  callerSignal?: AbortSignal,
): Promise<T> {
  if (callerSignal?.aborted) {
    throw new DOMException("The user aborted a request.", "AbortError");
  }

  const controller = new AbortController();
  let timedOut = false;

  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  const onCallerAbort = () => {
    controller.abort();
  };

  if (callerSignal) {
    callerSignal.addEventListener("abort", onCallerAbort, { once: true });
  }

  try {
    return await requestFn(controller.signal);
  } catch (err) {
    if (callerSignal?.aborted) {
      throw new DOMException("The user aborted a request.", "AbortError");
    }
    if (timedOut) {
      throw new ApiError(408, "The analysis took too long. Please try again.");
    }
    if (err instanceof ApiError) {
      throw err;
    }
    throw new ApiError(0, "Could not reach the server. Check your connection and try again.");
  } finally {
    clearTimeout(timeoutId);
    if (callerSignal) {
      callerSignal.removeEventListener("abort", onCallerAbort);
    }
  }
}

export async function getHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return executeWithTimeout(async (requestSignal) => {
    const response = await fetch(`${API_URL}/health`, {
      method: "GET",
      signal: requestSignal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, getErrorMessageForStatus(response.status));
    }

    const data: unknown = await response.json();
    if (!isHealthResponse(data)) {
      throw new ApiError(500, "Something went wrong. Please try again.");
    }

    return data;
  }, signal);
}

export async function analyzeImage(file: File, signal?: AbortSignal): Promise<PredictResponse> {
  return executeWithTimeout(async (requestSignal) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
      signal: requestSignal,
    });

    if (!response.ok) {
      throw new ApiError(response.status, getErrorMessageForStatus(response.status));
    }

    const data: unknown = await response.json();
    if (!isPredictResponse(data)) {
      throw new ApiError(500, "Something went wrong. Please try again.");
    }

    return data;
  }, signal);
}
