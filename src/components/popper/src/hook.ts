import { ref, computed, Ref, StyleValue } from 'vue'
import { useElementBounding, useWindowSize } from '@vueuse/core'
import type { Placement, PopperPosition } from './type'

// function usePlacement(triggerEl: Ref<HTMLDivElement | null>, contentEl: Ref<HTMLDivElement | null>, placement: Ref<Placement>, offset: Ref<number>) {

//   if (placement.value === 'auto') {
//     const { top: triggerTop, right: triggerRight, bottom: triggerBottom, left: triggerLeft, width: triggerWidth, height: triggerHeight } = useElementBounding(triggerEl)
//     const { top: contentTop, right: contentRight, bottom: contentBottom, left: contentLeft, width: contentWidth, height: contentHeight } = useElementBounding(contentEl)

//     if (triggerTop >= triggerBottom) {
//       return 'top'
//     } else {
//       return 'bottom'
//     }
//   }
//   return null
// }

// function getPosition(teleport: boolean, placement: Placement, offset: number) {
//   const placementSections = placement.split('-')
//   const main = placementSections[0]
//   const sub = placementSections[1]

//   let top = Number.MIN_SAFE_INTEGER
//   let left = Number.MIN_SAFE_INTEGE

//   if (teleport) {
//     if (main === 'top') {
//       top =
//     }
//   } else {

//   }

// }

export function usePopperPosition (triggerEl: Ref<HTMLDivElement | null>, contentEl: Ref<HTMLDivElement | null>, teleport: Ref<boolean> | boolean, placement: Ref<Placement> | Placement = 'auto', offset: Ref<number> | number = 0) : Ref<PopperPosition>{

  const placementRef = ref(placement)
  const offsetRef = ref(offset)
  const teleportRef = ref(teleport)

  const { top: triggerTop,  bottom: triggerBottom, left: triggerLeft, width: triggerWidth, height: triggerHeight } = useElementBounding(triggerEl)
  const { width: contentWidth, height: contentHeight } = useElementBounding(contentEl)
  const { height: windowHeight } = useWindowSize()

  const position = computed<PopperPosition>(() => {
    let top = Number.MIN_SAFE_INTEGER
    let left = Number.MIN_SAFE_INTEGER

    const placementSections = placementRef.value.split('-')
    let main = placementSections[0]
    const sub = placementSections[1]

    if (main === 'auto') {
      main = triggerTop.value > windowHeight.value - triggerBottom.value ? 'top' : 'bottom'
    }

    if (teleportRef.value) {
      if (main === 'top' || main === 'bottom') {
        if (main === 'top') {
          top = triggerTop.value - contentHeight.value - offsetRef.value
        } else {
          top = triggerTop.value + triggerHeight.value + offsetRef.value
        }

        if (sub === 'start') {
          left = triggerLeft.value
        } else if (sub === 'end') {
          left = triggerLeft.value + triggerWidth.value - contentWidth.value
        } else {
          left = Math.max(0, triggerLeft.value + triggerWidth.value / 2 - contentWidth.value / 2)
        }
      } else if (main === 'left' || main === 'right') {
        if (main === 'left') {
          left = triggerLeft.value - contentWidth.value - offsetRef.value
        } else {
          left = triggerLeft.value + triggerWidth.value + offsetRef.value
        }

        if (sub === 'start') {
          top = triggerTop.value
        } else if (sub === 'end') {
          top = triggerTop.value + triggerHeight.value - contentHeight.value
        } else {
          top = Math.max(0, triggerTop.value + triggerHeight.value / 2 - contentHeight.value / 2)
        }
      }
    } else {
      if (main === 'top' || main === 'bottom') {
        if (main === 'top') {
          top = - contentHeight.value - offsetRef.value
        } else {
          top = triggerHeight.value + offsetRef.value
        }

        if (sub === 'start') {
          left = 0
        } else if (sub === 'end') {
          left = triggerWidth.value - contentWidth.value
        } else {
          left = triggerWidth.value / 2 - contentWidth.value / 2
        }
      } else if (main === 'left' || main === 'right') {
        if (main === 'left') {
          left = - contentWidth.value - offsetRef.value
        } else {
          left = triggerWidth.value + offsetRef.value
        }

        if (sub === 'start') {
          top = 0
        } else if (sub === 'end') {
          top = triggerHeight.value - contentHeight.value
        } else {
          top = triggerHeight.value / 2 - contentHeight.value / 2
        }
      }
    }


    return {
      top,
      left,
    }
  })

  return position
}

export function useContentStyle(triggerEl: Ref<HTMLDivElement | null>, contentEl: Ref<HTMLDivElement | null>, teleport: Ref<boolean> | boolean, placement: Ref<Placement> | Placement = 'auto', offset: Ref<number> | number = 0) {
  const contentPosition = usePopperPosition(triggerEl, contentEl, teleport, placement, offset)

  const contentStyle = computed<StyleValue>(() => {
    return {
      top: `${contentPosition.value.top}px`,
      left: `${contentPosition.value.left}px`,
    }
  })

  return contentStyle
}