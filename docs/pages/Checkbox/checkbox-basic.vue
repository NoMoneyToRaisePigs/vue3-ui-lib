<template>
  <ExampleItem title="basic" :source="source" class="checkbox-list">
    <ECheckbox v-model="isVIP" name="name" />
    <ECheckbox v-model="isVIP" name="name" text="Has text" />
    <ECheckbox v-model="isVIP" name="name">
      Default slot
    </ECheckbox>
    <pre>
      {{ isVIP }}
    </pre>
  </ExampleItem>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import source from './checkbox-basic.vue?raw'

const isVIP = ref(false)

</script>

<style>
.checkbox-list {
  display: flex;
  flex-direction: column;
}
</style>
