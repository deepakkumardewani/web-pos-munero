<script setup lang="ts">
import { useApi } from "@/composables/api";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

interface Wallet {
  id: string;
  title: string;
  balance: number;
  currency: string;
  default: boolean;
}
const { get } = useApi();
const toast = useToast();
const wallets = ref<Wallet[]>([]);
const walletId = ref<string>("");
const loading = ref<boolean>(true);

onMounted(async () => {
  const url = "wallets/balances";
  const { data, isFinished, error, isFetching } = await get(url);

  if (isFinished.value) {
    loading.value = isFetching.value;
    if (error.value) {
      toast.error("Error fetching wallets");
    }
    if (data.value) {
      wallets.value = data.value;
      walletId.value = wallets.value[0].id;
    }
  }
});

function seeWalletDetails(wallet: Wallet) {
  walletId.value = wallet.id;
}
</script>
<template>
  <div class="tw-mx-10 tw-mt-24">
    <Heading text="My Wallets" class="tw-my-5" />

    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" lg="4" class="">
        <div v-if="loading">
          <v-skeleton-loader v-for="_ in 3" type="card"></v-skeleton-loader>
        </div>
        <div v-else v-for="wallet in wallets" :key="wallet.id">
          <Wallet :wallet="wallet" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
