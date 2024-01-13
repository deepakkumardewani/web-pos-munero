<script setup lang="ts">
import { ref } from "vue";
const pagesLinks = ref([
  {
    id: "catalogue",
    name: "Catalogue",
    path: "/catalogue",
  },
  {
    id: "orders",
    name: "Orders",
    path: "/orders",
  },
  {
    id: "ordering",
    name: "Ordering",
    path: "/ordering",
  },
]);
</script>
<template>
  <template v-for="page in pagesLinks" :key="page.id">
    <v-btn variant="text" :to="page.path">
      {{ page.name }}
    </v-btn>
  </template>
</template>
