<script setup lang="ts">
import { useApi } from "@/composables/api";
import { onMounted, ref } from "vue";

const { get } = useApi();
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
    loading.value = isFetching.value;
    orders.value = data.value.orders;
  }
});
</script>
<template>
  <div>
    <Heading text="My Orders" />
    <div v-if="loading" class="pa-10 d-flex flex-wrap justify-space-around">
      <v-skeleton-loader
        class="tw-my-3 tw-mx-2 md:tw-w-[45%] tw-w-[100%]"
        v-for="_ in 10"
        type="card"
      ></v-skeleton-loader>
    </div>
    <div v-else class="pa-10 d-flex flex-wrap justify-space-around">
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>
