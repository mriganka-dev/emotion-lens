import { m } from "motion/react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

interface Chapter {
  id: string;
  chapterNumber: string;
  title: string;
  emotion: string;
  coverImage: string;
  samplePath: string;
  cue: string;
  description: string;
}

const CHAPTERS: readonly Chapter[] = [
  {
    id: "chapter-1",
    chapterNumber: "Chapter 01",
    title: "The Radiant Smile",
    emotion: "Joy & Warmth",
    coverImage: "/chapter-1.jpg",
    samplePath: "/samples/joy-elena.jpg",
    cue: "Duchenne eye-corner crinkle and cheek lift",
    description:
      "A genuine smile contracts both the mouth corners and the orbicularis oculi muscles around the eyes simultaneously.",
  },
  {
    id: "chapter-2",
    chapterNumber: "Chapter 02",
    title: "The Sudden Wonder",
    emotion: "Surprise & Alertness",
    coverImage: "/chapter-2.jpg",
    samplePath: "/samples/surprise-marcus.jpg",
    cue: "Widened eye aperture and raised brow arches",
    description:
      "The briefest universal emotion: elevated eyebrows expand the field of vision to process rapid, unexpected environmental changes.",
  },
  {
    id: "chapter-3",
    chapterNumber: "Chapter 03",
    title: "The Silent Poise",
    emotion: "Calm & Composure",
    coverImage: "/chapter-3.jpg",
    samplePath: "/samples/calm-sofia.jpg",
    cue: "Relaxed facial baseline and steady gaze",
    description:
      "Balanced muscle tone provides the resting baseline against which all active emotional variances and deviations are computed.",
  },
  {
    id: "chapter-4",
    chapterNumber: "Chapter 04",
    title: "The Candid Energy",
    emotion: "Multi-Face Candids",
    coverImage: "/chapter-4.jpg",
    samplePath: "/samples/smile-lucas.jpg",
    cue: "Simultaneous multi-subject geometric tracking",
    description:
      "Isolates multiple faces within a single photographic frame, analyzing individual confidence curves independently.",
  },
];

interface ChapterCardsProps {
  onSelectSample?: (path: string) => void;
}

export function ChapterCards({ onSelectSample }: ChapterCardsProps) {
  const handleSelect = (samplePath: string) => {
    if (onSelectSample) {
      onSelectSample(samplePath);
      const el = document.getElementById("studio");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="chapters" className="relative w-full py-12 sm:py-20 scroll-mt-16 bg-muted/20">
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <BookOpen className="size-3.5" />
            <span>The Affective Curriculum</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
            Learn how faces express emotion.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed text-balance">
            Explore the four fundamental expressive chapters. Each volume breaks down real optical
            cues and can be loaded directly into the studio.
          </p>
        </div>

        {/* 4 Chapter Cards Grid (2x2 on desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {CHAPTERS.map((chapter) => (
            <m.div
              key={chapter.id}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs transition-shadow hover:shadow-xl"
            >
              {/* Illustrated Manga / Art Cover */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-muted">
                <img
                  src={chapter.coverImage}
                  alt={chapter.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle vignette and tag */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                  aria-hidden="true"
                />

                <span className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-mono font-medium text-white backdrop-blur-md">
                  {chapter.chapterNumber}
                </span>

                <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur-xs">
                  {chapter.emotion}
                </span>
              </div>

              {/* Card Meta & Action */}
              <div className="mt-5 flex flex-1 flex-col justify-between space-y-4 px-1">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {chapter.title}
                  </h3>
                  <p className="text-xs font-semibold text-primary">{chapter.cue}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {chapter.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(chapter.samplePath)}
                  className="inline-flex min-h-[44px] items-center justify-between rounded-xl border border-border/80 bg-secondary/50 px-4 py-2.5 text-xs font-semibold text-foreground transition-all group-hover:border-primary/60 group-hover:bg-primary group-hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="size-3.5" />
                    <span>Analyze This Chapter</span>
                  </span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
