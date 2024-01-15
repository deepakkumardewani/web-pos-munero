import { defineStore } from "pinia";

export const useStore = defineStore("store", () => {
  const order: any = {};
  const card: any = {};
  const drawer: boolean = false;

  return { order, card, drawer };
});
