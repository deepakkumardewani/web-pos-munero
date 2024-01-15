<script setup lang="ts">
import router from "@/router";
import { PropType, onMounted, ref } from "vue";

import { useStore } from "@/stores";
const store = useStore();
interface Wallet {
  id: string;
  title: string;
  balance: number;
  currency: string;
  default: boolean;
}

const props = defineProps({
  wallet: {
    type: Object as PropType<Wallet>,
    required: true,
  },
});

const isActive = ref<boolean>(false);

function showTransactions() {
  router.push("/transactions");
  store.walletId = props.wallet.id;
}

onMounted(async () => {
  console.log("Wallet page mounted");
});
</script>
<template>
  <v-card class="text-center" variant="elevated">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{ wallet.title }}
        </div>
        <div class="text-h6 mb-1">
          Balance: $ <span>{{ wallet.balance }}</span>
        </div>
      </div>
    </v-card-item>
    <v-card-actions class="tw-flex tw-justify-center">
      <v-btn @click="showTransactions()" variant="text" color="info">
        See Wallet Transactions
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
