import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
    const API_BASE_URL = "http://localhost:7777";
    const currentUser = ref({});

    const registerUser = async (newUser) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/users/register`, { newUser });
            if (result.status === 201) {
                console.log("Inscription réussie");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const userLoginIn = async (userCredentials) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/users/login`, { userCredentials });
            if (result.status === 200) {
                localStorage.setItem("token", result.data.token);

                axios.defaults.headers.common["Authorization"] = localStorage.getItem('token');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const userProfile = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/users/profile`);
            if(result.status === 200) {
                console.log("OKAY");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { currentUser, registerUser, userLoginIn, userProfile };
});
