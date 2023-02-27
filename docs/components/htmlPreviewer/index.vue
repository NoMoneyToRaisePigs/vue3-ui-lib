<!-- eslint-disable vue/no-v-html -->
<template>
  <pre class="language-wrapper">
    <code class="language-html" v-html="markup" />
  </pre>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useSourceCode } from './useSourceCode'

interface htmlPreviewerProp {
  source: string
}

const props = defineProps<htmlPreviewerProp>()

const { source } = toRefs(props)

const { markup } = useSourceCode(source)

</script>

<style lang="scss" scoped>
.language-wrapper {
  max-height: 600px;
}
</style>
