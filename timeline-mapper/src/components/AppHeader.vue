<script lang="ts" setup>
import { useAppStore } from '@/stores';
import DarkModeToggle from '@/components/DarkModeToggle.vue'
const appStore = useAppStore()
</script>

<template>
  <header>
    <nav :class="`navbar navbar-${appStore.theme} app-navbar bg-primary`">
      <div class="container-fluid">
        <span class="float-right d-flex justify-content-between mt-1">
          <font-awesome-icon 
            v-if="!appStore.isSmallDevice"
            icon="fa-solid fa-list"
            color="white"
            v-popover="{ content: 'toggle timeline list panel' }"
            @click="appStore.togglePanel('left')"
          />
        </span>
        <span class="navbar-brand mb-0 h1 text-light">{{ appStore.config.app.title }}</span>
        
        <span class="float-right d-flex justify-content-between mt-1 align-middle">
          <DarkModeToggle />
          <font-awesome-icon 
            v-if="!appStore.isSmallDevice"
            icon="fa-solid fa-bars"
            color="white"
            class="mt-1 ms-2"
            v-popover="{ content: 'toggle event information panel' }"
            @click="appStore.togglePanel('right')"
          />
        </span>
      </div>
    </nav>
  </header>
</template>
