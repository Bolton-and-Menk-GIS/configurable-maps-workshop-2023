<script setup lang="ts">
import "@/assets/styles/style.scss"
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="app container-fluid">
    <!-- header -->
    <div class="row app-navbar">
      <div class="col px-0">
        <AppHeader />
      </div>
    </div>

    <div class="row">
      <!-- left panel -->
      <div class="col-md-2 border sidebar">
        sidebar
      </div>

      <!-- main section -->
      <div class="col-md-8 border">
        main content
      </div>
      
      <!-- right panel -->
      <div class="col-md-2 border sidebar">
        sidebar
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">
@import "@/assets/styles/variables";

.sidebar {
  height: $max-height;
}

.app-navbar {
  height: $navbar-height;
}
</style>
