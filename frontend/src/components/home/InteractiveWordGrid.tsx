import { useState } from "react";
import { Sparkles, Trophy } from "lucide-react";

interface WordLocation {
  word: string;
  label: string;
  color: string;
  coords: readonly [number, number][]; // [row, col]
}

const WORDS: readonly WordLocation[] = [
  {
    word: "JOY",
    label: "Joy",
    color: "bg-emerald-700 text-white font-semibold",
    coords: [
      [1, 2],
      [1, 3],
      [1, 4],
    ],
  },
  {
    word: "HAPPY",
    label: "Happy",
    color: "bg-amber-700 text-white font-semibold",
    coords: [
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
    ],
  },
  {
    word: "CALM",
    label: "Calm",
    color: "bg-sky-700 text-white font-semibold",
    coords: [
      [5, 4],
      [5, 5],
      [5, 6],
      [5, 7],
    ],
  },
  {
    word: "SMILE",
    label: "Smile",
    color: "bg-rose-700 text-white font-semibold",
    coords: [
      [2, 7],
      [3, 7],
      [4, 7],
      [5, 7],
      [6, 7],
    ],
  },
  {
    word: "SURPRISE",
    label: "Surprise",
    color: "bg-violet-700 text-white font-semibold",
    coords: [
      [7, 1],
      [7, 2],
      [7, 3],
      [7, 4],
      [7, 5],
      [7, 6],
      [7, 7],
      [7, 8],
    ],
  },
  {
    word: "LENS",
    label: "Lens",
    color: "bg-indigo-700 text-white font-semibold",
    coords: [
      [0, 8],
      [1, 8],
      [2, 8],
      [3, 8],
    ],
  },
  {
    word: "AFFECT",
    label: "Affect",
    color: "bg-teal-700 text-white font-semibold",
    coords: [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5],
    ],
  },
];

// 8 rows x 12 columns matrix
const GRID_LETTERS: readonly string[][] = [
  ["O", "P", "T", "I", "C", "A", "L", "B", "L", "M", "E", "S"],
  ["N", "E", "J", "O", "Y", "Q", "R", "W", "E", "K", "L", "T"],
  ["C", "A", "M", "E", "R", "A", "P", "S", "N", "U", "D", "I"],
  ["U", "H", "A", "P", "P", "Y", "O", "M", "S", "P", "E", "C"],
  ["A", "F", "F", "E", "C", "T", "O", "I", "R", "A", "M", "S"],
  ["V", "I", "S", "I", "C", "A", "L", "M", "C", "O", "D", "E"],
  ["Z", "U", "N", "I", "T", "E", "D", "E", "P", "T", "H", "S"],
  ["N", "S", "U", "R", "P", "R", "I", "S", "E", "G", "R", "D"],
];

export function InteractiveWordGrid() {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [foundWords, setFoundWords] = useState<string[]>(["JOY", "HAPPY"]);

  const toggleWord = (word: string) => {
    if (foundWords.includes(word)) {
      setFoundWords(foundWords.filter((w) => w !== word));
    } else {
      setFoundWords([...foundWords, word]);
    }
  };

  const isCellHighlighted = (row: number, col: number) => {
    for (const w of WORDS) {
      if (foundWords.includes(w.word) || activeWord === w.word) {
        if (w.coords.some(([r, c]) => r === row && c === col)) {
          return w.color;
        }
      }
    }
    return null;
  };

  return (
    <section aria-label="Interactive emotion word search" className="w-full py-12 sm:py-16">
      <div className="mx-auto max-w-[1152px] px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3" />
            <span>Interactive Word Finder</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
            Discover the Vocabulary of Facial Affect
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-balance">
            Hover over or tap words in the bank below to illuminate their coordinates across the
            optical matrix.
          </p>
        </div>

        {/* Word Grid Matrix Box */}
        <div className="mx-auto max-w-xl overflow-hidden rounded-3xl border border-border/80 bg-card p-4 sm:p-6 shadow-lg">
          <div className="grid grid-cols-12 gap-1 sm:gap-2 text-center font-mono text-xs sm:text-sm font-semibold select-none">
            {GRID_LETTERS.map((row, rIdx) =>
              row.map((letter, cIdx) => {
                const highlightClass = isCellHighlighted(rIdx, cIdx);
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`flex aspect-square items-center justify-center rounded-lg transition-all duration-200 ${
                      highlightClass
                        ? `${highlightClass} shadow-xs scale-105 font-bold`
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                  >
                    {letter}
                  </div>
                );
              }),
            )}
          </div>
        </div>

        {/* Word Bank Chips */}
        <div className="space-y-3 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Vocabulary Bank</span>
            <span className="flex items-center gap-1 font-mono text-foreground font-semibold">
              <Trophy className="size-3 text-amber-500" />
              {foundWords.length} of {WORDS.length} Revealed
            </span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {WORDS.map((w) => {
              const isFound = foundWords.includes(w.word);
              return (
                <button
                  key={w.word}
                  type="button"
                  onClick={() => toggleWord(w.word)}
                  onMouseEnter={() => setActiveWord(w.word)}
                  onMouseLeave={() => setActiveWord(null)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isFound
                      ? `${w.color} border-transparent shadow-xs`
                      : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <span>{w.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
