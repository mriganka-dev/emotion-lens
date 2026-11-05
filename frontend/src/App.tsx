import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Analyzer } from "@/components/analyzer/Analyzer";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient();

function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Upload a photo. See the emotion.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Emotion Lens reads the facial expression of each person in a photo and shows what it
          finds.
        </p>
      </div>

      <Analyzer />
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">About Emotion Lens</h1>
      <p className="text-muted-foreground leading-relaxed">
        A facial expression is not the same as a feeling, and the result can be wrong. Photos are
        analyzed on the server and are not stored.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
