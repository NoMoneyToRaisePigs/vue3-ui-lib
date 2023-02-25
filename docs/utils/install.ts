import * as Components from 'src'

import type { App } from 'vue'

export const install = function (Vue: App) {
  Object.keys(Components).forEach(name => {
    const item = Components[name]

    Vue.component(item.name, item)
  })
}