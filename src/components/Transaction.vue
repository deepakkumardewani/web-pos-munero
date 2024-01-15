<script setup lang="ts">
import moment from "moment";

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
});

const createdDate = moment(props.transaction.createdDate).format("D MMMM YYYY");
</script>
<template>
  <v-card class="tw-my-3 tw-mx-2 tw-w-[100%]" height="250" :ripple="false">
    <v-card-title class="bg-cardTitle">
      <v-row>
        <v-col cols="6" class="tw-flex tw-justify-start">
          <div>
            <div class="tw-text-sm">STATEMENT</div>
            <div class="tw-text-lg">{{ transaction.statement }}</div>
          </div>
        </v-col>
        <v-col cols="6" class="tw-flex tw-justify-end">
          <div>
            <div class="tw-flex tw-justify-end tw-pr-[17px] tw-text-sm">
              TRANSACTION ID
            </div>
            <div class="tw-text-lg">{{ transaction.id }}</div>
          </div>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pa-5">
      <v-row>
        <v-col cols="4" sm="4" class="tw-flex tw-justify-start tw-items-center">
          <div>
            <div class="tw-text-gray-500 tw-text-sm">Debit</div>
            <div class="tw-text-xl">{{ transaction.debit }}</div>
          </div>
        </v-col>
        <v-col cols="4" sm="4" class="tw-flex tw-justify-center tw-items-end">
          <div>
            <div class="tw-text-sm tw-text-gray-500">Created On</div>
            <div class="tw-text-lg">{{ createdDate }}</div>
          </div>
        </v-col>
        <v-col cols="4" sm="4" class="tw-flex tw-justify-end tw-items-end">
          <div>
            <div class="tw-text-gray-500 tw-text-sm">External Ref #</div>
            <div class="tw-text-xl">{{ transaction.externalReferenceNo }}</div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" sm="4" class="tw-flex tw-justify-start tw-items-center">
          <div>
            <div class="tw-text-gray-500 tw-text-sm">Credit</div>
            <div class="tw-text-xl">{{ transaction.credit }}</div>
          </div>
        </v-col>
        <v-col cols="4" sm="4" class="tw-flex tw-justify-center tw-items-end">
          <div>
            <div class="tw-text-gray-500 tw-text-sm">Running Total</div>
            <div class="tw-text-lg">{{ transaction.runningTotal }}</div>
          </div>
        </v-col>
        <v-col cols="4" sm="4" class="tw-flex tw-justify-end tw-items-end">
          <div v-if="transaction.internalReferenceNo">
            <div class="tw-text-gray-500 tw-text-sm">Internal Ref #</div>
            <div class="tw-text-xl">{{ transaction.internalReferenceNo }}</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
