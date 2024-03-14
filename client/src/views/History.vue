<script setup lang="ts">
import { useProductStore } from "@/stores/product";
import { storeToRefs } from "pinia";

const store = useProductStore();
const { history } = storeToRefs(store);
</script>

<template>
<div v-for="h in history">
    <div class="card">
    <img :src=h.img alt="product-image">
    <p>{{ h.name }}</p>
    <p>{{ h.ingredients }}</p>
    <p>{{ h.palmOil }}</p>
    <p>{{ h.id }}</p>
    </div>
</div>


</template>

<style scoped></style>
