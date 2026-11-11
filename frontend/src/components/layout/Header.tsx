import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ScanFace } from "lucide-react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Appear when scrolled past ~70% of the viewport height on home page
      setIsScrolled(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  const shouldShow = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full border-b border-white/10 bg-black/90 text-white backdrop-blur-xl transition-all duration-300 ${
        shouldShow
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-[1400px] items-center justify-between px-4 sm:px-8 lg:px-10">
        {/* Left Section: Mobile Menu Button + Brand Logo + Monospace Navigation */}
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex size-10 shrink-0 items-center justify-center rounded-md border border-white/20 bg-black/60 backdrop-blur-md focus-visible:outline-2 focus-visible:outline-[#4c97ff]"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute inset-x-0 top-1/2 h-[1px] bg-white transition-transform duration-200 ${
                  mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-[1px] bg-white transition-opacity duration-200 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-[1px] bg-white transition-transform duration-200 ${
                  mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </span>
          </button>

          {/* Biometric Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none"
            aria-label="Emotion Lens home"
          >
            <span className="relative flex size-8 items-center justify-center rounded-md border border-[#4c97ff]/40 bg-black text-[#8dd8ff] transition-all duration-300 group-hover:border-[#8dd8ff] group-hover:shadow-[0_0_12px_rgba(76,151,255,0.35)]">
              <ScanFace className="size-4.5" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-white uppercase group-hover:text-white/90">
              Emotion Lens
            </span>
          </Link>

          {/* Desktop Monospace Navigation Links */}
          <nav aria-label="Main navigation" className="hidden md:block">
            <ul className="flex items-center gap-8 lg:gap-10 font-mono text-xs uppercase tracking-wider text-white/70">
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-white ${
                      isActive
                        ? "text-[#8dd8ff] font-semibold after:absolute after:-bottom-1 after:inset-x-0 after:h-[1px] after:bg-[#4c97ff]"
                        : ""
                    }`
                  }
                >
                  Studio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/scan"
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-white ${
                      isActive
                        ? "text-[#8dd8ff] font-semibold after:absolute after:-bottom-1 after:inset-x-0 after:h-[1px] after:bg-[#4c97ff]"
                        : ""
                    }`
                  }
                >
                  Scanner
                </NavLink>
              </li>
              <li>
                <a
                  href="/#pipeline"
                  className="transition-colors hover:text-white"
                >
                  Pipeline
                </a>
              </li>
              <li>
                <a
                  href="/#spectrum"
                  className="transition-colors hover:text-white"
                >
                  Spectrum
                </a>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `relative py-1 transition-colors hover:text-white ${
                      isActive
                        ? "text-[#8dd8ff] font-semibold after:absolute after:-bottom-1 after:inset-x-0 after:h-[1px] after:bg-[#4c97ff]"
                        : ""
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Center Section: Iconic Gradient Chevron Cue */}
        <div className="hidden xl:flex items-center justify-center">
          <Link
            to="/"
            aria-label="Emotion Lens top overview"
            className="transition-transform duration-300 hover:translate-y-0.5 focus-visible:outline-none"
          >
            <svg width="27" height="11" viewBox="0 0 27 11" fill="none">
              <path
                d="M0.64 0L0 1.125L13.55 11L27 1.125L26.36 0H15.03L13.55 1.5L12.07 0H0.64Z"
                fill="url(#header-chevron-gradient)"
              />
              <defs>
                <linearGradient
                  id="header-chevron-gradient"
                  x1="14"
                  y1="0"
                  x2="14"
                  y2="11"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8DD8FF" />
                  <stop offset="0.45" stopColor="#69BEFF" />
                  <stop offset="1" stopColor="#4C97FF" />
                </linearGradient>
              </defs>
            </svg>
          </Link>
        </div>

        {/* Right Section: Signature Gradient Frame Button + Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/scan"
            className="gradient-frame group relative isolate flex h-11 items-center overflow-hidden rounded-md bg-black px-4 sm:px-5 transition-transform duration-200 active:scale-98 focus-visible:outline-2 focus-visible:outline-[#4c97ff] max-sm:h-10 max-sm:px-3"
          >
            {/* Subtle gradient hover wash */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] opacity-0 transition-opacity duration-300 group-hover:opacity-15"
            />

            <ScanFace className="size-4 text-[#8dd8ff] mr-2 max-sm:mr-0 transition-transform duration-300 group-hover:scale-110" />

            <span className="relative z-10 bg-gradient-to-r from-[#8dd8ff] via-[#69beff] to-[#4c97ff] bg-clip-text font-mono text-xs font-semibold tracking-wider text-transparent uppercase max-sm:hidden">
              Start Scanning
            </span>

            {/* Staggered Chevrons Trail (>>>>>) */}
            <svg
              aria-hidden="true"
              viewBox="138 19.5 42 15"
              className="ml-2 z-10 h-3 w-8 sm:w-9 transition-transform duration-300 group-hover:translate-x-1 max-sm:hidden"
            >
              <defs>
                <linearGradient
                  id="header-cta-chevrons"
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="27"
                  x2="204"
                  y2="27"
                >
                  <stop stopColor="#8dd8ff" />
                  <stop offset="0.45" stopColor="#69beff" />
                  <stop offset="1" stopColor="#4c97ff" />
                </linearGradient>
              </defs>
              {[0, 9, 18, 27, 36].map((offset) => (
                <path
                  key={offset}
                  d="M138 34.1444L138.614 34.5L144 26.9725L138.614 19.5L138 19.8556L138 26.1513L138.818 26.9725L138 27.7937L138 34.1444Z"
                  fill="url(#header-cta-chevrons)"
                  transform={`translate(${offset} 0)`}
                />
              ))}
            </svg>
          </Link>

          <ThemeToggle className="inline-flex size-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-md border border-white/20 bg-black/60 text-white/80 transition-all hover:border-[#4c97ff]/60 hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4c97ff]" />
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-b border-white/10 bg-black/95 px-6 py-5 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider text-white/80">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `block py-1 transition-colors hover:text-white ${
                    isActive ? "text-[#8dd8ff] font-semibold" : ""
                  }`
                }
              >
                Studio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/scan"
                className={({ isActive }) =>
                  `block py-1 transition-colors hover:text-white ${
                    isActive ? "text-[#8dd8ff] font-semibold" : ""
                  }`
                }
              >
                Scanner
              </NavLink>
            </li>
            <li>
              <a
                href="/#pipeline"
                className="block py-1 transition-colors hover:text-white"
              >
                Pipeline
              </a>
            </li>
            <li>
              <a
                href="/#spectrum"
                className="block py-1 transition-colors hover:text-white"
              >
                Spectrum
              </a>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block py-1 transition-colors hover:text-white ${
                    isActive ? "text-[#8dd8ff] font-semibold" : ""
                  }`
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
