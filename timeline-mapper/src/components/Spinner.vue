<script lang="ts" setup>
import type { BootstrapColorType } from "@/types";

interface Props {
  message?: string;
  color?: BootstrapColorType;
}

// destructure props with default values
const { message = "Loading...", color = "primary" } = defineProps<Props>();
</script>

<template>
  <div class="spinner-container d-flex flex-column h-100 w-100">
    <div class="d-flex flex-grow-1 justify-content-center align-items-center">
      <div :class="`spinner-border text-${color}`" role="status">
        <span class="visually-hidden">{{ message }}</span>
      </div>
    </div>
  </div>
</template>