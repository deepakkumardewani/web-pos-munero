<script setup lang="ts">
import { useApi } from "@/composables/api";
import VueQrcode from "vue-qrcode";

import { onMounted, ref } from "vue";
import { useOrderStore } from "@/stores/order";
const { post, get } = useApi();
const orderStore = useOrderStore();

const giftCards = ref<any[]>([]);
const isQRVisible = ref<boolean>(false);
const claimURL = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");
const amount = ref<number>(0);
onMounted(async () => {});

function addAmount(amt: string) {
  amount.value = Number(amt);
}

function generateUniqueID() {
  return "id" + Math.random().toString(16).slice(2);
}

async function placeOrder() {
  const url = "placeOrder";
  const uniqueId = generateUniqueID();
  const body = {
    customerName: firstName.value + lastName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    deliveryChannel: "api",
    referenceNo: uniqueId,
    lineItems: [
      {
        cardItemId: orderStore.order.id,
        value: amount.value,
      },
    ],
  };

  const { data, isFinished, error, isFetching } = await post(url, body);
  if (isFinished.value && !error.value) {
    generateQRForClaimURL(uniqueId);
  }
}

async function generateQRForClaimURL(id: string) {
  const url = `orders/${id}`;
  const { data, isFinished, error, isFetching } = await get(url);
  if (isFinished.value && !error.value) {
    claimURL.value = data.value.lineItems[0].claimURL;
    isQRVisible.value = true;
  }
}
</script>
<template>
  <div class="tw-flex tw-justify-center tw-items-center">
    <v-card width="500">
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="firstName"
              label="First Name"
              variant="outlined"
              placeholder="First Name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="lastName"
              label="Last Name"
              variant="outlined"
              placeholder="Last Name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <v-col cols="12">
            <div class="tw-my-3 text-center">
              <v-text-field
                v-model="amount"
                label="Amount"
                variant="outlined"
                placeholder="amount"
                hint="enter your amount between $1 to $1000 or select one from below"
              >
              </v-text-field>
            </div>
            <div class="text-center">
              <v-chip class="tw-mx-2" @click="addAmount('10')">$10</v-chip>
              <v-chip class="tw-mx-2" @click="addAmount('50')">$50</v-chip>
              <v-chip class="tw-mx-2" @click="addAmount('100')">$100</v-chip>
            </div>
            <div class="tw-my-8 text-center">
              <v-btn color="info" @click="placeOrder()">Place Order</v-btn>
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" align="center">
          <VueQrcode v-if="isQRVisible" :value="claimURL" />
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
