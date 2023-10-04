<script setup lang="ts">
import "@/assets/font-awesome"
import "@/assets/styles/style.scss"
import { defineAsyncComponent } from "vue";
import { useAppStore } from "@/stores";
import { useTimeline } from "@/composables";
import AppHeader from '@/components/AppHeader.vue'
import Spinner from "@/components/Spinner.vue";
import TimelineList from "./components/TimelineList.vue";
const MapView = defineAsyncComponent(()=> import('@/views/MapView.vue'))
const appStore = useAppStore()

const { isLoadingEvents } = useTimeline()
</script>

<template>
  <div class="app container-fluid">
    <!-- header -->
    <div class="row app-navbar">
      <div class="col px-0">
        <AppHeader />
      </div>
    </div>

    <div class="row main-content-row">
      <!-- left panel -->
      <div 
        v-show="appStore.leftPaneOpen && !appStore.isSmallDevice" 
        class="col-md-3 col-xl-2 border sidebar" 
      >
        <Spinner v-if="isLoadingEvents" class="mx-auto my-auto"/>
        <TimelineList />
      </div>

      <!-- main section -->
      <div class="col">
        <Suspense>
          <MapView />    
          <template #fallback>
            <div class="w-100 h-100" style="min-height: 700px;">
              <Spinner class="mx-auto my-auto" />
            </div>
          </template>
        </Suspense>
      </div>
      
      <!-- right panel -->
      <div 
        v-show="appStore.rightPaneOpen && !appStore.isSmallDevice" 
        class="col-md-3 col-xl-2 border sidebar" 
      >
          <Spinner v-if="isLoadingEvents" class="mx-auto my-auto"/>
          <div class="feature-container p-2" id="feature-container"></div>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">
@import "@/assets/styles/variables";

.main-content-row {
  height: $max-height;
}

.app-navbar {
  height: $navbar-height;
}
</style>
