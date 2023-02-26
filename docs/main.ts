import { createApp } from 'vue'
import routes from './router'

import App from './App.vue'

import './styles/reset.scss'
import { install } from './utils/install'


const app = createApp(App)

install(app)

app
  .use(routes)
  .mount('#app')

