<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js";
import router from '../router/router.ts';

const userStore = useUserStore();

const currentUser = computed(() => userStore.currentUser);

function logout() {
    userStore.currentUser = null; 
    router.push({ name: "connection" });
}

function goToHome() {
    router.push({ name: "Home" }); 
}

</script>

<template>

    <div class="container">

        <div v-if="currentUser" class="profile-box">

        <h3>Profile</h3>
        <hr>
        <div class="profile-details">
                <div class="detail">
                    <p>Pseudo: {{ currentUser.username }}</p>
                </div>
                <div class="detail">
                    <p>E-mail: {{ currentUser.email }}</p>
                </div>
                <div class="detail">
                    <p>Status: {{ currentUser.status }}</p>
                </div>
            </div>
            
        <button @click="logout" class="profile-button">Logout</button>
        <button @click="goToHome" class="profile-button">Go to Home</button>

        </div>

        <div v-else>
            <p>No user logged in.</p>
        </div>

    </div>

</template>


<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #0B9D60; 
}

.profile-box {
    background-color: #daf4db;
    padding: 20px;
    border-radius: 10px;
    width: fit-content;
    text-align: center;
}

.profile-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.detail {
    display: flex;
    justify-content: space-between;
    width: 200px; 
    margin-bottom: 10px;
}

.profile-details p {
    word-wrap: break-word;
}

.profile-button {
    background-color: #E32B15; 
    color: white; 
    border: none; 
    border-radius: 5px;
    padding: 8px 16px;
    margin-top: 10px;
    margin: 5px;
}

hr {
    color: #0B9D60; 
    border-color: #0B9D60; 
    margin-top: 0px; 
    margin-bottom: 20px; 
}

</style>