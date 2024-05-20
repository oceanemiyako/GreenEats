<script setup>
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Profile from "../components/Profile.vue";
import { ref } from "vue";
import { useUserStore } from "../stores/user.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const showForm = ref("");
</script>

<template>
    <Profile v-if="currentUser" />
    <div v-else>
        <div v-if="showForm === ''">
            <p>Pas encore de compte ?</p>
            <button @click="showForm = 'register'">Inscrivez-vous</button>
            <p>Déjà inscrit ?</p>
            <button @click="showForm = 'login'">Connectez-vous.</button>
        </div>
        <Login v-if="showForm === 'login'" @rollback="showForm = ''" />
        <Register v-if="showForm === 'register'" @rollback="showForm = ''" @toLogin="showForm = 'login'" />
    </div>
</template>

<style scoped></style>
