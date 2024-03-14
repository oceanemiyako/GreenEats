<script setup>
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';

const store = useProductStore()
const { favorites } = storeToRefs(store)


</script>

<template>
    <div v-if="favorites.length === 0">
    <p>Add products to your favorites.</p>
        
    </div>
<div v-for="f in favorites">
    <p>{{ f.name }}</p>
    <p>{{ f.id }}</p>
    
</div>


</template>

<style scoped>

</style>