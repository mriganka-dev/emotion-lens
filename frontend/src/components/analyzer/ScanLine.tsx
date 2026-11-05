export function ScanLine() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_12px_var(--color-primary)] animate-scanline motion-reduce:hidden"
      aria-hidden="true"
    />
  );
}
