<script setup>
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
    marque: data.brands,
    vegan: data.ingredients_analysis,
    name: data.product_name,
    allergens: data.allergens,
    ingredients: data.ingredients_text_debug,
    palmOil: data.ingredients_from_palm_oil_n,
    carbone: data.carbon_footprint_percent_of_known_ingredient_debug,
    nutriScore: data.nutriscore_grade,
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
      <div class="label-input">
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
    <p class="name">{{ p.name }}</p>
    <hr>
    <p class="marque">{{ p.marque }}</p>
    <img :src=" p.img " alt="image">
    Ingrédients :
    <p>{{ p.ingredients }}</p>
    <p>{{ p.nutriScore }}</p>
    <button @click="clearProductFound">Close</button>
    <button @click="addProductToFav">Add to fav</button>
  </div>
</template>

<style scoped>

button {
  padding: 5px;
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

.name {
  font-size: larger;
  font-weight: bold;
}

.marque {
  font-style: oblique;
}

img {
width: 100px;
}

.product-display {
color: var(--dark-green);
}
div.barcode-input {
  height: 100%;

  > form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}

div.label-input {
  display: flex;
  flex-flow: column nowrap;

  > label {
    margin-bottom: 5px;
  }
}
</style>
