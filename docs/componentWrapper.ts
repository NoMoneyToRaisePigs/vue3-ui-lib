import { createApp } from 'vue'
import App from './componentWrapper.vue'
import routes from './router'
import { install } from './utils/install'

const app = createApp(App)

install(app)

app
  .use(routes)
  .mount('#app')
