<script setup lang="ts">
import { useApi } from "@/composables/api";
import { onMounted, ref } from "vue";

interface Wallet {
  id: string;
  title: string;
  balance: number;
  currency: string;
  default: boolean;
}

const wallets = ref<Wallet[]>([]);
const walletId = ref<string>("");

onMounted(async () => {
  const { get } = useApi();
  const url = "wallets/balances";

  const { data, isFinished, error, isFetching } = await get(url);

  if (isFinished.value) {
    wallets.value = data.value;
    walletId.value = wallets.value[0].id;
  }
});

function seeWalletDetails(wallet: Wallet) {
  walletId.value = wallet.id;
}
</script>
<template>
  <div class="tw-mx-10 tw-mt-5">
    <v-row v-if="wallets.length > 0" align="center" justify="center">
      <v-col
        cols="12"
        sm="6"
        lg="4"
        class="tw-bg-gray-200 tw-font-bold tw-text-2xl"
      >
        My Wallets
      </v-col>
    </v-row>
    <v-row v-if="wallets.length > 0" align="center" justify="center">
      <v-col cols="12" sm="6" lg="4" class="tw-bg-gray-200">
        <div v-for="wallet in wallets" :key="wallet.id">
          <Wallet :wallet="wallet" />
        </div>
      </v-col>
      <!-- <v-col cols="8">
        <WalletDetails :walletId="walletId" />
      </v-col> -->
    </v-row>
  </div>
</template>
