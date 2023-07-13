<template>
  <div v-if="isSupported && memory" class="grid grid-cols-2 gap-x-4 gap-y-2">
    <div opacity="50">
      FPS
    </div>
    <div>{{ fps }}</div>
    <template v-if="memory">
      <div opacity="50">
        Memory Used
      </div>
      <div>{{ size(memory.usedJSHeapSize) }}</div>
      <div opacity="50">
        Memory Allocated
      </div>
      <div>{{ size(memory.totalJSHeapSize) }}</div>
      <div opacity="50">
        Memory Limit
      </div>
      <div>{{ size(memory.jsHeapSizeLimit) }}</div>
    </template>
  </div>
  <div v-else>
    Your browser does not support performance memory API
  </div>
</template>

<script setup lang="ts">
import { useMemory } from '@vueuse/core'

import { useFPS } from 'src/composables/useFPS'

const size = (v: number) => {
  const kb = v / 1024 / 1024

  return `${kb.toFixed(2)} MB`
}

const { isSupported, memory } = useMemory()
const { fps } = useFPS()

</script>
