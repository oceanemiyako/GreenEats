<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";

// Emits pour pouvoir revenir à la page précédente ou renvoyer vers la page de login.
const emits = defineEmits(["rollback", "toLogin"]);
const userStore = useUserStore();

const { registerUser } = userStore;

// Tableau des informations rentrées dans le formulaire d'inscription par l'utilisateur.
const newUser = reactive({
    username: "",
    email: "",
    password: "",
    status: "",
});

// Création du profil de l'utilisateur dans la database puis renvoie vers la page de connexion.
const registerHandler = () => {
    registerUser(newUser);
    emits("toLogin");
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
                <select v-model="newUser.status" @change="statusTouched = true" id="status" class="input-field">
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
</template>

<style scoped></style>
