import { nextTick, shallowRef } from "vue";
import { useAppStore } from "@/stores";
import { log } from "@/utils";
import Feature from "@arcgis/core/widgets/Feature";

export const useFeatureWidget = ()=> {
  const appStore = useAppStore()
  const widget = shallowRef<__esri.Feature>()
  const elm = document.getElementById('feature-container') as HTMLDivElement;

  const destroyWidget = ()=> {
    widget.value?.destroy()
    widget.value = undefined
    elm?.firstChild?.remove()
  }

  const createFeatureWidget = (graphic?: __esri.Graphic) => {
    log('graphic for feature widget: ', graphic)
   
    if (graphic){
      appStore.rightPaneOpen = true
      
      destroyWidget()

      // create child element for feature widget to go
      const container = document.createElement('div')
      elm.append(container)
      
      // create feature widget for more detailed information
      widget.value = new Feature({
        graphic,
        container
      })
      log('created Feature widget: ', widget.value)
      
    } else {
      const div = document.createElement('div')
      div.classList.add('p-xxl', 'fst-italic', 'fw-light')
      div.textContent = 'No Event Information'
      elm.appendChild(div)
    }
  }

  return { 
    destroyWidget,
    createFeatureWidget
  }
}
