<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

const store = useProductStore();
const { favorites } = storeToRefs(store);

const showFavorites = computed(() => {
    return favorites.value.length;
});
</script>

<template>
  <div class="content-center empty-list" v-if="!showFavorites">
    <p>Aucun produit enregistré dans les favoris.</p>
  </div>
  <div v-else v-for="favorite in favorites">
    <p>{{ favorite.name }}</p>
    <p>{{ favorite.id }}</p>
  </div>
</template>

<style scoped>
.empty-list {
    height: 100%;
    color: var(--green);
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    padding: 0 0.5rem 0 0.5rem ;
}

</style>
