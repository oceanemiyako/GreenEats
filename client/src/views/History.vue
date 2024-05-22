<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { history } = storeToRefs(productStore);
const { deleteHistory } = productStore;

// Fonction qui gère l'affichage de la page en fonction du tableau 'history'
const showHistory = computed(() => {
    return history.value.length;
});

// Fonction qui permet de supprimer l'historique complet de l'utilisateur dans la BDD ainsi que dans le store 'product'.
const clearHistoryHandler = () => {
    deleteHistory();
    history.value = [];
};
</script>

<template>
    <div class="content-center empty-list" v-if="!showHistory">
        <p>Aucun historique de recherche.</p>
    </div>
    <div class="container" v-else>
        <button @click="clearHistoryHandler">Effacer l'historique</button>
        <div class="card" v-for="product in history">
            <img :src="product.img" alt="product-image" />
            <p>{{ product.name }}</p>
        </div>
    </div>
</template>

<style scoped>
div.container {
    height: 100%;
}

.empty-list {
    height: 100%;
    color: var(--green);
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    padding: 0 0.5rem 0 0.5rem;
}

div.card {
    height: 20%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: 1px solid black;

    > img {
        height: 80%;
    }
}
</style>
