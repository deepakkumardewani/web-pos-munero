<script setup lang="ts">
import { useStore } from "@/stores";
import { useLocal } from "@/composables/local";
import { onMounted, ref } from "vue";
import moment from "moment";
import router from "@/router";
const store = useStore();
const { getLocal } = useLocal();
const order = store.order;

const currencyMap: { [index: string]: any } = {
  AED: "AED",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const currency = ref<string>("");
const orderDetails = ref<any>({});
const lineItem = ref<any>({});
const cardImage = ref<string>("");
const orderPlaced = ref<string>("");
onMounted(async () => {
  if (Object.keys(order).length > 0) {
    orderPlaced.value = moment(order.creationDate).format("D MMMM YYYY");
    currency.value = currencyMap[order.lineItems[0].currency]
      ? currencyMap[order.lineItems[0].currency]
      : "AED";

    lineItem.value = order.lineItems[0];

    const cards = await getLocal("giftCards");
    const cardFaceImage = cards.find(
      (card: any) => card.id === lineItem.value.cardItemId,
    ).cardFaceImage;
    cardImage.value = cardFaceImage;
  } else {
    console.log("no order");
    router.push("/orders");
  }
});
</script>
<template>
  <div class="tw-m-6 tw-my-20">
    <v-btn to="/orders">
      <font-awesome-icon icon="fa-solid fa-arrow-left" />
    </v-btn>
    <Heading text="Order Details" />
    <v-row>
      <v-container fluid>
        <div class="tw-text-base sm:tw-text-2xl tw-text-gray-600 tw-my-3">
          Ordered on {{ orderPlaced }} | Order #{{ order.id }}
        </div>
        <v-card>
          <v-card-text>
            <div class="tw-p-2">
              <div class="tw-text-2xl tw-font-bold tw-my-3 tw-mb-10">
                Customer Information
              </div>
              <div class="tw-my-1 tw-text-2xl tw-font-semibold">
                {{ order.customerName }}
              </div>
              <div class="tw-my-1 tw-text-xl" v-if="order.emailAddress">
                {{ order.emailAddress }}
              </div>
              <div class="tw-my-2 tw-text-xl" v-if="order.contactNumber">
                {{ order.contactNumber }}
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <div class="tw-text-xl tw-font-bold tw-my-3">Order Status</div>

                <div
                  class="tw-my-3 tw-mb-10 tw-text-3xl"
                  :class="{
                    'tw-text-green-500': lineItem.status === 'success',
                    'tw-text-red-500': lineItem.status === 'failed',
                    'tw-text-orange-500': lineItem.status === 'pending',
                  }"
                >
                  {{ lineItem.status }}
                </div>
                <div class="tw-my-3 tw-text-base">
                  <span class="mr-3 tw-font-bold">Card Item ID: </span
                  >{{ lineItem.cardItemId }}
                </div>
                <div>
                  <img :src="cardImage" width="300" alt="card-image" />
                </div>
              </v-col>
              <v-col cols="6">
                <div class="tw-text-xl tw-font-bold tw-my-3">Order Total</div>
                <div class="tw-my-3 tw-mb-10 tw-text-3xl">
                  <span>{{ currency }}</span>
                  {{ lineItem.value }}
                </div>
                <div class="tw-my-3 tw-text-base">
                  <span class="tw-font-bold tw-mr-3">Settlement Currency: </span
                  >{{ lineItem.settlementCurrency }}
                </div>
                <div class="tw-my-3 tw-text-base">
                  <span class="tw-font-bold tw-mr-3">Exchange Rate:</span
                  >{{ lineItem.exchangeRate }}
                </div>
                <div class="tw-my-3 tw-text-base">
                  <span class="tw-font-bold tw-mr-3">Net Price:</span
                  >{{ lineItem.netPrice }}
                </div>
                <div class="tw-my-3 tw-text-base">
                  <span class="tw-font-bold tw-mr-3">Settlement Price:</span
                  >{{ lineItem.settlementPrice }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-row>
  </div>
</template>
