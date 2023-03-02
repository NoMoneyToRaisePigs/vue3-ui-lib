<template>
  <svg class="e-spinner" :style="spinnerStyle" viewBox="0 0 50 50">
    <circle
      class="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { pxlize } from '@/utils/pixlize'
import { colorize } from '@/utils/colorize'

import type { CSSProperties } from 'vue'
// import type { LoadingProps } from './type'

interface LoadingProps {
  color?: string
  size?: string | number
  strokeWidth?: string | number
}

const props = withDefaults(defineProps<LoadingProps>(), {
  strokeWidth: 5,
})

const spinnerStyle = computed(() => {
  const obj = {} as CSSProperties

  if (props.size) {
    const pxSize = pxlize(props.size)

    obj.width = pxSize
    obj.height = pxSize
  }

  if (props.color) obj['--spinner-color'] = colorize(props.color)

  return obj
})

</script>
<script lang="ts">
export default {
  name: 'Loading',
}
</script>

<style lang="scss">
.e-spinner {
  --spinner-color: var(--color-primary);

  width: 16px;
  height: 16px;
  color: var(--spinner-color);
  animation: rotate 2s linear infinite;

  & .path {
    stroke: currentcolor;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
