import { ref, computed, shallowRef } from "vue"
import { useAppStore } from "@/stores"
import { log, formatDate } from "@/utils"
import type { TimelineEvent, EsriQuery } from '@/types'
import { useArcade } from "./arcade"

/**
 * the list of timeline events
 */
const timelineEvents = shallowRef<TimelineEvent[]>([])

/**
 * the current event index
 */
const eventIndex = ref(0)

/**
 * the current timeline event
 */
const currentEvent = computed(()=> timelineEvents.value[eventIndex.value])

/**
 * is true until events have loaded
 */
const isLoadingEvents = ref(true)

/**
 * option to filter the events to only show events
 * up to the current event
 */
const filterEvents = ref(false)


/**
 * helper functions to use timeline events
 */
export const useTimeline = () => {
  const appStore = useAppStore()

  /**
   * go to the next event
   */
  const nextEvent = ()=> {
    if (eventIndex.value >= timelineEvents.value.length - 1) return;
    eventIndex.value++
  }
  
  /**
   * go to the previous event
   */
  const previousEvent = ()=> {
    if (!eventIndex.value) return;
    eventIndex.value--
  }

  /**
   * 
   * @param script 
   * @returns 
   */

  const getTimelineEvents = async (lyr: __esri.FeatureLayer) => {
    const mapConfig = appStore.config.map
    const { timelineInfo } = mapConfig
    const layerInfo = timelineInfo.layer

    // get the query options
    const queryParams = { 
      where: `${layerInfo.dateField} is not null`,
      ...(layerInfo.query ?? {}) as any,
      outFields: ['*'], 
      returnGeometry: true, 
      orderByFields: [layerInfo.dateField] 
    } as EsriQuery

    const { features } = await lyr.queryFeatures(queryParams)

    /**
     * set layer definition to match the `where` clause so 
     * the timeline event list jives with what is in the map
     */
    lyr.definitionExpression = queryParams.where!
    

    // get executors
    const titleExec = await useArcade(timelineInfo.titleExpression)

    const subTitleExec = timelineInfo.subtitleExpression 
      ? await useArcade(timelineInfo.subtitleExpression)
      : undefined

    const descriptionExec = timelineInfo.descriptionExpression 
      ? await useArcade(timelineInfo.descriptionExpression)
      : undefined

    // get timeline events
    log('example feature: ', features[0])
    timelineEvents.value = features
      .filter(f => f.attributes[layerInfo.dateField])
      .map(f => {
        const date = f.attributes[layerInfo.dateField]
        const lngLat: [number, number] | undefined = f.geometry 
          ? f.geometry?.type === 'point'
            // @ts-ignore
            ? [f.geometry.longitude, f.geometry.latitude]
            // @ts-ignore
            : [f.geometry.centroid.longitude, f.geometry.centroid.latitude]
          : undefined
        return {
          date,
          lngLat,
          title: titleExec.executeForFeature(f),
          subtitle: subTitleExec?.executeForFeature(f),
          description: descriptionExec?.executeForFeature(f),
          objectId: f.getObjectId() ?? f.attributes[lyr.objectIdField],
          formattedDate: formatDate(date, timelineInfo.dateFormat)
        } as TimelineEvent
      })

    isLoadingEvents.value = false
    return features
  }

  return { 
    eventIndex,
    currentEvent,
    timelineEvents,
    filterEvents,
    isLoadingEvents,
    nextEvent,
    previousEvent,
    getTimelineEvents,
  }
}