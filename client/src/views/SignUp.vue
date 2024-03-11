<script setup>
import { ref, computed } from "vue";

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
</script>

<template>
    <div class="container">
    <form action="#">
    <h3 class="form-title">Inscription</h3>

    <hr>

    <div>
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

    <div>
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

    <div>
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

    <div>
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
</div>
</template>

<style scoped>

.container {
display: flex;
justify-content: center;
align-items: center;
height: 35vh;
color: #0B9D60; 
font-family: 'Acumin Variable Concept', sans-serif;
}

.form-title {
    margin-top: 0; 
}

.submit-button {
    background-color: #E32B15; 
    color: white; 
    float: right; 
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

label
{
	display: block;
	width: 150px;
	float: left;
}
</style>
