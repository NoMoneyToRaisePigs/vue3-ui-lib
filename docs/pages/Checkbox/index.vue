<template>
  <div>
    <ECheckbox />
    <CheckboxBasic />
  </div>
</template>

<script lang="ts" setup>
// import { Checkbox } from '@/components'
import { ref } from 'vue'
import CheckboxBasic from './checkbox-basic.vue'

const info = ref('page: checkbox')

</script>