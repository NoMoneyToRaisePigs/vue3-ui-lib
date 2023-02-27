import { createApp } from 'vue'
import App from './componentWrapper.vue'
import routes from './router'
import { install } from './utils/install'

import HtmlPreviewer from './components/htmlPreviewer/index.vue'
import ExampleItem from './components/exampleItem.vue'

const app = createApp(App)

install(app)

app
  .use(routes)
  .component('HtmlPreviewer', HtmlPreviewer)
  .component('ExampleItem', ExampleItem)
  .mount('#app')
