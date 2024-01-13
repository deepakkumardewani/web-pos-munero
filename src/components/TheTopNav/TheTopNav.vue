<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";

const router = useRouter();
const { mobile } = useDisplay();

function goToDashboard() {
  router.push("/");
}
</script>
<template>
  <v-app-bar>
    <div class="tw-flex tw-flex-1 tw-justify-start">
      <v-btn variant="plain" :ripple="false" flat @click="goToDashboard()">
        <img
          src="@/assets/munero-logo.png"
          class="tw-w-10 tw-h-10"
          :class="{ 'tw-ml-4': !mobile }"
          alt="munero-logo"
        />
      </v-btn>
    </div>
    <div class="tw-flex tw-flex-1 tw-justify-center">
      <TopNavMenu />
    </div>
    <div class="tw-flex tw-flex-1 tw-justify-end tw-pr-2">
      <v-avatar color="grey">
        <font-awesome-icon icon="fa-solid fa-user" />
      </v-avatar>
    </div>
  </v-app-bar>
</template>
