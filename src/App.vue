<template>
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
  <div>
    <a
      href="https://vitejs.dev"
      target="_blank"
    >
      <img
        src="/vite.svg"
        class="logo"
        alt="Vite logo"
      >
    </a>
    <a
      href="https://vuejs.org/"
      target="_blank"
    >
      <img
        src="./assets/vue.svg"
        class="logo vue"
        alt="Vue logo"
      >
    </a>
  </div>
  <h2>Now Test out git actions</h2>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox } from './components/index'
import { Loading } from './components/index'

const arrayVal = ref(['1'])
const isVIP = ref(true)

function change() {
  arrayVal.value = ['1', '2']
}
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
