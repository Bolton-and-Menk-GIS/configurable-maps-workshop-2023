import type { AppConfig, RegistryItem, ConfigRegistry } from '@/types'
import { useAppStore } from '@/stores'
import { fetchJson, sortByProperty, log } from '@/utils'
import { useColorTheme } from '@/composables'
import Swal from 'sweetalert2'

/**
 * fetches the config appId from the url parameters
 * @returns an appId if one is found
 */
export const getAppId = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('app')
}

/**
 * helpers for loading configuration files
 */
export const useConfig = () => {

  async function loadConfig(regPath='./config/registry.yml'){
    const appStore = useAppStore()
    let apps = [] as RegistryItem[]
  
    // check for appId in url (?app=<app-id>)
    let appId = getAppId()
  
    try {
  
      const resp = await fetchJson<ConfigRegistry>(regPath)
      apps.push(...resp.apps)
  
    } catch(err){
      console.warn('could not load registry!')
      throw err
    }

    if (!appId){
      const sortedKeys = sortByProperty(apps, 'name')
      const options = sortedKeys.reduce((o, i) => ({ ...o, [i.id]: i.name }), {})
  
      // wait for user input to select an app id to load
      const { value, isDismissed } = await Swal.fire({
        icon: 'warning',
        text: 'No Application ID has been provided in the URL. Please choose one from the drop down below:',
        input: 'select',
        inputOptions: options,
        inputPlaceholder: 'Select an application ID',
        showCancelButton: true
      })
      // set app ID to value
      appId = value
  
      // use default appID if none selected
      if (!appId || isDismissed){
        log('no application ID was selected, using first available appId')
        appId = apps[0].id
      }
    
      log('user selected appliation ID: ', appId)
      const url = new URL(window.location.href)
      url.searchParams.append('app', appId)
      const state = { additionalInformation: 'Added Application ID to url'}
      window.history.pushState(state, document.title, url.href)
    }
  
    const registryItem = apps.find(c => c.id === appId)
  
    if (!registryItem) {
      throw Error('No Configuration Found')
    }
  
    // load the config file, check if it is a relative path or not
    const config = await fetchJson<AppConfig>(
      registryItem.path.startsWith('http')
        ? registryItem.path
        : `./config/${registryItem.path}`
    )
  
    // set config
    appStore.config = config
  
    // set theme
    if (config.app.theme){
      const { setThemeColors } = useColorTheme()
      setThemeColors(config.app.theme!)
    }
  
    // set document title
    document.title = config.app.title
    log(`successfully loaded application configuration with appId "${appId}": `, config)
    return config
    
  }

  return { 
    getAppId,
    loadConfig
  }
}