<template>
  <ExampleItem title="basic" :source="source" class="checkbox-list">
    <Checkbox v-model="arrayVal" name="apple" value="1">
      Apple
    </Checkbox>
    <Checkbox v-model="arrayVal" name="pear" value="2">
      Pear
    </Checkbox>
    <Checkbox v-model="arrayVal" name="banana" value="3">
      Banana
    </Checkbox>
    <pre>
      {{ arrayVal }}
    </pre>
  </ExampleItem>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Checkbox } from 'src/components/index'
import source from './checkbox-basic.vue?raw'

const arrayVal = ref([])

</script>

<style>
.checkbox-list {
  display: flex;
  flex-direction: column;
}
</style>
