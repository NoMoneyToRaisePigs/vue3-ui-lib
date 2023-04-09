<template>
  <div class="popper-wrapper" @click="togglePopperContent">
    <slot />
  </div>
  <div v-if="show">
    <slot name="content" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(false)

const togglePopperContent = () => {
  show.value = !show.value
}
</script>