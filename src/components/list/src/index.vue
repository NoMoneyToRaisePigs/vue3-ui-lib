<template>
  <div ref="wrapper" class="fun-virtual-list-wrapper">
    <div class="fake" style="width: 2px" :style="fakeStyle" />
    <div :style="listStyle">
      <div v-for="(item, index) in visibleItems" :key="item.index" class="fun-virtual-list-item" :style="{height: `${virtualHeights[index]}px`, width: '200px'}">
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRefs, StyleValue, onBeforeMount  } from 'vue'
import { useScroll, useElementSize } from '@vueuse/core'

export interface virtualItem {
  index: number
  [key: string]: unknown
}


interface Props<T extends virtualItem = virtualItem> {
  items: T[]
  itemHeight: number
  buffer?: number
  getHeight?: (index: number) => number
}

const props = withDefaults(defineProps<Props>(), {
  buffer: 2,
  getHeight: undefined,
})

const { itemHeight, buffer, items, getHeight } = toRefs(props)

const wrapper = ref()
const { y: scrollTop } = useScroll(wrapper)
const { height: containerHeight } = useElementSize(wrapper)

const virtualHeights = computed(() => {
  const result : number[] = []

  for (let i = 1; i < items.value.length; i++) {
    if (getHeight?.value) {
      result.push(getHeight?.value(i))
    } else {
      result.push(itemHeight.value)
    }
  }

  return result
})

const virtualPositions = computed(() => {
  const result = [0]

  for (let i = 1; i < items.value.length; i++) {
    let height = 0

    if (getHeight?.value) {
      height = getHeight?.value(i)
    } else {
      height = itemHeight.value
    }

    result.push(result[i - 1] + height)
  }

  return result
})

// const indexedItem = computed(() => {
//   return items.value.map((item, index) => ({ ...item, index }))
// })

const itemCount = computed(() => {
  return items.value.length
})

const totalHeight = computed(() => {
  if (getHeight.value) {
    const length = virtualPositions.value.length - 1
    return virtualPositions.value[length] + getHeight.value(length)
  } else {
    return itemCount.value * itemHeight.value
  }
})

const offSetY = computed(() => {
  if (getHeight.value) {
    return virtualPositions.value[startItem.value]
  } else {
    return startItem.value * itemHeight.value
  }

})

// function binarySearch(itemPositions, scrollTop) {
//   const middleIndex = Math.floor(itemPositions.length / 2)

//   if (itemPositions[middleIndex] <= scrollTop && (scrollTop > itemPositions[middleIndex + 1] || middleIndex === itemPositions.length - 1)){
//     return middleIndex
//   }
// }

function findStartNode(scrollTop, nodePositions, itemCount) {
  let startRange = 0
  let endRange = itemCount - 1
  while (endRange !== startRange) {
    // console.log(startRange, endRange);
    const middle = Math.floor((endRange - startRange) / 2 + startRange)

    if (
      nodePositions[middle] <= scrollTop &&
      nodePositions[middle + 1] > scrollTop
    ) {
      // console.log("middle", middle);
      return middle
    }

    if (middle === startRange) {
      // edge case - start and end range are consecutive
      // console.log("endRange", endRange);
      return endRange
    } else {
      if (nodePositions[middle] <= scrollTop) {
        startRange = middle
      } else {
        endRange = middle
      }
    }
  }
  return itemCount
}

function findEndNode(nodePositions, startNode, itemCount, height) {
  let endNode
  for (endNode = startNode; endNode < itemCount; endNode++) {
    // console.log(nodePositions[endNode], nodePositions[startNode]);
    if (nodePositions[endNode] > nodePositions[startNode] + height) {
      // console.log(endNode);
      return endNode
    }
  }
  return endNode
}

const startItem = computed(() => {
  if (getHeight.value) {
    return findStartNode(scrollTop.value, virtualPositions.value, items.value.length)
  } else {
    return Math.max(0, Math.floor(scrollTop.value / itemHeight.value - buffer.value))
  }
})

const endItem = computed(() => {
  if (getHeight.value) {
    return findEndNode(virtualPositions.value, startItem.value, items.value.length, containerHeight.value)
  } else {
    return startItem.value + visibleCount.value
  }
})

const visibleCount = computed(() => {
  return Math.ceil(containerHeight.value / itemHeight.value) + 2 * buffer.value
})

const visibleItems = computed(() => {
  return items.value.slice(startItem.value, endItem.value)
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

.fun-virtual-list-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fun-virtual-list-item:nth-child(2n) {
  background-color: red;
}

.fun-virtual-list-item:nth-child(2n + 1) {
  background-color: green;
}
</style>