export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function getRoastLabel(level: string): string {
  const labels: Record<string, string> = {
    light: 'Light',
    'light-medium': 'Light-Medium',
    medium: 'Medium',
    'medium-dark': 'Medium-Dark',
    dark: 'Dark',
  };
  return labels[level] ?? level;
}

export function getRoastBars(level: string): number {
  const bars: Record<string, number> = {
    light: 1,
    'light-medium': 2,
    medium: 3,
    'medium-dark': 4,
    dark: 5,
  };
  return bars[level] ?? 3;
}
