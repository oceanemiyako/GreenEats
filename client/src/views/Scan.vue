<script setup>
import ProductInfos from "@/components/ProductInfos.vue";
import axios from "axios";
import { ref, reactive } from "vue";
import { useProductStore } from "@/stores/product";

const store = useProductStore();
const { addToFavorites, addToHistory } = store;

const barcode = ref(0);
const productFound = reactive([]);

const fetchProductData = async (param) => {
  const response = await axios.get(
    `https://world.openfoodfacts.org/api/v2/product/${param}.json`
  );
  const data = response.data.product;
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
  productFound.push({ ...productInfos });
  addToHistory({ ...productInfos });
  console.log(productFound);
};

const clearProductFound = () => {
  productFound.pop();
  barcode.value = 0;
};

const addProductToFav = () => {
  const product = productFound[0];
  addToFavorites({ ...product });
  productFound.pop();
  barcode.value = 0;
};
</script>

<template>
  <div v-if="productFound.length === 0" class="barcode-input">
    <form @submit.prevent="fetchProductData(barcode)">
      <div>
        <label for="barcode">Barcode :</label>
        <input
          v-model="barcode"
          list="codebar-values"
          type="number"
          name="barcode"
          id="barcode"
        />
        <datalist id="codebar-values">
          <option value="7622210449283"></option>
        </datalist>
      </div>
      <button>Submit</button>
    </form>
  </div>
  <div v-else class="product-display" v-for="p in productFound">
    <p>{{ p.name }}</p>
    <p>{{ p.id }}</p>
    <button @click="clearProductFound">Close</button>
    <button @click="addProductToFav">Add to fav</button>
  </div>
</template>

<style scoped></style>
