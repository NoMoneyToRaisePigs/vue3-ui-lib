<template>
  <aside ref="rootElem">
    <div class="section-title">
      <!-- <e-input v-model="search" placeholder="Search the docs" /> -->
    </div>
    <div v-for="menu of menus" :key="menu.title" class="aside__section">
      <div v-if="menu.items.length" class="menu-group">
        {{ menu.title }}
      </div>
      <div class="section-items">
        <RouterLink
          v-for="item of menu.items"
          :key="item.title"
          :to="item.link"
          @click="handleClick(item)"
        >
          {{ item.title }}
        </RouterLink>
        <!-- <RouterLink
          v-for="item of menu.items"
          :key="item.title"
          :to="item.link"
        >
          {{ item.title }}
        </RouterLink> -->
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
// import { useRouter, loadRouteLocation } from 'vue-router'

// import { componentsUrl } from 'docs/utils/url'

export interface AsideItem {
  title: string
  link: string
}

const emit = defineEmits(['xxx'])

const excludeModules = ['theming']

const modules = import.meta.glob('../pages/**')

const componentsUrl = function () {
  const pageComponents: Set<string> = new Set([])

  Object.keys(modules).forEach((name) => {
    const modulesName = name
      .replace('../pages/', '')
      .replaceAll('/index.vue', '')


    if (modulesName !== '' && !excludeModules.includes(modulesName))
      pageComponents.add(modulesName)
  })

  const list: AsideItem[] = []

  pageComponents.forEach(name => {
    list.push({
      title: name.replace(/^\S/, n => n.toUpperCase()),
      link: `/${name.toLowerCase()}`,
    })
  })

  return list
}

const search = ref('')
const iframe = ref()



const fullMenus = [
  {
    title: 'Theming',
    items: [
      { title: 'Colors', link: '/theming/colors' },
      { title: 'Spacings', link: '/theming/spacings' },
      { title: 'Typography', link: '/theming/typography' },
    ],
  },
  {
    title: 'Components Overview',
    items: componentsUrl(),
  },
]

const rootElem = ref<HTMLDivElement | null>(null)

const menus = computed(() => {
  const key = search.value.toLowerCase().trim()

  return fullMenus.map((menu) => {
    const items = menu.items.filter((item) => item.title.toLowerCase().includes(key))

    return {
      title: menu.title,
      items,
    }
  })
})

// const router = useRouter()

// loadRouteLocation(router.resolve(location.pathname)).then(() => {
//   setTimeout(updateScrollbar, 0)
// })

function updateScrollbar () {
  if (!rootElem.value) return
  const focusElem = rootElem.value.querySelector('.router-link-active') as HTMLLinkElement

  if (focusElem) {
    const y = focusElem.offsetTop - rootElem.value.offsetHeight / 2

    rootElem.value.scrollTop = Math.max(y, 0)
  }
}

function handleClick(item: any) {
  console.log('clicked')
  emit('xxx', item)
}

</script>

<style lang="scss" scoped>
.section-title {
  padding: 10px 10px 5px;
  font-size: 14px;
  color: var(--color-grey-text);
  border-bottom: 1px solid var(--color-border);
}

.section-items {
  padding-top: 8px;

  > a {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    color: var(--text-primary);

    &:hover {
      background-color: var(--layer-hover-1);
    }

    &.router-link-active {
      color: var(--color-primary);
      background-color: var(--background-1);
      border-right: 3px solid;
    }
  }
}

.e-input {
  --input-border-width: 0;
}

.menu-group {
  padding: 16px 16px 8px;

  @apply text-subhead2;
}
</style>
