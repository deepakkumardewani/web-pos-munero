<script setup lang="ts">
import { useApi } from "@/composables/api";
import { onMounted, ref } from "vue";
import { useLocal } from "@/composables/local";

const { setLocal, getLocal } = useLocal();
const { get } = useApi();

const giftCards = ref<any[]>([]);

onMounted(async () => {
  console.log("Catalog page mounted");
  const localCards = await getLocal("giftCards");
  if (localCards && Object.keys(localCards).length !== 0) {
    console.log("Fetching from local storage");

    giftCards.value = localCards;
  } else {
    console.log("Fetching from API");

    const url = "items";
    const params = {
      current: 1,
      rowCount: 100,
      lang: "EN",
      includePricingDetails: true,
    };
    const { data, isFinished, error, isFetching } = await get(url, params);
    if (isFinished.value) {
      giftCards.value = data.value.items;
      setLocal("giftCards", giftCards.value);
      console.log(giftCards.value);
    }
  }
});
</script>
<template>
  <div>
    <div class="pa-10 d-flex flex-wrap justify-space-around">
      <GiftCard v-for="card in giftCards" :key="card.id" :card="card" />
    </div>
  </div>
</template>
