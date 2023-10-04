import yaml from 'js-yaml'

/**
 * will make a fetch request to either a JSON or YAML content type (will also return plain text)
 * @param url - the url to fetch
 * @param init - any additional request options
 * @returns the response, will be typed if a typing is given
 */
export async function fetchJson<T = any>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  const contentType = response.headers.get('content-type')
  if (contentType) {
    if (contentType.includes('application/json')){
      return await response.json() as T
    } else if (/(text\/(x-)?ya?ml|application\/(x-)?ya?ml)/gi.test(contentType)) {
      const text = await response.text()
      return yaml.load(text) as T
    } else {
      return await response.text() as any
    }
  } else {
    const text = await response.text()
    try {
      return JSON.parse(text) as T
    } catch (e) {
      return text as any
    }
  }
}