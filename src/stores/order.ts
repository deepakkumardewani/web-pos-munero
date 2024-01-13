import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  const order: any = {};

  return { order };
});
