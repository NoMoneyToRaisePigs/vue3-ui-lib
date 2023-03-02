export function pxlize (value: number | string | null) {
  if (value === null) return '0px'
  return isNaN(value as number) ? value.toString() : `${value}px`
}