import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 space-y-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          About Emotion Lens
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          How the application processes facial expressions, how the machine learning model
          functions, and the principles guiding its results.
        </p>
      </header>

      {/* How It Works */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Step 1
            </span>
            <h3 className="font-medium text-foreground">Upload</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Select or drop a photo. Images are optimized directly in your browser before sending.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Step 2
            </span>
            <h3 className="font-medium text-foreground">Face detection</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The server locates each individual face in the image and isolates the facial
              boundaries.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Step 3
            </span>
            <h3 className="font-medium text-foreground">Classification</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The neural network evaluates each face crop and produces confidence scores across
              seven emotion expressions.
            </p>
          </div>
        </div>
      </section>

      {/* The Model */}
      <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2.5 text-primary">
          <Sparkles className="size-5" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            The neural network model
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Emotion Lens uses a convolutional neural network trained on the RAF-DB dataset to
          recognize seven expressions: Surprise, Fear, Disgust, Happy, Sad, Angry, and Neutral. Each
          prediction represents the probability distribution produced across these distinct
          expression categories.
        </p>
      </section>

      {/* Tips for Best Results */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Tips for best results
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Front-facing angle</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ensure the subject is facing directly toward the camera.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Good lighting</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Avoid heavy backlighting, deep shadows, or extreme glare.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Unobstructed face</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Keep the eyes, mouth, and eyebrows uncovered by hair or hands.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
            <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">One clear face</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Clear, high-resolution faces yield the most consistent readings.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Privacy */}
      <section className="space-y-3 rounded-2xl border border-border bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2.5 text-primary">
          <ShieldCheck className="size-5" />
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Privacy</h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Photos are analyzed on the server and are not stored. Images exist in system memory solely
          for the brief duration required to compute face coordinates and expression vectors, and
          are never written to disk or persisted to a database.
        </p>
      </section>

      {/* Honest Limits */}
      <section className="space-y-3 rounded-2xl border border-border bg-muted/30 p-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Honest limits</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A facial expression is not the same as a feeling, and the result can be wrong.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Computer vision models evaluate visual surface cues rather than internal mental or
          emotional states. Complex human emotion varies by individual, context, and culture.
        </p>
      </section>
    </article>
  );
}
