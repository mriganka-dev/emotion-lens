import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emotions = [
  { name: "Happy", color: "var(--emotion-happy)", bg: "var(--emotion-happy-bg)" },
  { name: "Sad", color: "var(--emotion-sad)", bg: "var(--emotion-sad-bg)" },
  { name: "Angry", color: "var(--emotion-angry)", bg: "var(--emotion-angry-bg)" },
  { name: "Neutral", color: "var(--emotion-neutral)", bg: "var(--emotion-neutral-bg)" },
  { name: "Disgust", color: "var(--emotion-disgust)", bg: "var(--emotion-disgust-bg)" },
  { name: "Surprise", color: "var(--emotion-surprise)", bg: "var(--emotion-surprise-bg)" },
  { name: "Fear", color: "var(--emotion-fear)", bg: "var(--emotion-fear-bg)" },
];

export default function App() {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-150">
      <main className="mx-auto max-w-[1152px] px-4 py-12 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Emotion Lens</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Design system and token verification
            </p>
          </div>
          <Button variant="outline" onClick={toggleTheme}>
            Toggle {isDark ? "Light" : "Dark"} Mode
          </Button>
        </header>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Tokens & Radii Verification */}
          <div className="rounded-2xl border bg-card p-6 shadow-xs">
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

          {/* Emotion Hue Tokens */}
          <div className="rounded-2xl border bg-card p-6 shadow-xs">
            <h2 className="text-lg font-medium">Emotion Tokens</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Seven muted emotion palettes with soft tinted background variants.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {emotions.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl border p-2.5"
                  style={{ backgroundColor: item.bg, borderColor: item.color }}
                >
                  <span className="text-xs font-medium" style={{ color: item.color }}>
                    {item.name}
                  </span>
                  <span
                    className="tabular-numbers text-xs font-semibold"
                    style={{ color: item.color }}
                  >
                    98%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
