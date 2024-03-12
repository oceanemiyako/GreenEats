<script setup>

</script>

<template>
    <button @click= </button>
</template>

<style scoped>
    button {
        background-color: var(--button-inactive);
        padding: 0.5em 1em;
        color: hsl(0, 0%, 95%);
        border-radius: 0.5em;
        border: none;
        margin: 0.5em;
        transition: background-color 400ms ease, scale 400ms ease;
    }
    
    button:hover {
        background-color: var(--button-active);
        scale: 1.05;
    }
</style>