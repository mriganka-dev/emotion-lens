import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps = {}) {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={
        className ??
        "inline-flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      }
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      <span className="sr-only">{label}</span>
    </button>
  );
}
