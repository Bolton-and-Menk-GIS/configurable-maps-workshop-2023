// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'

const app = createApp(App)

app
  // use the pinia plugin
  .use(createPinia())
  // register font awesome component globally
  .component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')