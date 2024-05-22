<script setup>
// On importe les components.
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
    <!-- L'affichage de cette view est basé sur du rendu conditionnel. Si un utilisateur est connecté on affiche ses infos.Sinon on donne le choix de s'inscrire ou de se connecter à l'app. -->
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
