import { createApp } from 'vue'
import routes from './router'

import App from './App.vue'

import './styles/reset.scss'

createApp(App)
  .use(routes)
  .mount('#app')

