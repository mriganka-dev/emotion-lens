import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, MotionConfig } from "motion/react";
import { BrowserRouter } from "react-router";
import "@fontsource-variable/inter";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient();
const loadFeatures = () => import("motion/react").then((res) => res.domAnimation);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <MotionConfig reducedMotion="user">
            <LazyMotion features={loadFeatures}>
              <App />
              <Toaster />
            </LazyMotion>
          </MotionConfig>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
