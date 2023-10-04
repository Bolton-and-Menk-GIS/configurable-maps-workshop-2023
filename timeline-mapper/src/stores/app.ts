// src/store/app.ts
import { defineStore } from "pinia"
import { ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import type { ThemeType, DeviceOrientation } from "@/types"

export const useAppStore = defineStore('app', ()=> {

  const { width, height } = useWindowSize()
 
  /**
   * will be true if the app is dark mode
   */
  const darkMode = ref(false)

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