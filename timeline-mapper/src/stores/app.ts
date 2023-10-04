// src/stores/app.ts
import { defineStore } from "pinia"
import { ref, computed, watch, type Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { ThemeType, DeviceOrientation, AppConfig } from "@/types"
import { setBootstrapTheme, getPreferredTheme } from "@/utils"

const testConfig: AppConfig = {
  app: {
    title: "Civil War Battles",
    theme: {
      primary: "#ffa500",
      secondary: "#FFD93D",
      info: "#406ac9",
      dark: "#1D1D1D",
      success: "#21BA45",
      danger: "#ac0b30",
      warning: "#F2C037"
    }
  },
  map: {
    defaultDarkBasemapId: 'streets-night-vector',
    defaultLightBasemapId: 'topo-vector',
    webmap: {
      portalItem: {
        id: "246abd2b6b71403b9edbe6538ebc8534",
        portal: {
          url: "https://bmi.maps.arcgis.com/"
        }
      }
    },
    mapView: {
      zoom: 4,
      center: [
        -79.87481095392569,
        32.752114229033296
      ]
    }
  }
}

export const useAppStore = defineStore('app', ()=> {

  const { width, height } = useWindowSize()

  /**
   *  note: some of the esri typings do not play nicely with TypeScript 5
   * so we are casting the config inside the ref as any
   */
  /**
   * the application config
   */
  const config: Ref<AppConfig> = ref(testConfig as any)
  
  /**
   * will be true if the app is dark mode
   */
  const darkMode = ref(getPreferredTheme() === 'dark')

  // update the bootstrap theme whenever the dark mode changes from the toggle
  watch(
    ()=> darkMode.value,
    (isDark)=> {
      setBootstrapTheme(isDark ? 'dark': 'light')
    },
    // run watch handler immediately
    { immediate: true }
  )

  /**
   * state for the left panel, true when open
   */
  const leftPaneOpen = ref(true)

  /**
   * state for the left panel, true when open
   */
  const rightPaneOpen = ref(true)

   /**
   * the current theme for the app
   */
  const theme = computed<ThemeType>(()=> darkMode.value ? 'dark': 'light')

  /**
   * will toggle a panel in open or closed state, depending on the current open state
   * @param panel - the panel side to toggle
   * @returns the current state of the panel (true is open, false is closed)
   */
  const togglePanel = (panel: 'left' | 'right') => {
    const target = panel === 'left' 
      ? leftPaneOpen
      : rightPaneOpen
    target.value = !target.value
    return target.value
  }

  /**
   * the device orientation
   */
  const orientation = computed<DeviceOrientation>(()=> height.value > width.value ? 'portrait': 'landscape')
  
  // the below properties are based exclusively on the width
  /**
   * will be true when it is a small device (the width is < 577 pixels)
   */
  const isSmallDevice = computed(()=> width.value < 577)

  /**
   * will be true when it is a medium sized device (the width is between 576 and 992 pixels)
   */
  const isMediumDevice = computed(()=> width.value > 576 && width.value < 993)

  /**
   * will be true when it is a large sized device (the width is > 992 < 1201 pixels)
   */
  const isLargeDevice = computed(()=> width.value > 992 && width.value < 1201)

  /**
   * will be true when it is a large sized device (the width is > 992 pixels)
   */
  const isExtraLargeDevice = computed(()=> width.value > 1200)

  return {
    theme,
    config,
    width,
    height,
    orientation,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isExtraLargeDevice,
    darkMode,
    leftPaneOpen,
    rightPaneOpen,
    togglePanel
  }
})