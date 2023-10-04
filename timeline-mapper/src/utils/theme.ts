// src/utils/theme.ts
import type { ThemeType } from "@/types"
import { log } from "./logger"

/** 
 * light and dark theme style tags
 */
const rootHtml = document.getElementsByTagName('html')[0]

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