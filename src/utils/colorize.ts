export function colorize (color: string) {
  return /^-{2}/.test(color) ? `var(${color})` : color
}