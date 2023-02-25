<template>
  <div>
    {{ info }}
    <ECheckbox>I'm a checkbox</ECheckbox>
  </div>
</template>

<script lang="ts" setup>
// import { Checkbox } from '@/components'
import { ref } from 'vue'

const info = ref('page: checkbox')

</script>