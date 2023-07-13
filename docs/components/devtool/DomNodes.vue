<template>
  <div v-if="state.count" class="inline-grid grid-cols-2 gap-x-4 gap-y-2">
    <div opacity="50">
      Count
    </div>
    <div :class="{ 'text-red-500': state.count >= 1000 }">
      {{ state.count }}
    </div>
    <div opacity="50">
      Max Depth
    </div>
    <div :class="{ 'text-red-500': state.maxDepth >= 10 }">
      {{ state.maxDepth }}
    </div>
  </div>
  <div v-else>
    Counting dom nodes
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useIntervalFn } from '@vueuse/core'

const state = reactive({
  count: 0,
  maxDepth: 0,
})

function getMaxDepth (el) {
  if (!el.children) { return 0 }
  let max = -1

  for (let i = 0; i < el.children.length; i++) {
    const h = getMaxDepth(el.children[i])

    if (h > max) {
      max = h
    }
  }

  return max + 1
}

useIntervalFn(() => {
  const page = document.querySelector('.page')

  if (page) {
    state.count = page?.getElementsByTagName('*').length as number
    state.maxDepth = getMaxDepth(page)
  }
}, 3000)
</script>
