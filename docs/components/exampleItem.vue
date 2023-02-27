<template>
  <div ref="rootElem" class="example-item">
    <h3>{{ title }}</h3>

    <div class="case-items">
      <slot />
    </div>

    <HtmlPreviewer :source="source" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps<{
  title: string
  source: string
}>()

const rootElem = ref(null)


onMounted(() => {
  if (rootElem.value === null) return

  const itemsElem = (rootElem.value as HTMLDivElement).querySelector('.case-items') as HTMLDivElement

  nextTick(() => {
    if (itemsElem) {
      itemsElem.style.height = itemsElem.offsetHeight + 'px'
    }
  })
})
</script>

<style lang="scss" scoped>
.example-item__tools {
  padding-bottom: var(--space-1);
  border-bottom: 1px solid var(--color-border);
}

.case-items {
  &--inline {
    display: flex;
    align-items: flex-end;
  }
}
</style>
