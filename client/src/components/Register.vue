<script setup>
import { reactive } from "vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";

const userStore = useUserStore();

const { registerUser, userProfile } = userStore;

const newUser = reactive({
    username: "",
    password: "",
});

const registerHandler = () => {
    registerUser(newUser);
};

const testHandler = async () => {
   await axios.get("http://localhost:7777/")
}

const testHandler2 = () => {
    userProfile();
}
</script>

<template>
    <h3>Inscription</h3>

    <form action="#" @submit.prevent="registerHandler">
        <div class="label-input">
            <label for="username"></label>
            <input id="username" name="username" type="text" v-model="newUser.username" required />
        </div>
        <div class="label-input">
            <label for="password"></label>
            <input id="password" name="password" type="text" v-model="newUser.password" required />
        </div>
        <button>Valider</button>
    </form>

    <div>
        <h3>TEST AUTH</h3>
        <button @click="testHandler">test</button>
        <button @click="testHandler2">test profile</button>
    </div>
</template>

<style scoped></style>
