import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { item } from "@/catalog/type";
import axios from "axios";

export const useProductStore = defineStore("product", () => {
    const API_BASE_URL = "http://localhost:7777";
    const favorites = ref<item[]>([]);
    const history = ref<item[]>([]);

    const addToFavorites = (obj: item) => {
        favorites.value.push(obj);
    };

    const addToHistory = (obj: item) => {
        history.value.push(obj);
    };

    const addToFav = async (barcode) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/favorites/add`, { barcode });
            if (result.status === 201) {
                console.log("produit ajouté aux fav");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addToHis = async (barcode) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/history/add`, { barcode });
            if (result.status === 201) {
                console.log("Produit ajouté à l'historique.");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return { favorites, history, addToFavorites, addToHistory, addToFav, addToHis };
});
