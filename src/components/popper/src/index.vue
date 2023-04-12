<template>
  <div class="fun-popper-wrapper">
    <div ref="trigger" @click="togglePopperContent">
      <slot />
    </div>
    <Teleport to="body">
      <div v-if="show" ref="content" :style="contentStyle">
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { StyleValue, ref, toRefs } from 'vue'
import { usePopperPosition } from './hook'
import { computed } from '@vue/reactivity'

type PlacementTop = 'top' | 'top-start' | 'top-end'
type PlacementBottom = 'bottom' | 'bottom-start' | 'bottom-end'
type PlacementLeft = 'left' | 'left-start' | 'left-end'
type PlacementRight = 'right' | 'right-start' | 'right-end'
type Placement = 'auto' | PlacementTop | PlacementBottom | PlacementLeft | PlacementRight

interface PopperProps {
  placement?: Placement
  transition?: string
  offset?: number
}

const props = withDefaults(defineProps<PopperProps>(), {
  placement: 'bottom',
  offset: 0,
  transition: '',
})

const { placement, offset } = toRefs(props)



const show = ref(false)
const trigger = ref(null)
const content = ref(null)


const contentPosition = usePopperPosition(trigger, content, false, placement, offset)

const contentStyle = computed<StyleValue>(() => {
  return {
    position: 'absolute',
    top: `${contentPosition.value.top}px`,
    left: `${contentPosition.value.left}px`,
  }
})


const togglePopperContent = () => {
  show.value = !show.value
}
</script>

<style lang="less">

</style>