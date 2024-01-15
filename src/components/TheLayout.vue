<script setup lang="ts"></script>
<template>
  <v-app>
    <SideBar />
    <TheTopNav />
    <v-main class="pa-0">
      <div>
        <slot />
      </div>
    </v-main>
    <TheFooter />
  </v-app>
</template>
