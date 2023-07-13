<template>
  <e-expansion title="Exchange Icons">
    <ul class="demo-icon-list">
      <li
        v-for="(icon, index) in innerIconCompList"
        :key="index"
        class="icon-item"
        @click="handleCopy(innerIconList[index])"
      >
        <e-tooltip theme="dark">
          <span class="demo-svg-icon">
            <e-icon
              :icon="icon"
              size="34"
              color="--status-default"
            ></e-icon>
            <span class="icon-name">{{ innerIconList[index] }}</span>
          </span>
          <template #content>
            <e-icon
              :icon="icon"
              width="100%"
              height="100%"
              color="--status-default"
            ></e-icon>
          </template>
        </e-tooltip>
      </li>
    </ul>
  </e-expansion>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useClipboard } from '@vueuse/core'
import { MessageFn } from 'x-ui'
import { camelCase, upperFirst } from 'lodash-es'

import innerIconList from 'src/assets/icons/list.json'

const innerIconLoader = innerIconList.map(icon => import(`../../../assets/icons/${icon}.svg?component`))

const innerIconCompList = await Promise.all(innerIconLoader)

const { copy, copied } = useClipboard()

watch(copied, val => {
  if (val) {
    MessageFn({
      type: 'success',
      title: 'Copied.',
    })
  }
})

function handleCopy (icon: string) {
  let importName = upperFirst(camelCase(icon)) + 'Icon'

  if (/^\d/.test(icon)) importName = 'I' + importName // Icon name starts with number, add the prefix.

  const str = `import ${importName} from 'src/assets/icons/${icon}.svg?component'
<e-icon :icon="${importName}" class="icon-${icon}" />`

  copy(str)
}
</script>

<style lang="scss" scoped>
@import "iconList";
</style>
