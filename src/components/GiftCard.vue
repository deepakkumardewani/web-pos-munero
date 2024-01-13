<script setup lang="ts">
import { useRouter } from "vue-router";
import { useOrderStore } from "@/stores/order";

// create map for popular currencies
const currencyMap = {
  AED: "AED",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
const orderStore = useOrderStore();
const router = useRouter();
const currency: string = currencyMap[props.card.currency]
  ? currencyMap[props.card.currency]
  : "AED";

function order(card: any) {
  orderStore.order = card;
  router.push("/ordering");
}
</script>

<template>
  <v-card
    class="my-3 bg-elementBg md:tw-w-[300px] tw-w-[400px]"
    height="350"
    :ripple="false"
  >
    <v-img
      height="200"
      :src="card.cardFaceImage"
      cover
      class="text-white"
    ></v-img>
    <v-card-text class="bg-elementBg">
      <div class="mb-3 text-h6">
        <b>{{ card.brand }}</b>
      </div>
      <div>
        Available from <b>{{ currency }} {{ card.fromValue }}</b> to
        <b>{{ currency }} {{ card.toValue }}</b>
      </div>

      <div class="text-center tw-my-5">
        <v-btn color="info" @click="order(card)">Buy</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
