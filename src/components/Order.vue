<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStore } from "@/stores";
import { onMounted } from "vue";
import moment from "moment";
const store = useStore();
const router = useRouter();
const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

// create map for popular currencies
const currencyMap: { [index: string]: any } = {
  AED: "AED",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const currency: string = currencyMap[props.order.lineItems[0].currency]
  ? currencyMap[props.order.lineItems[0].currency]
  : "AED";

const orderPlaced = moment(props.order.creationDate).format("D MMMM YYYY");
const total = props.order.lineItems[0].value;
const orderId = props.order.id;
const customerName = props.order.customerName;
const status = props.order.lineItems[0].status;
const refNo = props.order.referenceNo;
onMounted(() => {});

function viewOrderDetails(order: any) {
  store.order = order;
  router.push("/order-detail");
}
</script>

<template>
  <v-card
    class="tw-my-3 tw-mx-2 md:tw-w-[45%] tw-w-[100%]"
    height="250"
    :ripple="false"
  >
    <v-card-title class="bg-cardTitle">
      <v-row>
        <v-col cols="6" class="tw-flex tw-justify-start">
          <div>
            <div class="tw-text-sm">ORDER PLACED</div>
            <div class="tw-text-lg">{{ orderPlaced }}</div>
          </div>
        </v-col>

        <v-col cols="6" class="tw-flex tw-justify-end">
          <div>
            <div class="tw-flex tw-justify-end tw-pr-[17px] tw-text-sm">
              ORDER # {{ orderId }}
            </div>
            <v-btn variant="tonal" @click="viewOrderDetails(order)"
              >View Order Details</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <v-row>
        <v-col
          cols="9"
          sm="10"
          class="tw-flex tw-justify-start tw-items-center"
        >
          <div>
            <div class="tw-text-gray-500 tw-text-sm">FOR</div>
            <div class="tw-text-xl">{{ customerName }}</div>
          </div>
        </v-col>
        <v-col cols="3" sm="2" class="tw-flex tw-justify-start tw-items-end">
          <div>
            <div class="tw-text-gray-500 tw-text-sm">TOTAL</div>
            <div class="tw-text-xl">{{ currency }}{{ total }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="9"
          sm="10"
          class="tw-flex tw-justify-start tw-items-center"
        >
          <div>
            <div class="tw-text-gray-500 tw-text-sm">REF #</div>
            <div class="tw-text-xl">{{ refNo }}</div>
          </div>
        </v-col>
        <v-col cols="3" sm="2" class="tw-flex tw-justify-start tw-items-end">
          <div>
            <div class="tw-text-gray-500 tw-text-sm">STATUS</div>
            <div class="tw-text-xl">{{ status }}</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
