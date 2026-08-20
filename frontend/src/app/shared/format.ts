/**
 * Renders a value against a unit such as "£bn" or "%", placing a leading
 * currency symbol before the number and the remaining unit after it.
 */
export function formatUnit(value: number, unit: string, decimals = 1): string {
  const amount = value.toFixed(decimals);
  const symbol = unit.match(/^[£$€]/);
  return symbol ? `${symbol[0]}${amount}${unit.slice(1)}` : `${amount}${unit}`;
}
