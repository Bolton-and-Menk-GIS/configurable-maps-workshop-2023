import { version as arcgisVersion } from "@arcgis/core/kernel"
import type { ThemeType } from "@/types"
import { useAppStore } from "@/stores"
import { log } from "./logger"
import { ref } from 'vue'

/** 
 * light and dark theme style tags
 */
const rootHtml = document.getElementsByTagName('html')[0]
const lightThemeStyleLink = ref<HTMLLinkElement>()
const darkThemeStyleLink = ref<HTMLLinkElement>()

/**
 * check user's browser's preferences to see if dark mode is preferred
 * @returns 
 */
export const getPreferredTheme = (): ThemeType => window?.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'

/** 
 * sets the bootstrap theme to light or dark
 * @param theme - the light or dark theme
 */
export const setBootstrapTheme = (theme?: ThemeType) => {
  theme = theme ?? getPreferredTheme()
  rootHtml.setAttribute('data-bs-theme', theme)
  log(`updated the bootstrap theme to "${theme}"`)
}

/**
 * fetches the ArcGIS JS API "main.css" CDN url based on a light or dark theme
 * @param theme - the light or dark theme
 * @returns the url to the "main.css" file with the appropriate theme
 */
export const getThemeUrl = (theme: ThemeType) => `https://js.arcgis.com/${arcgisVersion}/esri/themes/${theme}/main.css`

/**
 * will deactivate a stylesheet link by providing an impossible media query
 * @param link - the stylesheet link to disable
 * 
 * @see https://stackoverflow.com/a/54441305/3005089
 */
export const deactivateStyleLink = (link: HTMLLinkElement) => {
  link.setAttribute('media', 'max-width: 1px')
}

/**
 * will remove the impossible media query from a stylesheet link causing it to be enabled
 * @param link - the stylelink sheet to enable
 * 
 * @see https://stackoverflow.com/a/54441305/3005089
 */
export const activateStyleLink = (link: HTMLLinkElement) => {
  if (link.hasAttribute('media')){
    link.removeAttribute('media')
  }
}

/** 
 * loads the ArcGIS Maps SDK "main.css" file based on the current theme
 */
export const loadEsriCss = () => {
  const appStore = useAppStore()

  for (const theme of ['light', 'dark'] as ThemeType[]){
    const targetRef = theme === 'light' 
      ? lightThemeStyleLink
      : darkThemeStyleLink
    
    // check if the link has been created
    if (!targetRef.value){
      const link = document.createElement('link') as HTMLLinkElement
      link.id = `esri-theme-${theme}-link`
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', getThemeUrl(theme))
      document.head.append(link)
      log(`created esri theme link with id: "${link.id}"`)
      targetRef.value = link
      // check if this is not the active theme
      if (appStore.theme !== theme){
        deactivateStyleLink(link)
        log(`deactivated esri style link for theme: "${theme}"`)
      }
    }
  }
}

/**
 * sets the theme for the ArcGIS Maps SDK
 * @param theme - the light or dark theme
 * @returns 
 */
export const setEsriTheme = (theme?: ThemeType)=> {
  if (!darkThemeStyleLink.value || !lightThemeStyleLink.value) return
  theme = theme ?? getPreferredTheme()
  if (theme === 'dark'){
    activateStyleLink(darkThemeStyleLink.value)
    deactivateStyleLink(lightThemeStyleLink.value)
  } else {
    activateStyleLink(lightThemeStyleLink.value)
    deactivateStyleLink(darkThemeStyleLink.value)
  }
}