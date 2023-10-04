// src/assets/bootstrap/index.ts
import '@popperjs/core'
import type { DirectiveBinding, Directive } from 'vue'
import { 
  Popover
} from 'bootstrap'

export type PopoverProps = Partial<Popover.Options>;

const DefaultOptions: Partial<Popover.Options> = {
  trigger: 'hover',
  placement: 'auto',
  title: ''
}
/**
 * Directive used to initialize Popover (must be done manually for performance reasons)
 */
export const PopoverDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<PopoverProps>){
    console.log('initializing Popover Directive with the following options: ', binding.value, ' on the target element: ', el)
    const options: PopoverProps = {
      ...DefaultOptions,
      ...(binding.value ?? {})
    }
    el.setAttribute('data-bs-toggle', 'tooltip')
    el.setAttribute('data-bs-trigger', options.trigger ?? 'focus')
    const popover = new Popover(el, options)
    return popover
  },

  unmounted(el: HTMLElement){
    const attrs = ['data-bs-toggle', 'data-bs-trigger']
    for (const attr of attrs){
      el.removeAttribute(attr)
    }
  }
} as Directive<HTMLElement, PopoverProps>;