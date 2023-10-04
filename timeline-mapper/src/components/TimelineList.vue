<script lang="ts" setup>
import { watch, nextTick } from 'vue'
import { useTimeline } from '@/composables';
import { log, debounce } from '@/utils';
import TimelineListItem from './TimelineListItem.vue';

const { eventIndex, currentEvent, timelineEvents } = useTimeline()

const onEventClick = (index: number) => {
  eventIndex.value = index
  log('user clicked on event')
}

watch(
  ()=> currentEvent.value,
  debounce((event)=> {
    const elm = document.getElementById(`timeline-event-${event?.objectId}`)
    if (elm){
      log('scrolling to active event in timeline list', elm)
      nextTick(()=> elm.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    }
  })
)
</script>

<template>
  <ol class="list-group list-group-numbered timeline-event-list p-2">
    <TimelineListItem 
      :key="event.objectId"
      v-for="(event, i) in timelineEvents"
      :active="i === eventIndex"
      :event="event"
      @user-clicked-event="onEventClick(i)"
    />
  </ol>
</template>

<style lang="scss">
@import "../assets/styles/variables";

.timeline-event-list {
  max-height: $max-content-height;
  overflow-y: auto;
}
</style>