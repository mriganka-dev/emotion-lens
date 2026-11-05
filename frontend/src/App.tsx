import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useWarmBackend } from "@/hooks/useWarmBackend";
import { EMOTIONS } from "@/lib/emotions";
import { formatPercent } from "@/lib/format";

const queryClient = new QueryClient();

function HomePagePreview() {
  const isOnline = useOnlineStatus();
  useWarmBackend();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Upload a photo. See the emotion.
        </h1>
        <p className="mt-2 text-base text-muted-foreground sm:text-lg">
          Emotion Lens reads the facial expression of each person in a photo and shows what it
          finds.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Network status: {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <h2 className="text-lg font-medium">Design Tokens and Surface Radii</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Cards use 16px radius, buttons 12px, and pills full rounding.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Pill Badge
            </span>
          </div>
          <div className="mt-6">
            <Tabs defaultValue="face-1">
              <TabsList>
                <TabsTrigger value="face-1">Face 1</TabsTrigger>
                <TabsTrigger value="face-2">Face 2</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="mt-6 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
          <h2 className="text-lg font-medium">Emotion Tokens</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Seven muted emotion palettes with soft tinted background variants.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {EMOTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl border p-2.5"
                  style={{
                    backgroundColor: item.bgVar,
                    borderColor: item.colorVar,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4" style={{ color: item.colorVar }} />
                    <span className="text-xs font-medium" style={{ color: item.colorVar }}>
                      {item.label}
                    </span>
                  </div>
                  <span
                    className="tabular-numbers text-xs font-semibold"
                    style={{ color: item.colorVar }}
                  >
                    {formatPercent(0.98)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPagePreview() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">About Emotion Lens</h1>
      <p className="text-muted-foreground">
        A facial expression is not the same as a feeling, and the result can be wrong.
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
              <Route path="/" element={<HomePagePreview />} />
              <Route path="/about" element={<AboutPagePreview />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
