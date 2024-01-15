<script setup lang="ts">
import { useApi } from "@/composables/api";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const { get } = useApi();
const toast = useToast();
const orders = ref<any[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  const url = "orders";
  const params = {
    current: 1,
    rowCount: 100,
  };
  const { data, isFinished, error, isFetching } = await get(url, params);
  if (isFinished.value) {
    if (error.value) {
      toast.error("An error occured fetching your orders. Please try again.");
    }
    if (data.value) {
      loading.value = isFetching.value;
      orders.value = data.value.orders;
    }
  }
});
</script>
<template>
  <div class="tw-mt-20">
    <Heading text="My Orders" />
    <div
      v-if="loading"
      class="md:tw-p-10 d-flex flex-wrap justify-space-around"
    >
      <v-skeleton-loader
        class="tw-my-3 tw-mx-2 md:tw-w-[45%] tw-w-[100%]"
        v-for="_ in 10"
        type="card"
      ></v-skeleton-loader>
    </div>
    <div
      v-else
      class="md:tw-pa-10 tw-p-5 d-flex flex-wrap justify-space-around"
    >
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>
