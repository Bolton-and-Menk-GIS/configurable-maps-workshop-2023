import rgbHex from 'rgb-hex'
import { 
  type Options as HexRGBOptions, 
  default as hexRgb 
} from 'hex-rgb'

// see https://stackoverflow.com/a/63856391/3005089
const HEX_REGEX = /#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)\b/i;
const RGB_REGEX = /^rgb\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d)\)$/
const RGBA_REGEX = /^rgba\((0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|255|25[0-4]|2[0-4]\d|1\d\d|0?\d?\d),(0|0?\.\d|1(\.0)?)\)$/

/**
 * returns true if the color string is in hex format
 * @param cs - the color string to check
 * @returns true if the color string is in hex format
 */
export const isHexString = (cs: string) => HEX_REGEX.test(cs)

/**
 * returns true if the color string is in rgb or rgba format
 * @param cs - the color string to check
 * @returns true if the color string is in rgb or rgba format
 */
export const isRgbLike = (cs: string) => RGB_REGEX.test(cs) || RGBA_REGEX.test(cs)

/**
 * creates a random number within a given range
 * @param min - the smallest number possible
 * @param max - the max number possible
 * @returns a number between the min and max
 */
const randomNumber = (min=0, max=255) => min + Math.floor(Math.random() * (max - min + 1))

type RandomColorOptions = Pick<HexRGBOptions, 'alpha'> & {
  format: 'hex' | 'rgb'
}
/**
 * generates a random rgb color string
 * @returns an rgb() color string
 */
export const getRandomColor = (options?: RandomColorOptions) => {
  const { alpha, format='hex' } = options ?? {}
  const r = randomNumber(0, 255)
  const g = randomNumber(0, 255)
  const b = randomNumber(0, 255)
  return format === 'hex' 
    ? rgbHex(r, g, b, alpha)
    : alpha ? `rgba(${r},${g},${b},${alpha})`: `rgb(${r},${g},${b})`
}

interface ToColorOptions extends HexRGBOptions {
  /**
   * option to ignore validation error
   */
  ignoreError?: boolean;
}

/**
 * will check a color string and ensure it is in hex format
 * @param cs - the color string
 * @param options - the options for how to handle the color and output
 * @returns the hex string value
 */
export function toHex(cs: string, options?: Omit<ToColorOptions, 'format'>){
  const { ignoreError=false, alpha } = options ?? {}
  if (isRgbLike(cs)){
    return rgbHex(cs)
  }
  if (isHexString(cs)){
    return cs
  }
  if (ignoreError){
    return getRandomColor()
  }
  throw Error(`Invalid color string provided: "${cs}"`)
}

/**
 * will check a color string and ensure that it is in an rgb or rgba format
 * @param cs - the color string
 * @param options - the options for how to handle the color and output
 * @returns the rgb or rgba string value
 */
export function toRGB(cs: string, options: ToColorOptions) {
  const { ignoreError=false, alpha=1, format='array' } = options ?? {}
  if (isHexString(cs)){
    return hexRgb(cs, { alpha, format } as any)
  }
  if (isRgbLike(cs)){
    return cs
  } if (ignoreError){
    return getRandomColor({ format: 'rgb' })
  }
  throw Error(`Invalid color string provided: "${cs}"`)
}

