<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

const store = useProductStore();
const { history } = storeToRefs(store);

const showHistory = computed(() => {
    return history.value.length;
});
</script>

<template>
  <div class="content-center empty-list" v-if="!showHistory">
    <p>Aucun historique de recherche.</p>
  </div>
  <div class="container" v-else >
    <div class="card" v-for="h in history">
      <img :src="h.img" alt="product-image" />
      <p>{{ h.name }}</p>
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
    padding: 0 0.5rem 0 0.5rem ;
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
