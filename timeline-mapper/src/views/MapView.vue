<script lang="ts" setup>
import { ref, onMounted, watch, shallowRef, watchEffect } from 'vue'
import { useAppStore } from '@/stores';
import { useMap, useTimeline, useFeatureWidget } from '@/composables'
import { log, formatDate, debounce } from '@/utils'
import Spinner from '@/components/Spinner.vue';
import TimelineSlider from '@/components/TimelineSlider.vue';

const sliderIndex = ref(0)
const esriMap = ref()
const appStore = useAppStore()
const { getTimelineEvents, currentEvent, isLoadingEvents, filterEvents, timelineEvents } = useTimeline()

onMounted(async ()=> {
  // the esriMap template ref should exist now
  const { view, map } = useMap(esriMap.value)

  view.when(()=> {
    const layerInfo = appStore.config.map.timelineInfo.layer
    const lyr = map.allLayers.find(l => layerInfo.id ? l.id === layerInfo.id : l.title == layerInfo.title) as __esri.FeatureLayer | undefined;
    
    if (lyr){
      // the highlight handle
      let highlightHandle: IHandle | undefined = undefined
      view.whenLayerView(lyr).then(async (lyrView: __esri.FeatureLayerView)=> {
        
        log('found layer view: ', lyrView)

        // variable to cache the features from our timeline events
        const features = shallowRef<__esri.Graphic[]>([])

        // prepare to create feature widget
        const { createFeatureWidget } = useFeatureWidget()

        /**
         * watch for changes to the current event. When this updates, we
         * want to render a new Feature widget and also highlight the selected
         * event on the map
         */
        watch(
          ()=> currentEvent.value,
          debounce((evt)=> {
            log('on event change:', evt)
            // show detailed feature view
            if (evt.objectId){
              // fetch the graphic from our cached features
              const graphic = features.value.find(g => g.getObjectId() === evt.objectId)
              createFeatureWidget(graphic)
  
              // highlight the feature if possible
              highlightHandle?.remove()
              highlightHandle = lyrView.highlight(evt.objectId)
            }

            if (evt?.lngLat){
              view.goTo(evt.lngLat, {
                animate: true,
                duration: 500,
                easing: 'ease-in'
              })
            }
          })
        )

        watchEffect(()=> {
          if (filterEvents.value && timelineEvents.value.length){
            const queryFrmt = 'YYYY-MM-DD mm:HH:ss'
            const currentEvtDate = formatDate(currentEvent.value.date, queryFrmt)
            // query dates up to the current event date, having some issues with date query so to
            // be sure we are getting the current event also look for that OID
            const where = `${layerInfo.dateField} <= DATE '${currentEvtDate}' OR ${lyr.objectIdField} = ${currentEvent.value.objectId}`
            // @ts-ignore
            lyrView.filter = {
              where
              // this only works for time aware layers
              // timeExtent: {
              //   start: appState.timelineEvents[0]?.date,
              //   end: currentEvent.value?.date ?? appState.timelineEvents[0]?.date
              // }
            } as Partial<__esri.FeatureFilterProperties>
          } else {
            // @ts-ignore
            lyrView.filter = undefined
          }
        })

        features.value = await getTimelineEvents(lyr)
        createFeatureWidget(features.value[0])
        log(`fetched ${features.value.length} timeline events`)
      })
    }
  })
})
</script>

<template>
  <div class="map-wrapper">
    <div id="esri-map" ref="esriMap"></div>

    <div class="timeline-container">
      <Spinner v-if="isLoadingEvents" style="min-height: 200px"/>
      <TimelineSlider v-else @slider-changed="val => sliderIndex = val" />
    </div>
  </div>
</template>

<style lang="scss">
.map-wrapper {
  width: 100%;
  height: calc(100vh - 300px);
}

#esri-map {
  height: 100%;
  width: 100%;
}
</style>