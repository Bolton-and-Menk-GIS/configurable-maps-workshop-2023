<script setup lang="ts">
import { useAppStore } from "./stores";
import "@/assets/font-awesome"
import "@/assets/styles/style.scss"

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
        style="background-color: orange;"
      >
        sidebar
      </div>

      <!-- main section -->
      <div 
        class="col"
        style="background-color: green;"
      >
        main content
      </div>
      
      <!-- right panel -->
      <div 
        v-if="appStore.rightPaneOpen && !appStore.isSmallDevice" 
        class="col-md-3 col-xl-2 border sidebar" 
        style="background-color: red;"
      >
        sidebar
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
