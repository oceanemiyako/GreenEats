<script setup>
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/product";
import { useUserStore} from "../stores/user";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const userStore = useUserStore();
const { fetchProductData, addToFavorites, addToHistory } = productStore;
const { currentUser } = storeToRefs(userStore);

const barcode = ref("");
const productFound = reactive([]);

// Fonction appelée à la validation du formulaire.
const fetchProductDataHandler = async () => {
    // On lance une requête pour récupérer les infos du produit et on stocke ces infos dans un tableau.
    productFound.push(await fetchProductData(barcode.value));
    // On ajoute également le code-barres à l'historique de l'utilisateur.
    addToHistory(barcode.value);
};

// Fonction qui vide le tableau productFound et qui reset la value de l'input code-barres.
const clearProductFound = () => {
    productFound.pop();
    barcode.value = "";
};

// Fonction qui ajoute le produit aux favoris de l'utilisateur.
const addProductToFavoritesHandler = async () => {
    await addToFavorites(barcode.value);
};
</script>

<template>
    <!-- L'app est destinée à être utilisée avec la caméra du téléphone. Pour l'instant la recherche se fait vi aune input text. -->
    <!-- Si le tableau productFound est vide on affiche l'input pour la recherche, sinon on affiche les infos du produit. -->
    <div v-if="productFound.length === 0" class="barcode-input">
        <form @submit.prevent="fetchProductDataHandler">
            <div class="label-input">
                <label for="barcode">Code-barres :</label>
                <input class="input-field" v-model="barcode" list="codebar-values" type="text" name="barcode" id="barcode" required/>
                <datalist id="codebar-values">
                    <option value="7622210449283"></option>
                    <option value="3175680011480"></option>
                    <option value="3274080005003"></option>
                </datalist>
            </div>
            <button>Valider</button>
        </form>
    </div>
    <div v-else class="product-display" v-for="p in productFound">
        <p class="product-display__name">{{ p.name }}</p>
        <hr />
        <p class="product-display__marque">{{ p.marque }}</p>

        <div class="product-display__image">
            <img :src="p.img" alt="image" />
        </div>
        Ingrédients :
        <p>{{ p.ingredients }}</p>
        <p class="nutriscore">
            Nutriscore&nbsp;: <span>{{ p.nutriScore }}</span>
        </p>
        <button @click="clearProductFound">Fermer</button>
        <button v-if="currentUser" @click="addProductToFavoritesHandler">Ajouter aux favoris</button>
    </div>
</template>

<style scoped>
.product-display__name {
    font-size: larger;
    font-weight: bold;
}
.product-display__marque {
    font-style: oblique;
}
.product-display__image {
    display: flex;
    align-items: center;
    justify-content: center;
}
.product-display__image img {
    width: 100px;
}

.product-display {
    color: var(--dark-green);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
}
.nutriscore {
    border: 1px solid var(--dark-green);
    border-radius: 2rem;
    padding: 0.25rem 0.5rem;
    align-self: flex-start;
}

.nutriscore span {
    text-transform: capitalize;
}
div.barcode-input {
    height: 100%;

    > form {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
}
div.barcode-input input {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-size: 1rem;
}

div.label-input {
    display: flex;
    flex-flow: column nowrap;

    > label {
        margin-bottom: 5px;
        color: #006633;
        font-weight: bold;
    }
}
</style>
