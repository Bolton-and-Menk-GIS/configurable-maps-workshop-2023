import type { MapConfig } from "@/types"
import { watch } from 'vue'
import { useAppStore } from "@/stores"
import { log, loadEsriCss, setEsriTheme } from "@/utils"
import WebMap from '@arcgis/core/WebMap'
import MapView from '@arcgis/core/views/MapView'

/**
 * helper functions for initializing a map and view
 * @param container - the container element for the map
 * @param options - the map configuration options
 */
export const useMap = (container: HTMLDivElement) => {
  const appStore = useAppStore()
  loadEsriCss()

  const options = appStore.config.map as MapConfig

  // check for default basemap based on theme
  const basemap = options.defaultDarkBasemapId && appStore.darkMode 
    ? options.defaultDarkBasemapId!
    : options.defaultLightBasemapId && !appStore.darkMode   
      ? options.defaultLightBasemapId
      : undefined

  // set default basemap based on theme if not provided in webmap properties
  if (basemap && !options.webmap.basemap){
    log(`overriding "${appStore.theme}" theme basemap: "${basemap}"`)
    options.webmap.basemap = basemap
  }

  // initialize map and view
  const map = new WebMap(options.webmap)
  log('created map: ', map)

  const view = new MapView({
    ...options.mapView ?? {},
    container,
    map
  })
  log('created view: ', view)

  // update the esri theme and basemap when dark mode changes
  watch(()=> appStore.theme,
    (theme)=> {
      setEsriTheme(theme)
      // update basemap if there is a default basemap for this theme
      const newBasemapId = theme === 'dark'
        ? options.defaultDarkBasemapId
        : options.defaultLightBasemapId
      if (newBasemapId){
        // @ts-ignore // it will autocast
        map.basemap = newBasemapId
      }
    }
  )

  return { 
    map,
    view
  }

}