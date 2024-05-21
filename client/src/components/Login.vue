<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";
import { useProductStore } from "@/stores/product";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const productStore = useProductStore();
const { userLoginIn, userProfile } = userStore;
const { fetchAllFavorites, fetchAllHistories} = productStore;
const router = useRouter();
const emits = defineEmits(["rollback"]);

const userCredentials = reactive({
    username: "",
    password: "",
});

const loginHandler = async () => {
    await userLoginIn(userCredentials);
    await userProfile();
    await fetchAllFavorites();
    await fetchAllHistories();
    router.push({ name: "Home" });
};
</script>

<template>
    <div class="form-container">
        <form action="#" @submit.prevent="loginHandler">
            <h3>Login</h3>
            <div class="input-wrapper">
                <label for="username">Pseudo :</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    v-model="userCredentials.username"
                    required
                    class="input-field"
                />
            </div>
            <div class="input-wrapper">
                <label for="password">Mot de passe :</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    v-model="userCredentials.password"
                    required
                    class="input-field"
                />
            </div>
            <button class="submit-button">Se Connecter</button>
        </form>
        <button @click="$emit('rollback')">Retour</button>
    </div>
</template>

<style scoped></style>
