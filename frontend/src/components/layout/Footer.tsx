import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="w-full border-t border-border py-6 text-sm text-muted-foreground">
      <div className="mx-auto flex max-w-[1152px] flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center sm:text-left">
          Photos are analyzed on the server and are not stored.
        </p>
        <Link
          to="/about"
          className="inline-flex min-h-[44px] items-center rounded-md px-2 py-1 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          About
        </Link>
      </div>
    </footer>
  );
}
