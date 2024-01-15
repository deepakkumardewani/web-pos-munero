<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import { useLocal } from "@/composables/local";
import { useStore } from "@/stores";

const store = useStore();
const router = useRouter();
const { mobile } = useDisplay();

const { removeLocal } = useLocal();

function goToDashboard() {
  router.push("/");
}

function logout() {
  removeLocal("tokenData");
  router.push("/login");
}
</script>
<template>
  <v-app-bar absolute app>
    <div class="tw-flex tw-flex-1 tw-justify-start">
      <v-btn
        v-if="!mobile"
        variant="plain"
        :ripple="false"
        flat
        @click="goToDashboard()"
      >
        <img
          src="@/assets/munero-logo.png"
          class="tw-w-10 tw-h-10"
          :class="{ 'tw-ml-4': !mobile }"
          alt="munero-logo"
        />
      </v-btn>
      <v-btn
        v-else
        variant="plain"
        :ripple="false"
        flat
        @click="store.drawer = true"
      >
        <font-awesome-icon size="xl" icon="fa-solid fa-bars" />
      </v-btn>
    </div>
    <div v-if="!mobile" class="tw-flex tw-flex-1 tw-justify-center">
      <TopNavMenu />
    </div>
    <div v-else>
      <v-btn variant="plain" :ripple="false" flat @click="goToDashboard()">
        <img
          src="@/assets/munero-logo.png"
          class="tw-w-10 tw-h-10"
          :class="{ 'tw-ml-4': !mobile }"
          alt="munero-logo"
        />
      </v-btn>
    </div>
    <div class="tw-flex tw-flex-1 tw-justify-end tw-pr-2">
      <div>
        <ThemeButton />
      </div>
      <v-menu offset="20">
        <template v-slot:activator="{ props }">
          <div class="tw-flex tw-items-center">
            <v-btn
              v-if="!mobile"
              v-bind="props"
              variant="plain"
              :ripple="false"
            >
              <v-avatar color="grey">
                <font-awesome-icon icon="fa-solid fa-user" />
              </v-avatar>
            </v-btn>
          </div>
        </template>
        <v-list>
          <v-list-item>
            <v-btn @click="logout()" variant="text">Logout</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>
