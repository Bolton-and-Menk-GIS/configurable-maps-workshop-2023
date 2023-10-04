<script lang="ts" setup>
import type { TimelineEvent } from '@/types'

interface Props {
  event: TimelineEvent;
  active: boolean; 
}

// destructure and assign active to false by default
const { event, active=false } = defineProps<Props>()

const emit = defineEmits<{
  'user-clicked-event': [event: TimelineEvent ]
}>()

</script>

<template>
  <li 
    :class="{ 'list-group-item-secondary': active }"
    class="list-group-item d-flex justify-content-between align-items-start cursor-pointer"
    @click="emit('user-clicked-event', event)"
  >
    <div class="ms-2 me-auto">
      <a class="link-primary" href="#" :id="`timeline-event-${event.objectId}`">
        {{ event.title }}
      </a>
      <p>{{ event.subtitle }}</p>
      <p class="fst-italic text-secondary" style="font-size: 0.8rem;">{{ event.formattedDate }}</p>
    </div>
  </li>
</template>