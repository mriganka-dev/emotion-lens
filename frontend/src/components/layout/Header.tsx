import { NavLink, useLocation } from "react-router";
import { Camera } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  const location = useLocation();

  const handleScrollToStudio = () => {
    if (location.pathname === "/") {
      const el = document.getElementById("studio");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-[1152px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Center Navigation Pill */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1 rounded-full border border-border/70 bg-secondary/50 px-3 py-1 shadow-xs backdrop-blur-sm"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            Studio
          </NavLink>
          <a
            href="/#chapters"
            className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Curriculum
          </a>
          <a
            href="/#pipeline"
            className="inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Pipeline
          </a>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            About
          </NavLink>
        </nav>

        {/* Right Action & Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={handleScrollToStudio}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background shadow-xs transition-transform hover:opacity-90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Camera className="size-3.5" />
            <span className="hidden xs:inline">Analyze Photo</span>
            <span className="xs:hidden">Analyze</span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
