<template>
  <div>
    <FunList :items="items" :item-height="itemHeight" :buffer="buffer">
      <template #default="{ item }">
        <p>{{ item.name }} + {{ item.value }}</p>
      </template>
    </FunList>
  </div>
  <div>
    <XInput v-model="inputVal" />
    <pre>
      {{ inputVal }}
    </pre>
  </div>
  <div>
    <Loading />
    <Loading :color="'red'" :stroke-width="30" :size="40" />
  </div>
  <div>
    <button @click="change">
      xxx
    </button>
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
  </div>
  <div>
    <Checkbox v-model="isVIP" name="isVp">
      isVIP
    </Checkbox>
    <pre>
      {{ isVIP }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Checkbox } from './components/index'
import { Loading } from './components/index'
import { XInput } from './components/index'
import { FunList } from './components/index'
import { virtualItem } from './components/list/src/index.vue'

interface MyItem extends virtualItem {
  name: string,
  value: string,
}

const arrayVal = ref(['1'])
const isVIP = ref(true)

const inputVal = ref('')


function change() {
  arrayVal.value = ['1', '2']
}

const items: virtualItem[] = []

for (let i = 0; i < 1000; i++) {
  items.push({
    index: i,
    name: `name${i}`,
    value: `value${i}`,
  })
}

const buffer = 2
const itemHeight = 20
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
