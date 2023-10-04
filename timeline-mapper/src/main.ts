
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { PopoverDirective } from '@/assets/bootstrap'
import { useConfig } from '@/composables'

async function initialize(){
  const { loadConfig } = useConfig()

  const { default: App } = (await import('./App.vue'))
  
  const app = createApp(App)
  
  app
    // use the pinia plugin
    .use(createPinia())
    // register font awesome component globally
    .component('font-awesome-icon', FontAwesomeIcon)
    // register the popover directive
    .directive('popover', PopoverDirective)

  // load the config before mounting the map
  await loadConfig()
  
  app.mount('#app')
  return app
}

initialize()
