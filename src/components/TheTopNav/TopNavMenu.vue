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
    name: "New Order",
    path: "/ordering",
  },
]);
</script>
<template>
  <template v-for="page in pagesLinks" :key="page.id">
    <v-btn class="md:tw-mx-4" variant="text" :to="{ name: page.id }">
      {{ page.name }}
    </v-btn>
  </template>
</template>
