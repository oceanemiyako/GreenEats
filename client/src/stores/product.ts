import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { item } from "@/catalog/type";

export const useProductStore = defineStore("product", () => {
  const favorites = ref<item[]>([]);
  const history = ref<item[]>([]);

  const addToFavorites = (obj: item) => {
    favorites.value.push(obj);
  };

  const addToHistory = (obj: item) => {
    history.value.push(obj);
  };
  return { favorites, history, addToFavorites, addToHistory };
});
