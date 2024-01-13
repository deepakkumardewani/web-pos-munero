<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";

interface Wallet {
  id: string;
  title: string;
  balance: number;
  currency: string;
  default: boolean;
}

defineProps({
  wallet: {
    type: Object as PropType<Wallet>,
    required: true,
  },
});

onMounted(async () => {
  console.log("Wallet page mounted");
});
</script>
<template>
  <v-card class="text-center" variant="elevated">
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{ wallet.title }}
        </div>
        <div class="text-h6 mb-1">
          Balance: $ <span>{{ wallet.balance }}</span>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>

<style scoped></style>
