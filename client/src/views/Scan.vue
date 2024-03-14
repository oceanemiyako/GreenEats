<script setup>
import ProductInfos from "@/components/ProductInfos.vue";
import axios from "axios";
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/product";

const store = useProductStore();
const { addToProduct, addToHistory } = store;

const barcode = ref(0);

const fetchProductData = async (param) => {
  const result = await axios.get(
    `https://world.openfoodfacts.org/api/v2/product/${param}.json`
  );
  const data = result.data.product;
  console.log(data);
  const productInfos = {
    img: data.image_url,
    id: data.id,
    name: data.product_name,
    allergens: data.alergens,
    ingredients: data.ingredients_text_debug,
    palmOil: data.ingredients_from_palm_oil_n,
  };
  console.log(productInfos);
  addToHistory({ ...productInfos });
};
</script>

<template>
  <div class="barcode-input">
    <form @submit.prevent="fetchProductData(barcode)">
      <div>
        <label for="barcode"></label>
        <input v-model="barcode" type="number" name="barcode" id="barcode" />
      </div>
      <button>Submit</button>
    </form>
  </div>
  <div class="product-infos">
    <!-- <ProductInfos v-for="p in productInfos" :product="p" /> -->
  </div>
</template>

<style scoped></style>
