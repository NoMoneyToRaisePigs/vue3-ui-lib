<template>
  <ExampleItem title="basic" :source="source">
    <ECheckbox v-model="isVIP" name="name" />
    <ECheckbox v-model="isVIP" name="name" text="Has text" />
    <ECheckbox v-model="isVIP" name="name">
      Default slot
    </ECheckbox>
  </ExampleItem>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// import { Checkbox } from '@/components'

import source from './checkbox-basic.vue?raw'

const isVIP = ref(false)

</script>
