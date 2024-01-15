<script setup lang="ts">
import { useApi } from "@/composables/api";
import { onMounted, ref } from "vue";
import { useLocal } from "@/composables/local";
import { useToast } from "vue-toastification";

const { setLocal, getLocal } = useLocal();
const { get } = useApi();
const toast = useToast();

const giftCards = ref<any[]>([]);
const loading = ref<boolean>(true);

onMounted(async () => {
  const localCards = await getLocal("giftCards");
  if (localCards && Object.keys(localCards).length !== 0) {
    loading.value = false;
    giftCards.value = localCards;
  } else {
    const url = "items";
    const params = {
      current: 1,
      rowCount: 100,
      lang: "EN",
      includePricingDetails: true,
    };
    const { data, isFinished, error, isFetching } = await get(url, params);
    if (isFinished.value) {
      if (error.value) {
        toast.error(
          "An error occured fetching the catalogue. Please try again.",
        );
      }
      if (data.value) {
        loading.value = isFetching.value;
        giftCards.value = data.value.items;
        setLocal("giftCards", giftCards.value);
      }
    }
  }
});
</script>
<template>
  <div class="tw-my-20">
    <Heading text="Catalogue" />
    <div v-if="loading" class="pa-10 d-flex flex-wrap justify-space-around">
      <v-skeleton-loader
        class="my-3 md:tw-w-[300px] tw-w-[400px]"
        v-for="_ in 5"
        type="card"
      ></v-skeleton-loader>
    </div>
    <div v-else class="pa-10 d-flex flex-wrap justify-space-around">
      <GiftCard v-for="card in giftCards" :key="card.id" :card="card" />
    </div>
  </div>
</template>
