import { useEffect } from "react";
import { getHealth } from "@/lib/api";

export function useWarmBackend(): void {
  useEffect(() => {
    const controller = new AbortController();

    getHealth(controller.signal).catch(() => {
      // Intentionally silent: wakes dormant server instances without surfacing UI noise.
    });

    return () => {
      controller.abort();
    };
  }, []);
}

