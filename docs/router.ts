/// <reference types="vite-plugin-pages/client" />

import { createRouter, createWebHistory } from 'vue-router'

import routes from '~pages'

export default createRouter({
  history: createWebHistory(),
  routes,
})
