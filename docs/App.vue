<template>
  <div class="layout-default">
    <nav class="site-header">
      nav
    </nav>

    <main class="site-main">
      <SideMenu class="site-aside e-scroller--fat" @xxx="handleComponentNavigation" />
      <div class="site-content">
        <!-- <RouterView /> -->
        <iframe
          ref="iframe"
          class="view"
          frameborder="0"
          src="./componentWrapper.html"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import SideMenu from './components/sideMenu.vue'

const info = ref('aside + content')
const iframe = ref()

const handleComponentNavigation = (data: any) => {
  iframe.value.contentWindow.postMessage(JSON.stringify(data))
}

</script>

<style lang="scss" scoped>
$site-aside-width: 280px;

.site-header {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  line-height: 1.5;
  color: var(--color-white);
  background-color: var(--color-primary);
  border-bottom: 1px solid var(--border-field);

  .nav-left {
    width: 100%;
    font-size: 16px;

    img {
      display: inline-block;
      vertical-align: top;
    }

    span {
      padding-left: 12px;
      font-weight: 600;
      vertical-align: middle;
    }
  }

  .nav-right {
    display: flex;

    a {
      display: flex;
      align-items: center;
      margin: 0 12px;
      cursor: pointer;
    }

    .icon-button {
      color: rgb(255 255 255 / 50%);
      transition: color .3s ease-in-out;

      &:hover,
      &.active {
        color: var(--button-primary-hover);
      }
    }
  }
}

.site-main {
  display: flex;
}

.site-aside {
  position: sticky;
  top: 65px;
  flex-shrink: 0;
  width: $site-aside-width;
  height: calc(100vh - 65px);
  padding-bottom: 40px;
  overflow-y: auto;
  overscroll-behavior: contain;
  border-right: 1px solid var(--color-border);
}

.site-content {
  display: flex;
  justify-content: center;
  width: calc(100vw - $site-aside-width);

  .view {
    width: 100%;

    &.mobile {
      width: 418px;
      height: 872px;
      margin: 64px auto;
      border: 14px solid var(--color-black);
      border-radius: 50px;
    }

    &.tablet {
      width: 848px;
      height: 1104px;
      margin: 64px auto;
      border: 40px solid var(--color-black);
      border-radius: 50px;
    }
  }
}
</style>
