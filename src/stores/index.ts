import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const order: any = {};
  const card: any = {};

  return { order, card };
});
