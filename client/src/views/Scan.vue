<script setup>
import axios from "axios";
import { ref } from "vue";
import { useProductStore } from "@/stores/product";


const store = useProductStore();
const { addToProduct, addToHistory } = store;

const barcode = ref(0);
const productFound = ref({});
const productInfos = ref({});

const fetchProductData = async (param) => {
  const result = await axios.get(
    `https://world.openfoodfacts.org/api/v2/product/${param}.json`
  );
  productFound.value = result.data.product;
  console.log(productFound.value);

  productInfos.value = {
    id: productFound.value.id,
    name: productFound.value.product_name,
    allergens: productFound.value.allergens,
    ingredients: productFound.value.ingredients_text_en,
    palmOil: productFound.value.ingredients_from_palm_oil_n,
  };
  addToHistory({ ...productInfos });
};
</script>

<template>
  <form @submit.prevent="fetchProductData(barcode)">
    <div>
      <label for="barcode"></label>
      <input v-model="barcode" type="number" name="barcode" id="barcode" />
    </div>
    <button>Submit</button>
  </form>
</template>

<style scoped></style>
