// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { PopoverDirective } from './assets/bootstrap'
import App from './App.vue'

const app = createApp(App)

app
  // use the pinia plugin
  .use(createPinia())
  // register font awesome component globally
  .component('font-awesome-icon', FontAwesomeIcon)
  // register the popover directive
  .directive('popover', PopoverDirective)

app.mount('#app')