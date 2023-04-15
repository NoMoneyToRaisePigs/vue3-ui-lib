export type PlacementMain = 'top' | 'bottom' | 'left' | 'rigt'
export type PlacementSub = 'start' | 'end'

export type PlacementTop = 'top' | 'top-start' | 'top-end'
export type PlacementBottom = 'bottom' | 'bottom-start' | 'bottom-end'
export type PlacementLeft = 'left' | 'left-start' | 'left-end'
export type PlacementRight = 'right' | 'right-start' | 'right-end'
export type Placement = 'auto' | PlacementTop | PlacementBottom | PlacementLeft | PlacementRight

export interface PopperPosition {
  top: number
  left: number
}