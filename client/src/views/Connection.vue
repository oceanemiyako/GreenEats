<script setup>
import { ref, computed } from "vue";

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
</script>

<template>
    <div class="container">
    <form action="#">
    <h3 class="form-title">Sign In</h3>

    <hr>

    <div>
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
        <span v-if="passwordInvalid">Invalid password!</span>
    </div>

        <button :disabled="submitDisabled" class="submit-button">Submit</button>
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
</style>