<template>
  <div ref="wrapper" class="fun-virtual-list-wrapper">
    <div class="fake" style="width: 2px" :style="fakeStyle" />
    <div :style="listStyle">
      <div v-for="item in visibleItems" :key="item.index" style="width: 200px;">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, StyleValue  } from 'vue'
import { useScroll, useElementSize } from '@vueuse/core'

export interface virtualItem {
  index: number
  [key: string]: unknown
}


interface Props<T extends virtualItem = virtualItem> {
  items: T[]
  itemHeight: number
  buffer?: number
}

const props = withDefaults(defineProps<Props>(), {
  buffer: 2,
})

const { itemHeight, buffer, items } = toRefs(props)

const wrapper = ref()
const { y: scrollTop } = useScroll(wrapper)
const { height: containerHeight } = useElementSize(wrapper)

const indexedItem = computed(() => {
  return items.value.map((item, index) => ({ ...item, index }))
})

const itemCount = computed(() => {
  return items.value.length
})

const totalHeight = computed(() => {
  return itemCount.value * itemHeight.value
})

const offSetY = computed(() => {
  return startItem.value * itemHeight.value
})

const startItem = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / itemHeight.value - buffer.value))
})

const visibleCount = computed(() => {
  return Math.ceil(containerHeight.value / itemHeight.value) + 2 * buffer.value
})

const visibleItems = computed(() => {
  return items.value.slice(startItem.value, startItem.value + visibleCount.value)
})

const fakeStyle = computed(() => {
  return {
    height: `${totalHeight.value}px`,
  }
})

const listStyle = computed<StyleValue>(() => {
  return {
    position: 'absolute',
    top: `${offSetY.value}px`,
  }
})

</script>

<style lang="scss">
.fun-virtual-list-wrapper {
  height: 300px;
  position: relative;
  overflow: auto;
}
</style>