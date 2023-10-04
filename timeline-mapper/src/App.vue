<!-- App.vue -->
<script setup lang="ts">
import "@/assets/styles/style.scss"
import "@/assets/font-awesome"
import { useAppStore } from "@/stores";
import AppHeader from '@/components/AppHeader.vue'

const appStore = useAppStore()
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
        v-if="appStore.leftPaneOpen && !appStore.isSmallDevice" 
        class="col-md-3 col-xl-2 border sidebar" 
      >
        sidebar
      </div>

      <!-- main section -->
      <div 
        class="col"
      >
        main content
      </div>
      
      <!-- right panel -->
      <div 
        v-if="appStore.rightPaneOpen && !appStore.isSmallDevice" 
        class="col-md-3 col-xl-2 border sidebar"
      >
        sidebar
      </div>
    </div>
  </div>
  
</template>

<!-- src/App.vue -->
<style lang="scss">
@import "@/assets/styles/variables";

.main-content-row {
  height: $max-height;
}

.app-navbar {
  height: $navbar-height;
}
</style>