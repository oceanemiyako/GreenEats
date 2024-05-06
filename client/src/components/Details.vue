<script setup>
const props = defineProps(["product"]);
const emits = defineEmits(["close-modal"]);
</script>

<template>
  <div class="modal-bg" @click.self="$emit('close-modal')">
    <div class="modal-content">
      <p class="product-display__name">yoyo</p>
      <hr />
      <p class="product-display__marque">yaya</p>

      <div class="product-display__image">
        <img src="" alt="image" />
      </div>
      Ingrédients :
      <p>ingredients</p>
      <p class="nutriscore">Nutriscore&nbsp;: <span>D</span></p>
      <button @click="$emit('close-modal')">Close</button>
      <button>Remove from fav</button>
    </div>
  </div>
</template>

<style scoped>

.modal-bg {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items:center;
  
}

.modal-content {
  
  height:80%;
  width:100%;
  padding: 5%;
  border: solid 4px var(--font-color-white);
  border-radius: 1rem;
  
  background-color: var(--green);
}
</style>
