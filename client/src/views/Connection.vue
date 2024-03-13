<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js"
import router from '../router/router.ts';

const userStore = useUserStore();

const username = ref("");
const usernameTouched = ref(false);
const password = ref("");
const passwordTouched = ref(false);

const passwordInvalid = computed(() => {
    return password.value.trim() === "" && passwordTouched.value;
});

const usernameInvalid = computed(() => {
    return usernameTouched.value && username.value.trim() === "";
});

const submitDisabled = computed(
() =>
    password.value === "" ||
    !passwordTouched.value ||
    !usernameTouched.value ||
    username.value.trim() === ""
);

function submitForm(){
    if (!submitDisabled.value){
        const credentials = {
            username: username.value.trim(),
            password: password.value.trim(),
        };
        const success = userStore.loginUser(credentials);
    if (success) {
        router.push({ name: "Home" });
    } else {
        alert("Invalid username or password !");
    }    
    }
}

</script>

<template>
    <div class="container">
    <form @submit.prevent="submitForm">
    <h3 class="form-title">Sign In</h3>

    <hr>

    <div class="input-wrapper">
        <label for="username">Username: </label>
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
        <span v-if="passwordInvalid">Invalid password!</span>
    </div>

        <button :disabled="submitDisabled" class="submit-button">Submit</button>
        <router-link  to="/sign-up"><button class="sign-up-button">Sign Up</button></router-link>

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

.submit-button, .sign-up-button {
    background-color: #E32B15; 
    color: white; 
    float: right; 
    border-radius: 5px; 
    padding: 8px 16px; 
    margin-top: 20px;
    width: 100px; 
}

.sign-up-button {
    margin-right: 10px; 
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

.input-wrapper input {
    flex: 1;
}
</style>