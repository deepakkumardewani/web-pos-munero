<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useApi } from "@/composables/api";
import { useStore } from "@/stores";

const router = useRouter();
const store = useStore();
const { get } = useApi();
const toast = useToast();

const loading = ref<boolean>(true);
const transactions = ref<any[]>([]);

onMounted(() => {
  if (store.walletId !== "") {
    walletTransactions(store.walletId);
  } else {
    router.push("/");
  }
});
async function walletTransactions(id: string) {
  const url = `wallets/${id}/transactions`;
  const { data, isFinished, error, isFetching } = await get(url);

  if (isFinished.value) {
    loading.value = isFetching.value;
    if (error.value) {
      toast.error("Error fetching wallets");
    }
    if (data.value) {
      transactions.value = data.value.results;
      console.log(data.value);
    }
  }
}
</script>

<template>
  <div class="tw-my-20">
    <Heading text="Wallet Transactions" />
    <div
      v-if="loading"
      class="md:tw-p-10 d-flex flex-wrap justify-space-around"
    >
      <v-skeleton-loader
        class="tw-my-3 tw-mx-2 tw-w-[100%]"
        v-for="_ in 10"
        type="list-item-two-line"
      ></v-skeleton-loader>
    </div>
    <div
      v-else
      class="md:tw-pa-10 tw-p-5 d-flex flex-wrap justify-space-around"
    >
      <Transaction
        v-for="txn in transactions"
        :key="txn.id"
        :transaction="txn"
      />
    </div>
  </div>
</template>

<style scoped></style>
