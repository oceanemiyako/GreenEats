import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProductStore = defineStore("product", () => {
    // Les constantes :
    const API_BASE_URL = "http://localhost:7777";
    const favorites = ref([]);
    const history = ref([]);

    // Les méthodes :

    // Fonction pour récupérer les infos d'un produit dans l'API openfoodfacts.
    const fetchProductData = async (param) => {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${param}.json`);
        const data = response.data.product;

        const productInfos = {
            barcode: data.code,
            img: data.image_url,
            marque: data.brands,
            vegan: data.ingredients_analysis,
            name: data.product_name,
            allergens: data.allergens,
            ingredients: data.ingredients_text_debug,
            palmOil: data.ingredients_from_palm_oil_n,
            carbone: data.carbon_footprint_percent_of_known_ingredient_debug,
            nutriScore: data.nutriscore_grade,
        };
        return productInfos;
    };

    // Fonction pour récupérer les favoris d'un utilisateur et les stocker dans un tableau 'favorites'
    const fetchAllFavorites = async () => {
        try {
            // On vide le tableau favoris
            favorites.value = [];
            // On recupère les codes barres stockés dans la BDD
            const result = await axios.get(`${API_BASE_URL}/favorites/getAll`);
            console.log(result.data);
            const barcodes = result.data;
            // On crée une boucle qui, pour chaque code-barres va call la fonction 'fetchProductData' puis pousser les datas dans le tableau.
            for (let i = 0; i < barcodes.length; i++) {
                const infos = await fetchProductData(barcodes[i]);
                favorites.value.push(infos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction pour ajouter un produit aux favoris.
    const addToFavorites = async (barcode) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/favorites/add`, { barcode });
            if (result.status === 201) {
                console.log("produit ajouté aux fav");
                // Une fois que le produit est ajouté à la database on refetch les favoris pour mettre à jour le store.
                fetchAllFavorites();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction pour supprimer un favori.
    const removeFromFavorites = async (param) => {
        try {
            // On utilise le verbe http 'delete'
            const result = await axios.delete(`${API_BASE_URL}/favorites/delete`, { data: { param } });
            if (result.status === 200) {
                console.log("Produit supprimé des favoris.");
                // Si la suppression en BDD est réussi on fait un refetch des favoris pour mettre à jour le store.
                fetchAllFavorites();
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    // Les fonctions suivantes sont construites la même manière mais s'applique à l'historique.
    const fetchAllHistories = async () => {
        try {
            history.value = [];
            const result = await axios.get(`${API_BASE_URL}/history/getAll`);
            console.log(result.data);
            const barcodes = result.data;
            for (let i = 0; i < barcodes.length; i++) {
                const infos = await fetchProductData(barcodes[i]);
                history.value.push(infos);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addToHistory = async (barcode) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/history/add`, { barcode });
            if (result.status === 201) {
                console.log("Produit ajouté à l'historique.");
                fetchAllHistories();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHistory = async () => {
        try {
            const result = await axios.delete(`${API_BASE_URL}/history/deleteAll`);
            if (result.status === 200) {
                console.log("Historique supprimé.");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const searchProducts = async (searchTerm) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/products/search?term=${searchTerm}`);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de la recherche de produits :", error);
            return [];
        }
    };

    return {
        favorites,
        history,
        fetchProductData,
        addToFavorites,
        removeFromFavorites,
        fetchAllFavorites,
        addToHistory,
        fetchAllHistories,
        deleteHistory,
        searchProducts,
    };
});
