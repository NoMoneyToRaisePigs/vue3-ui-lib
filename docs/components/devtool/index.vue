<template>
  <div class="devtool__main" :class="{ show: modelValue, bottom: state.layout === 'bottom' }" :style="contentStyle">
    <div class="devtool__dragger" @mousedown="startDragging">
      <span />
    </div>
    <div class="devtool__content">
      <h3>Performance</h3>
      <Performance />
      <h3>Dom Nodes (RouterView)</h3>
      <DomNodes />
      <h3>API List</h3>
      <APIList />
      <h3>Session Token</h3>
      <SessionToken />
      <h3>Icon List</h3>
      <IconList />
      <a href="/playground">
        <e-button>
          Go to Playground
        </e-button>
      </a>
    </div>

    <e-icon
      :icon="LineArrowIcon"
      size="16"
      class="devtool__layout"
      @click="switchLayout"
    />
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import { computed, onMounted } from 'vue'
import { $ } from 'vue/macros'

import LineArrowIcon from 'src/assets/icons/line-arrow.svg?component'

import Performance from './Performance.vue'
import DomNodes from './DomNodes.vue'
import APIList from './APIList.vue'
import SessionToken from './SessionToken.vue'
import IconList from './IconList/index.vue'

defineProps<{
  modelValue: boolean
}>()

const state = $(useStorage('devtool', {
  width: '300px',
  height: '300px',
  layout: 'left',
}))

const contentStyle = computed(() => {
  if (state.layout === 'left') {
    return {
      width: state.width,
    }
  } else {
    return {
      width: '100%',
      height: state.height,
    }
  }
})

const switchLayout = () => {
  if (state.layout === 'left') {
    state.layout = 'bottom'
  } else {
    state.layout = 'left'
  }
}

const handleDragging = (e) => {
  if (state.layout === 'left') {
    const width = e.clientX

    if (width >= 200 && width <= 800) {
      state.width = `${width}px`
    }
  } else {
    const height = window.innerHeight - e.clientY

    if (height >= 100 && height <= window.innerHeight) {
      state.height = `${height}px`
    }
  }
}

const startDragging = () => {
  document.addEventListener('mousemove', handleDragging)
}

onMounted(() => {
  document.body.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', handleDragging)
  })
})

</script>

<style lang="scss">

.devtool__main {
  position: fixed;
  top: 80px;
  bottom: 0;
  left: 0;
  z-index: 9999;
  width: 300px;
  font-size: 12px;
  color: #fff;
  background-color: rgb(0 0 0 / 85%);
  border-radius: 4px;
  opacity: 0.5;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translate3d(-100%, 0, 0);

  &.show {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  .e-icon {
    cursor: pointer;
  }
}

.devtool__content {
  height: 100%;
  padding: 0 32px 16px 16px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    @apply bg-grey-500;
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-grey-300;

    border-radius: 3px;
  }

  h3 {
    margin: 1.2em 0 0.6em;
    font-weight: 500;
    color: var(--color-white);
  }
}

.devtool__layout {
  position: fixed;
  right: 24px;
  bottom: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: rotate(-135deg);
}

.devtool__dragger {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 16px;
  color: #fff;
  cursor: col-resize;
  user-select: none;
  background-color: #3c4351;

  span {
    width: 8px;
    height: 20px;
    margin-left: 4px;
    border-color: #ddd;
    border-style: solid;
    border-width: 0 1px;
  }
}

.devtool__main.bottom {
  top: unset;
  bottom: 0;
  left: 0;
  height: 300px;
  transform: translate3d(0, 100%, 0);

  &.show {
    transform: translate3d(0, 0, 0);
  }

  .devtool__dragger {
    top: -16px;
    right: 0;
    bottom: unset;
    left: 0;
    width: 100%;
    height: 16px;
    cursor: row-resize;

    span {
      width: 20px;
      height: 8px;
      margin-left: 50%;
      border-width: 1px 0;
    }
  }

  .devtool__layout {
    transform: rotate(45deg);
  }
}
</style>
