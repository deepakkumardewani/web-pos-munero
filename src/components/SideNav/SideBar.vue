<script setup lang="ts">
import { useDisplay } from "vuetify";
import { useStore } from "@/stores";
import { useRouter } from "vue-router";
import { useLocal } from "@/composables/local";

const router = useRouter();
const { removeLocal } = useLocal();

const store = useStore();
const { mobile } = useDisplay();

function logout() {
  removeLocal("tokenData");
  router.push("/login");
}
</script>
<template>
  <v-navigation-drawer v-if="mobile" temporary v-model="store.drawer">
    <v-list>
      <v-list-item class="text-center">
        <v-avatar color="grey">
          <font-awesome-icon icon="fa-solid fa-user" />
        </v-avatar>
      </v-list-item>
    </v-list>

    <div class="tw-w-full tw-bg-slate-200 tw-h-[1px]"></div>

    <v-list density="compact" nav>
      <v-list-item to="/catalogue" title="Catalogue"></v-list-item>
      <v-list-item to="/orders" title="Orders"></v-list-item>
      <v-list-item to="/ordering" title="New Order"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout()" block color="info"> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
