<script lang="ts" setup>
import { useTimeline } from '@/composables';

const { 
  eventIndex,
  timelineEvents, 
  currentEvent, 
  filterEvents,
  nextEvent, 
  previousEvent 
} = useTimeline()

</script>

<template>
  <div class="timeline-slider-container border-top p-4">
    <label
      v-if="currentEvent"
      for="timeline-slider"
      class="mb-2 w-100 inline-block text-neutral-700 dark:text-neutral-200"
      >
        <div class="event-title text-center">{{ currentEvent.formattedDate }} - {{ currentEvent.title }}</div>
        <div class="event-subtitle text-center">{{ currentEvent.subtitle }}</div>
      </label
    >
    <div class="slider d-flex justify-content-between">
      <button 
        type="button" 
        class="btn bg-primary btn-circle text-white me-2"
        v-popover="{ content: 'Filter map features by timeline', placement: 'top' }"
        @click="filterEvents = !filterEvents"
      >
      <font-awesome-icon :icon="`fa-solid fa-${filterEvents ? 'filter-circle-xmark': 'filter'}`"></font-awesome-icon>
      </button>

      <button 
        type="button" 
        class="btn bg-primary btn-circle text-white"
        :disabled="eventIndex === 0"
        v-popover="{ content: 'Previous event', placement: 'top' }"
        @click="previousEvent"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-left"></font-awesome-icon>
      </button>
      <input
        v-model.number="eventIndex"
        type="range"
        class="form-range mx-3"
        id="timeline-slider" 
        min="0"
        :max="timelineEvents.length-1"
      />
      <button 
        type="button" 
        class="btn bg-primary btn-circle text-white"
        :disabled="eventIndex === (timelineEvents.length - 1)"
        v-popover="{ content: 'Next event', placement: 'top' }"
        @click="nextEvent"
      >
        <font-awesome-icon icon="fa-solid fa-chevron-right"></font-awesome-icon>
      </button>
    </div>
    <div class="event-info mt-2">
      <div class="description">
        <p>{{ currentEvent?.description }}</p>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
.timeline-slider-container {
  max-height: 250px;
}

.event-info {
  max-height: 100px;
  overflow-y: auto;
}

.description {
  font-size: 0.9rem;
}
</style>