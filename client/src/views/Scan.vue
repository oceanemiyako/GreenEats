<script setup>
import ProductInfos from "@/components/ProductInfos.vue";
import axios from "axios";
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/product";

const store = useProductStore();
const { addToProduct, addToHistory } = store;

const barcode = ref(0);
const productFound = ref({});
const productInfos = reactive({
  img: productFound.value.image_url,
  id: productFound.value.id,
  name: productFound.value.product_name,
  allergens: productFound.value.allergens,
  ingredients: productFound.value.ingredients_text_en,
  palmOil: productFound.value.ingredients_from_palm_oil_n,
});

const fetchProductData = async (param) => {
  const result = await axios.get(
    `https://world.openfoodfacts.org/api/v2/product/${param}.json`
  );
  productFound.value = result.data.product;
  console.log(productFound.value);
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
    <ProductInfos v-for="p in productInfos" :product="p" />
  </div>
</template>

<style scoped></style>
