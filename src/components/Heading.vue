<template>
  <div class="text-center">
    <div class="tw-text-3xl tw-font-bold">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
