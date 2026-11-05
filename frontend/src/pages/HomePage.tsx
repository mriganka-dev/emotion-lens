import { ScanFace, Smile, Upload } from "lucide-react";
import { Analyzer } from "@/components/analyzer/Analyzer";

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <section className="space-y-3 text-center sm:text-left">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Upload a photo. See the emotion.
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          Emotion Lens reads the facial expression of each person in a photo and shows what it
          finds.
        </p>
      </section>

      {/* Main Analyzer Flow */}
      <section>
        <Analyzer />
      </section>

      {/* How It Works Hints */}
      <section
        aria-label="How it works"
        className="border-t border-border pt-8 text-muted-foreground"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
              <Upload className="size-4" />
            </span>
            <span className="text-sm font-medium">Choose a photo</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
              <ScanFace className="size-4" />
            </span>
            <span className="text-sm font-medium">Faces are found</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
              <Smile className="size-4" />
            </span>
            <span className="text-sm font-medium">Each expression is shown</span>
          </div>
        </div>
      </section>
    </div>
  );
}
