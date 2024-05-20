<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import axios from "axios";

const emits = defineEmits(["rollback", "toLogin"]);
const userStore = useUserStore();
const productStore = useProductStore();
const router = useRouter();

const { addToFav, addToHis } = productStore;
const { registerUser } = userStore;

const newUser = reactive({
    username: "",
    email: "",
    password: "",
    status: "",
});

const registerHandler = () => {
    registerUser(newUser);
    emits("toLogin");
};

const testHandler = async () => {
    await axios.get("http://localhost:7777/");
};

const testHandler2 = () => {
    userProfile();
};
const barcode = "barcode";
const testfavorite = () => {
    addToFav(barcode);
};

const testhistory = () => {
    addToHis(barcode);
};
</script>

<template>
    <div class="form-container">
        <form action="#" @submit.prevent="registerHandler">
            <h3>Inscription</h3>
            <div class="input-wrapper">
                <label for="username">Pseudo :</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    v-model="newUser.username"
                    required
                    class="input-field"
                />
            </div>
            <div class="input-wrapper">
                <label for="email">Email: </label>
                <input
                    v-model="newUser.email"
                    id="email"
                    @input="emailTouched = true"
                    @change="emailTouched = true"
                    type="email"
                    required
                    class="input-field"
                />
                <span>Email is invalid!</span>
            </div>
            <div class="input-wrapper">
                <label for="password">Mot de passe :</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    v-model="newUser.password"
                    required
                    class="input-field"
                />
            </div>
            <div class="input-wrapper">
                <label for="status">Régime/Statut: </label>
                <select
                    v-model="newUser.status"
                    @change="statusTouched = true"
                    id="status"
                    class="input-field"
                >
                    <option value="vegan">Vegan</option>
                    <option value="allergie">Allergies</option>
                    <option value="sansGluten">Sans gluten</option>
                    <option value="cetogene">Cétogène</option>
                    <option value="sansSel">Sans Sel</option>
                </select>
            </div>
            <button class="submit-button">Valider</button>
        </form>
        <button @click="$emit('rollback')">Retour</button>
    </div>

    <div>
        <h3>TEST AUTH</h3>
        <button @click="testHandler">test</button>
        <button @click="testHandler2">test profile</button>
        <button @click="testfavorite">test favorite</button>
        <button @click="testhistory">test history</button>
    </div>
</template>

<style scoped></style>
