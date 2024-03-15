<script setup>

</script>

<template>
    <button @click="maFonction"><slot/></button>
</template>

<style scoped>

button {
  padding: .5rem 1rem;
  background-color: var(--button-active);
  color: beige;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: background-color 400ms ease-out;
  font-size: large;
}

button:hover {
  background-color: var(--button-inactive);
  cursor: pointer;
}
</style>
