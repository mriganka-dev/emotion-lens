import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useWarmBackend } from "@/hooks/useWarmBackend";
import HomePage from "@/pages/HomePage";

const AboutPage = lazy(() => import("@/pages/AboutPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function PageFallback() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading page">
      <Skeleton className="h-10 w-56 rounded-xl" />
      <Skeleton className="h-4 w-full max-w-xl rounded-md" />
      <div className="grid gap-6 pt-4 sm:grid-cols-2">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-40 rounded-2xl" />
      </div>
    </div>
  );
}

function RouteTitle() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Emotion Lens";
    } else if (location.pathname === "/about") {
      document.title = "About - Emotion Lens";
    } else {
      document.title = "Page Not Found - Emotion Lens";
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  useWarmBackend();

  return (
    <>
      <RouteTitle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/about"
            element={
              <Suspense fallback={<PageFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
