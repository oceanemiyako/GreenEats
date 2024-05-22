<script setup>
import { useProductStore } from "@/stores/product";

// Props et eimts qui permettent de passer des datas depuis le parent vers cette modal et un event vers le parent pour fermer la modal.
const props = defineProps(["product"]);
const emits = defineEmits(["close-modal"]);
const productStore = useProductStore();
const { removeFromFavorites } = productStore;

// Fonction qui supprime cet élément des favoris de l'utilisateur et qui ensuite ferme la modal.
const deleteFavHandler = async () => {
    const barcode = props.product.barcode;
    await removeFromFavorites(barcode);
    emits("close-modal");
};
</script>

<template>
    <div class="modal-bg" @click.self="$emit('close-modal')">
        <div class="modal-content">
            <p class="font-larger font-bold">{{ product.name }}</p>
            <hr />
            <p class="font-oblique">{{ product.marque }}</p>
            <div class="product-img">
                <img :src="product.img" alt="product-img" />
            </div>
            <p class="font-bold">Ingrédients :</p>
            <p>{{ product.ingredients }}</p>
            <div class="nutriscore">
                <span> Nutriscore&nbsp;:</span> <span>{{ product.nutriScore }}</span>
            </div>
            <button @click="$emit('close-modal')">Fermer</button>
            <button @click="deleteFavHandler">Supprimer</button>
        </div>
    </div>
</template>

<style scoped>
.modal-bg {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    height: 80%;
    width: 95%;
    padding: 5%;
    border: solid 4px var(--font-color-white);
    border-radius: 1rem;
    background-color: var(--green);
    overflow: scroll;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
}

div.product-img {
    height: 25%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    > img {
        height: 90%;
        border-radius: 1rem;
    }
}

.nutriscore {
    border: 2px solid black;
    border-radius: 2rem;
    padding: 0.25rem 0.5rem;
    align-self: center;
    margin-top: 0.5rem;
}

.nutriscore span {
    text-transform: capitalize;
}

hr {
    width: 100%;
}

button {
    align-self: center;
    margin-top: 0.5rem;
}
</style>
