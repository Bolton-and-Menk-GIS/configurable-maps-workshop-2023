import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// default date format
const defaultDateFormat = 'M/D/YYYY'

/**
 * format a date into a human readable string
 * @param d - the input date
 * @param format - the desired {@link https://day.js.org/docs/en/display/format format}
 * @param isUTC - specify if the date is UTC
 * @returns the formatted date string
 * 
 * @example
 * formatDate('2019-01-25', 'DD/MM/YYYY') // '25/01/2019'
 */
export function formatDate(d: Date | number | string, format=defaultDateFormat, isUTC=true){
  return dayjs(d).utc(isUTC).format(format ?? defaultDateFormat)
}

/**
 * BELOW IS PART OF THE OPTIONAL FEATURE FROM THE "How to Handle No Config" portion of Section 5
 */

/**
 * Returns new array of objects sorted by property
 * @see https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
 * @param arr - input array to sort
 * @param prop - property to sort by
 * @param order - order asc (ascending, default) or desc (descending)
 */
export function sortByProperty<T>(arr: T[], prop: keyof T, order: 'asc'|'desc' = 'asc'): Array<T> {
  let first = 1
  let second = -1
  if (order == 'desc'){
    first = first * -1
    second = second * -1
  }
  arr.sort((a, b) => (a[prop] > b[prop] ? first : second)) 
  return arr as T[];
}

/**
 * debounce a function
 * 
 * @see https://blog.webdevsimplified.com/2022-03/debounce-vs-throttle/
 *  
 * @param cb - the callback function
 * @param ms - the time to delay in milliseconds
 * @returns 
 */
export function debounce<F extends (...args: any[]) => void>(cb: F, ms = 250) {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<F>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, ms)
  }
}