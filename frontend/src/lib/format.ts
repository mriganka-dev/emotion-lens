export function formatPercent(score: number): string {
  const rounded = Math.round(score * 100);
  return `${rounded}%`;
}

