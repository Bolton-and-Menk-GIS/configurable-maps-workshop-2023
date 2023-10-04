import type { ColorTheme } from "@/types";
import { log, toHex, toRGB } from "@/utils";
import hexRgb from "hex-rgb";

export function useColorTheme(){
  
  const setThemeColors = (theme: ColorTheme)=> {
    const root = document.querySelector(':root') as HTMLElement
    Object.keys(theme).forEach((key)=> {
      // override bootstrap color
      const prop = `--bs-${key}`
      const propRgb = `--bs-${key}-rgb`
      const color = theme[key as keyof ColorTheme]
      if (color){
        const hex = toHex(color, { ignoreError: true })
        root?.style.setProperty(prop, hex)
        const rgbArray = hexRgb(hex, { format: 'array' })
        const bsRgb = rgbArray.slice(0,3).join(', ')
        root?.style.setProperty(propRgb, bsRgb) 
        log(`set Bootstrap theme color: "${prop}" -> "${color}"`)
      }
    })

    const linkColor = theme.info ?? theme.success
    if (linkColor){
      root?.style.setProperty('--bs-link-color', toHex(linkColor, { ignoreError: true }))
      try {
        root?.style.setProperty('--bs-link-hover-color', toRGB(linkColor, { alpha: 0.7, format: 'css' }) as string) 
      } catch(err){
        console.warn('unable to set link color: ', err)
      }
    }
  }

  return { 
    setThemeColors
  }
}