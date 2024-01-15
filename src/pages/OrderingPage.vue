<script setup lang="ts">
import { useApi } from "@/composables/api";
import VueQrcode from "vue-qrcode";
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { useLocal } from "@/composables/local";

const { getLocal } = useLocal();
const toast = useToast();
import { useStore } from "@/stores";
import { countries, languages } from "@/utils";
const { post, get } = useApi();
const store = useStore();

const rules = {
  required: (value: string) => !!value || "Required.",
};

const loading = ref<boolean>(false);
const isQRVisible = ref<boolean>(false);
const claimURL = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");
const amount = ref<number>();
const cardItemId = ref<string>("");
const cardItems = ref<any[]>([]);
const contactNumber = ref<string>("");
const deliveryChannel = ref<string>("api");
const smsMobileNumber = ref<string>("");
const language = ref<string>("EN");
const country = ref<string>("AE");
const emailAddress = ref<string>("");
const countryCodes = ref<string[]>(countries);
const languageCodes = ref<string[]>(languages);
onMounted(async () => {
  if (store.card) {
    cardItemId.value = store.card.id;
  }
  const localCards = await getLocal("giftCards");
  if (localCards && Object.keys(localCards).length !== 0) {
    cardItems.value = localCards.map((item: any) => item.id);
  }
});

function addAmount(amt: string) {
  amount.value = Number(amt);
}

function generateUniqueID() {
  return "id" + Math.random().toString(16).slice(2);
}

async function placeOrder() {
  loading.value = true;
  const url = "placeOrder";
  const uniqueId = generateUniqueID();
  const body = {
    customerName: firstName.value + lastName.value,
    firstName: firstName.value,
    lastName: lastName.value,
    referenceNo: uniqueId,
    deliveryChannel: deliveryChannel.value,
    smsMobileNumber: smsMobileNumber.value,
    emailAddress: emailAddress.value,
    countryCode: country.value,
    languageCode: language.value,
    lineItems: [
      {
        cardItemId: cardItemId.value,
        value: amount.value,
      },
    ],
  };

  const { data, isFinished, error, isFetching } = await post(url, body);
  if (isFinished.value) {
    loading.value = isFetching.value;
    if (error.value) {
      toast.error("An error occured placing your order. Please try again.");
    }
    if (data.value) {
      reset();
      generateQRForClaimURL(uniqueId);
    }
  }
}

async function generateQRForClaimURL(id: string) {
  const url = `orders/${id}`;
  const { data, isFinished, error, isFetching } = await get(url);
  if (isFinished.value) {
    if (error.value) {
      toast.error("Error fetching order");
    }
    if (data.value) {
      claimURL.value = data.value.lineItems[0].claimURL;
      isQRVisible.value = true;
    }
  }
}

function reset() {
  firstName.value = "";
  lastName.value = "";
  amount.value = 0;
  cardItemId.value = "";
  contactNumber.value = "";
  deliveryChannel.value = "api";
  smsMobileNumber.value = "";
  language.value = "EN";
  country.value = "AE";
  emailAddress.value = "";
  claimURL.value = "";
}
</script>
<template>
  <div class="tw-my-24">
    <Heading text="New Order" />
    <div class="tw-flex tw-justify-center tw-items-center">
      <v-card width="500" class="my-3">
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="firstName"
                label="First Name"
                variant="outlined"
                placeholder="First Name"
                :rules="[rules.required]"
                required
              >
                <template #label>
                  <span class="tw-text-red-500"><strong>* </strong></span>First
                  Name
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="lastName"
                label="Last Name"
                variant="outlined"
                placeholder="Last Name"
                :rules="[rules.required]"
              >
                <template #label>
                  <span class="tw-text-red-500"><strong>* </strong></span>Last
                  Name
                </template></v-text-field
              >
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="6">
              <v-text-field
                v-model="contactNumber"
                type="number"
                label="Contact Number"
                variant="outlined"
                placeholder="Contact Number"
                hide-spin-buttons
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                variant="outlined"
                label="Delivery Channel"
                v-model="deliveryChannel"
                :items="['email', 'sms', 'api']"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="6">
              <v-text-field
                v-model="smsMobileNumber"
                type="number"
                label="SMS Mobile Number"
                variant="outlined"
                placeholder="SMS Mobile Number"
                hide-spin-buttons
              >
                <template v-if="deliveryChannel === 'sms'" #label>
                  <span class="tw-text-red-500"><strong>* </strong></span>SMS
                  Mobile Number
                </template></v-text-field
              >
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="emailAddress"
                label="Email Address"
                variant="outlined"
                placeholder="Email Address"
              >
                <template v-if="deliveryChannel === 'email'" #label>
                  <span class="tw-text-red-500"><strong>* </strong></span>Email
                  Address
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="6">
              <v-select
                variant="outlined"
                label="Country codes"
                v-model="country"
                :items="countryCodes"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                variant="outlined"
                label="Language Codes"
                v-model="language"
                :items="languageCodes"
              >
              </v-select>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <v-select
                variant="outlined"
                label="Card Item ID"
                v-model="cardItemId"
                :rules="[rules.required]"
                :items="cardItems"
              >
                <template #label>
                  <span class="tw-text-red-500"><strong>* </strong></span>Card
                  Item ID
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col cols="12">
              <div class="tw-my-3 text-center">
                <v-text-field
                  v-model="amount"
                  type="number"
                  label="Amount"
                  variant="outlined"
                  placeholder="amount"
                  hint="enter your amount between $1 to $1000 or select one from below"
                  hide-spin-buttons
                  :rules="[rules.required]"
                >
                  <template #label>
                    <span class="tw-text-red-500"><strong>* </strong></span
                    >Amount
                  </template>
                </v-text-field>
              </div>
              <div class="text-center">
                <v-chip class="tw-mx-2 tw-mt-2" @click="addAmount('10')"
                  >$10</v-chip
                >
                <v-chip class="tw-mx-2 tw-mt-2" @click="addAmount('20')"
                  >$20</v-chip
                >
                <v-chip class="tw-mx-2 tw-mt-2" @click="addAmount('50')"
                  >$50</v-chip
                >
                <v-chip class="tw-mx-2 tw-mt-2" @click="addAmount('100')"
                  >$100</v-chip
                >
                <v-chip class="tw-mx-2 tw-mt-2" @click="addAmount('500')"
                  >$500</v-chip
                >
                <v-chip class="tw-mx-2 tw-mt-2" @click="addAmount('1000')"
                  >$1000</v-chip
                >
              </div>
              <div class="tw-my-8 text-center">
                <v-btn
                  :disabled="!firstName || !lastName || !cardItemId || !amount"
                  color="info"
                  :loading="loading"
                  @click="placeOrder()"
                  >Place Order</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <VueQrcode v-if="isQRVisible" :value="claimURL" />
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
