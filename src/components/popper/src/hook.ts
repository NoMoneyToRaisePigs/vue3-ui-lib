import { ref, computed, Ref } from 'vue'
import { useElementBounding } from '@vueuse/core'

type PlacementMain = 'top' | 'bottom' | 'left' | 'rigt'
type PlacementSub = 'start' | 'end'

type PlacementTop = 'top' | 'top-start' | 'top-end'
type PlacementBottom = 'bottom' | 'bottom-start' | 'bottom-end'
type PlacementLeft = 'left' | 'left-start' | 'left-end'
type PlacementRight = 'right' | 'right-start' | 'right-end'
type Placement = 'auto' | PlacementTop | PlacementBottom | PlacementLeft | PlacementRight

interface PopperPosition {
  top: number
  left: number
}

function usePlacement(placement: Ref<Placement>) {
  return null
}

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

export function usePopperPosition(triggerEl: Ref<HTMLDivElement | null>, contentEl: Ref<HTMLDivElement | null>, teleport: Ref<boolean> | boolean, placement: Ref<Placement> | Placement = 'auto', offset: Ref<number> | number = 0) : Ref<PopperPosition>{

  const placementRef = ref(placement)
  const offsetRef = ref(offset)
  const teleportRef = ref(teleport)

  const { top: triggerTop, right: triggerRight, bottom: triggerBottom, left: triggerLeft, width: triggerWidth, height: triggerHeight } = useElementBounding(triggerEl)
  const { top: contentTop, right: contentRight, bottom: contentBottom, left: contentLeft, width: contentWidth, height: contentHeight } = useElementBounding(contentEl)


  const position = computed<PopperPosition>(() => {
    let top = Number.MIN_SAFE_INTEGER
    let left = Number.MIN_SAFE_INTEGER

    const placementSections = placementRef.value.split('-')
    const main = placementSections[0]
    const sub = placementSections[1]

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
          left = triggerLeft.value + triggerWidth.value / 2 - contentWidth.value / 2
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
          top = triggerTop.value + triggerHeight.value / 2 - contentHeight.value / 2
        }
      } else {
        //auto
        // should set auto first by checking the top left bottom right
        left = 0
        left = 0
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
      } else {
        //auto
        // should set auto first by checking the top left bottom right
        left = 0
        left = 0
      }
    }


    return {
      top,
      left,
    }
  })

  return position
}