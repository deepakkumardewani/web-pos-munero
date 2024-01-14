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
