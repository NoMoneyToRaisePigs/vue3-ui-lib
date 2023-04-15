<template>
  <div class="fun-popper-wrapper">
    <div ref="trigger" @click="togglePopperContent">
      <slot />
    </div>
    <Teleport to="body" :disabled="!teleport">
      <div v-if="show" ref="content" :style="contentStyle">
        <slot name="content" />
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, computed } from 'vue'
import { useContentStyle } from './hook'
import type { Placement } from './type'

interface PopperProps {
  placement?: Placement
  transition?: string
  offset?: number
  teleport?: boolean
}

const props = withDefaults(defineProps<PopperProps>(), {
  placement: 'bottom',
  offset: 0,
  transition: '',
  teleport: false,
})

const { placement, offset, teleport } = toRefs(props)

const show = ref(false)
const trigger = ref(null)
const content = ref(null)

const contentStyle = useContentStyle(trigger, content, teleport, placement, offset)

const togglePopperContent = () => {
  show.value = !show.value
}
</script>

<style lang="less">
.fun-popper-wrapper {
  position: relative;
}
</style>