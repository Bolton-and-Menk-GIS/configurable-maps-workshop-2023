<script lang="ts" setup>
import { useAppStore } from '@/stores';
const appState = useAppStore()
</script>

<!-- src/components/DarkModeToggle.vue -->
<template>
  <div class="d-flex dark-mode-toggle px-1 cursor-pointer">
    <div class="form-check form-switch"
      v-popover="{ content: 'Toggle dark mode' }"
    >
      <input 
        v-model="appState.darkMode"
        class="form-check-input" 
        type="checkbox" 
        role="switch" 
        id="flexSwitchCheckDefault" 
      >
      <label class="form-check-label" for="flexSwitchCheckDefault">
        <font-awesome-icon icon="fa-solid fa-circle-half-stroke" class="upside-down"/>
      </label>
    </div>
  </div>
</template>

<!-- src/components/DarkModeToggle.vue -->
<style>
  .dark-mode-toggle {
    color: white;
    border-radius: 4px;
  }

  .upside-down {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: "FlipH";
  }
</style>