<script setup>
import { reactive } from "vue";
import { useUserStore} from "@/stores/user";

const store = useUserStore();
const { userLoginIn} = store;

const userCredentials = reactive({
    username: "",
    password: "",
});

const loginHandler = () =>  {
    userLoginIn(userCredentials);
}

</script>

<template>
    <h3>Login</h3>

    <form action="#" @submit.prevent="loginHandler">
        <div class="label-input">
            <label for="username"></label>
            <input id="username" name="username" type="text" v-model="userCredentials.username" required />
        </div>
        <div class="label-input">
            <label for="password"></label>
            <input id="password" name="password" type="text" v-model="userCredentials.password" required />
        </div>
        <button>Se Connecter</button>
    </form>
</template>

<style scoped></style>
