<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import router from '../router/router.ts';


const userStore = useUserStore();

const email = ref("");
const emailTouched = ref(false);
const username = ref("");
const usernameTouched = ref(false);
const password = ref("");
const passwordTouched = ref(false);
const status = ref("normal");
const statusTouched = ref(false);

const passwordInvalid = computed(() => {
    return password.value.trim() === "" && passwordTouched.value;
});

const usernameInvalid = computed(() => {
    return usernameTouched.value && username.value.trim() === "";
});

const emailInvalid = computed(() => {
    return emailTouched.value && !isValidEmail(email.value.trim());
});

const showModal = ref(false);

const submitDisabled = computed(
() =>
    password.value === "" ||
    !passwordTouched.value ||
    !usernameTouched.value ||
    username.value.trim() === "" ||
    email.value.trim() === "" ||
    !emailTouched.value ||
    status.value === "" ||
    !statusTouched.value
);

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function submitForm() {
    if (!submitDisabled.value){
        const newUser ={
            email: email.value.trim(),
            username: username.value.trim(),
            password: password.value.trim(),
            status: status.value 
        };
    userStore.registerUser(newUser);

    showModal.value = true;
    setTimeout(() => {
        closeModal();
        router.push({ name: "connection" });
    }, 3000);
    console.log(showModal.value);

    email.value = "";
        emailTouched.value = false;
        username.value = "";
        usernameTouched.value = false;
        password.value = "";
        passwordTouched.value = false;
        status.value = "";
        statusTouched.value = false;
    }
}

function closeModal(){
    showModal.value = false;
}

</script>

<template>
    <div class="container">
    <form @submit.prevent="submitForm">
    <h3 class="form-title">Sign Up</h3>

    <hr>

    <div class="input-wrapper">
        <label for="email">Email: </label>
        <input
            v-model="email"
            id="email"
            @input="emailTouched = true"
            @change="emailTouched = true"
            type="email"
            required
            class="input-field"
        />
        <span v-if="emailInvalid">Email is invalid!</span>
    </div>

    <div class="input-wrapper">
        <label for="username">Pseudo: </label>
        <input
            v-model="username"
            id="username"
            @input="usernameTouched = true"
            @change="usernameTouched = true"
            type="text"
            required
            class="input-field"
        />
        <span v-if="usernameInvalid">Username is required!</span>
    </div>

    <div class="input-wrapper">
        <label for="password">Password: </label>
        <input
            v-model="password"
            @input="passwordTouched = true"
            @change="passwordTouched = true"
            id="password"
            type="password"
            required
            class="input-field"
        />
        <span v-if="passwordInvalid">Password is invalid!</span>
    </div>

    <div class="input-wrapper">
        <label for="status">Régime/Statut: </label>
        <select
            v-model="status"
            @change="statusTouched = true"
            id="status"
            required
            class="input-field"
        >
            <option value="vegan">Vegan</option>
            <option value="allergie">Allergies</option>
            <option value="sansGluten">Sans gluten</option>
            <option value="cetogene">Cétogène</option>
            <option value="sansSel">Sans Sel</option>

        </select>
    </div>

    <button :disabled="submitDisabled" class="submit-button">Sign Up</button>
    </form>

    <div v-if="showModal === true" class="modal">
    <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Bravo ! Ton compte est maintenant crée !</p>
        <img src="../img/happyTom.png" alt="Happy Tomate">
        <p> Bienvenue dans la communauté GREEN EATS !</p>
    </div>
    </div>

</div>
</template>


<style scoped>

.container {
display: block;
justify-content: center;
align-items: center;
height: 35vh;
color: #0B9D60; 
font-family: 'Acumin Variable Concept', sans-serif;
width: 300px; 
margin: 0 auto;

}

.form-title {
    margin-top: 0; 
}

.submit-button {
    background-color: #E32B15; 
    color: white; 
    float: right; 
    border-radius: 5px; 
    padding: 8px 16px; 
    margin-top: 20px;
    width: 100px; 
}

hr {
    color: #0B9D60; 
    border-color: #0B9D60; 
    margin-top: 0px; 
    margin-bottom: 20px; 
}

.input-field {
    background-color: #0FEC8F; 
    opacity: 25%;
    border: none; 
    padding: 5px; 
    margin-bottom: 10px; 
}
.input-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.input-wrapper label {
    width: 120px; 
    margin-right: 5px;
}

.input-wrapper input,
.input-wrapper select {
    flex: 1;
}

.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    font-family: 'Acumin Variable Concept', sans-serif;
    align-items: center;
    background-color: #daf4db;
}

.modal-content {
    margin: 15% auto;
    padding: 20px;
    width: 80%;
    max-width: 300px;
}

.modal-content img {
    max-width: 100%; 
    height: auto; 
}
.close {
    color: #daf4db;
    float: right;
    font-size: 28px;
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
