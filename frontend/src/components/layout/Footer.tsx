import { Link } from "react-router";
import { Camera, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border/60 bg-muted/30 pt-12 pb-8 text-sm text-muted-foreground overflow-hidden">
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Brand & Manifesto */}
          <div className="space-y-6 lg:col-span-7">
            <div className="flex items-center gap-2.5 text-foreground font-bold text-lg">
              <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Camera className="size-4" />
              </span>
              <span>Emotion Lens</span>
            </div>

            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              A private, real-time facial affect studio. Built with ethical machine perception
              principles, multi-face spatial tracking, and zero persistent storage.
            </p>

            {/* Quick Links Matrix */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 pt-2 font-medium text-xs">
              <div className="space-y-2">
                <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                  Studio
                </p>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="/#studio"
                      className="inline-flex min-h-[36px] items-center hover:text-foreground transition-colors"
                    >
                      Live Analyzer
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#chapters"
                      className="inline-flex min-h-[36px] items-center hover:text-foreground transition-colors"
                    >
                      Curriculum
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#pipeline"
                      className="inline-flex min-h-[36px] items-center hover:text-foreground transition-colors"
                    >
                      Pipeline
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                  Principles
                </p>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/about"
                      className="inline-flex min-h-[36px] items-center hover:text-foreground transition-colors"
                    >
                      About Project
                    </Link>
                  </li>
                  <li>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      Zero Storage
                    </span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Ephemeral RAM</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                  Research
                </p>
                <ul className="space-y-1.5">
                  <li>
                    <span className="text-muted-foreground">RAF-DB Weights</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">Haar Multi-Scale</span>
                  </li>
                  <li>
                    <span className="text-muted-foreground">7 Discrete Softmax</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: The Sunflower Art Postcard */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs overflow-hidden rounded-3xl border border-border/80 bg-card p-3 shadow-xl backdrop-blur-md">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-muted">
                <img
                  src="/sunflower-card.jpg"
                  alt="Sunflowers in summer meadow"
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                  <p className="text-xs font-bold leading-tight drop-shadow-sm">
                    Rooted in human dignity and privacy.
                  </p>
                  <p className="text-[10px] text-white/80 font-mono">
                    STATISTICS TRANSIENT // ZERO TRACKING
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs sm:flex-row">
          <p className="text-center sm:text-left">
            Photos are evaluated in volatile heap memory and never stored on disk.
          </p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WCAG AA Certified</span>
            </span>
            <Link
              to="/about"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              System Docs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
