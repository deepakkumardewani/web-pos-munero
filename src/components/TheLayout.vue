<template>
  <v-app>
    <TheTopNav />
    <v-main>
      <div>
        <slot />
      </div>
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script setup lang="ts"></script>
