<script setup lang="ts">
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

const store = useProductStore();
const { history } = storeToRefs(store);
</script>

<template>
  <div v-if="history.length === 0">
    <p>Search history is empty.</p>
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
