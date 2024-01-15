<script setup lang="ts">
import { useTheme } from "vuetify";

const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}
</script>

<template>
  <v-btn id="theme-toggle" icon @click="toggleTheme">
    <font-awesome-icon
      v-if="theme.global.name.value === 'dark'"
      size="xl"
      icon="fa-solid fa-sun"
    />
    <font-awesome-icon v-else size="xl" icon="fa-solid fa-moon" />
  </v-btn>
</template>
