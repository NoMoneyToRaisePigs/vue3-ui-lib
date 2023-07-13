<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <div v-if="apiList.length" class="inline-grid grid-cols-4 gap-x-4 gap-y-2">
    <div class="col-span-3" opacity="50">
      URL
    </div>
    <div opacity="50">
      Mocking
    </div>
    <template v-for="item in apiList" :key="item.url">
      <div class="col-span-3">
        {{ item.url }}
        <e-icon
          size="12px"
          :icon="EyeOpenIcon"
          style="margin-left: 4px;"
          @click="openUrl(item.url)"
        />
      </div>
      <div>
        {{ item.mocking }}
      </div>
    </template>
  </div>
  <div v-else>
    Fetching API List
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import EyeOpenIcon from 'src/assets/icons/eye-open.svg?component'

interface Item {
  url: string
  mocking: boolean
}

const apiList = ref<Item[]>([])

if (import.meta.hot) {
  import.meta.hot.on('devtool:apiList', (data) => {
    apiList.value = data.apiList
  })
}

const openUrl = (url) => {
  window.open(url, '_blank')
}

</script>
