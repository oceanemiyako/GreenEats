import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { item } from "@/catalog/type";

export const useProductStore = defineStore("product", () => {
  const products = ref<item[]>([]);
  const history = ref<item[]>([]);

  const addToProduct = (obj: item) => {
    products.value.push(obj);
  };

  const addToHistory = (obj: item) => {
    history.value.push(obj);
  };
  return { products, history, addToProduct, addToHistory };
});
