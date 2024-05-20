<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";
import Details from "@/components/Details.vue";

const productStore = useProductStore();
const { favorites } = storeToRefs(productStore);
const { fetchProductData } = productStore;

const favoritesInfos = ref([]);

const showFavorites = computed(() => {
    return favorites.value.length;
});

const showProductDetails = ref("");
const productInModal = ref();

const modalHandler = (product) => {
    showProductDetails.value = "show";
    productInModal.value = product;
};
</script>

<template>
    <div class="content-center empty-list" v-if="!showFavorites">
        <p>Aucun produit enregistré dans les favoris.</p>
    </div>
    <div v-else class="card" v-for="favorite in favorites" @click="modalHandler(favorite)">
        <img class="fav-icon" src="@/img/favorite_active.png" alt="fav-icon" />
        <img class="img-product" :src="favorite.img" alt="product-img" />
        <ul>
            <li class="li-name">{{ favorite.name }}</li>
            <li class="li-brand">{{ favorite.marque }}</li>
        </ul>
    </div>
    <Details v-if="showProductDetails === 'show'" :product="productInModal" @close-modal="showProductDetails = ''" />
</template>

<style scoped>
.empty-list {
    height: 100%;
    color: var(--green);
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    padding: 0 0.5rem;
}

.card {
    height: 15%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 0 0.5rem;
    border-bottom: 1px solid var(--green);

    > .fav-icon {
        width: 10%;
        padding: 0.1rem;
    }

    > .img-product {
        max-height: 100%;
        width: 20%;
        padding-left: 0.3rem;
    }

    > ul {
        width: 70%;
        list-style-type: none;
        padding-left: 0.3rem;

        > .li-name {
            font-weight: bold;
            color: var(--dark-green);
        }

        > .li-brand {
            color: var(--green);
            font-style: italic;
        }
    }
}
</style>
