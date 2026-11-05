import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { analyzeImage, type ApiError } from "@/lib/api";
import { prepareImage } from "@/lib/image";
import type { PredictResponse } from "@/types/api";

export type AnalyzeStatus = "idle" | "analyzing" | "success" | "error";

export interface UseAnalyzeImageReturn {
  analyze: (file: File) => void;
  reset: () => void;
  status: AnalyzeStatus;
  result: PredictResponse | null;
  error: ApiError | null;
}

export function useAnalyzeImage(): UseAnalyzeImageReturn {
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation<PredictResponse, ApiError, File>({
    mutationFn: async (file: File) => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const preparedFile = await prepareImage(file);
      if (controller.signal.aborted) {
        throw new DOMException("The user aborted a request.", "AbortError");
      }

      return await analyzeImage(preparedFile, controller.signal);
    },
    retry: false,
  });

  const analyze = useCallback(
    (file: File) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      mutation.mutate(file);
    },
    [mutation],
  );

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    mutation.reset();
  }, [mutation]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const isAbort = mutation.error && (mutation.error as Error).name === "AbortError";

  let status: AnalyzeStatus = "idle";
  if (mutation.isPending) {
    status = "analyzing";
  } else if (mutation.isSuccess) {
    status = "success";
  } else if (mutation.isError && !isAbort) {
    status = "error";
  }

  return {
    analyze,
    reset,
    status,
    result: mutation.data ?? null,
    error: isAbort ? null : (mutation.error ?? null),
  };
}
