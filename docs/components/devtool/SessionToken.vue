<template>
  <div class="session-token">
    <e-input v-model="newToken" placeholder="Paste token and press enter" @keypress.enter="save" />

    <h3>Current Token <e-icon icon="copy" @click="copy"></e-icon></h3>
    <pre><code>{{ token }}</code></pre>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getCookie, setCookie } from 'x-utils'

const token = getCookie('token')

const newToken = ref('')

function copy () {
  window.navigator.clipboard.writeText(token || '')
}

function save () {
  setCookie('token', newToken.value)
  window.location.reload()
}
</script>
