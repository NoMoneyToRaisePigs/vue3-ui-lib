<template>
  <div style="padding: 24px;">
    <RouterView />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function isJsonString (str: string) {
  if (typeof str === 'string') {
    try {
      if (typeof JSON.parse(str) === 'object') {
        return true
      }
    } catch (error) {
      return false
    }
  }

  return false
}

onMounted(() => {
  const { pathname, search } = window.parent.location
  // const fullPath = pathname + search

  // router.push(fullPath)
  window.addEventListener('message', handleMessage, false)
  router.push('Example')
})

function handleMessage (event: MessageEvent) {
  if (event.origin !== window.location.origin) {
    // eslint-disable-next-line no-useless-return
    return
  }

  const { data } = event

  console.log(data)

  router.push(data)
  // if (isJsonString(data)) {
  //   const { source, location } = JSON.parse(data)

  //   if (source === AppType.main) {
  //     router.push(location.fullPath)
  //   }
  // }
}

</script>
