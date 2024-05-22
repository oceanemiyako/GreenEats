import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {

    // Les constantes :
    const API_BASE_URL = "http://localhost:7777";
    const currentUser = ref(null);

    // Les Méthodes :

    // Fonction pour créer un utilisateur en l'enregistrer en BDD.
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

    // Fonction pour créer une connexion utilisateur.
    const userLoginIn = async (userCredentials) => {
        try {
            const result = await axios.post(`${API_BASE_URL}/users/login`, { userCredentials });
            // Si la connexion est un succès on eneregistre le token dans le local storage
            // On pourra ainsi utliser le token pour accéder aux routes protégées.
            if (result.status === 200) {
                localStorage.setItem("token", result.data.token);
            // On passe le token dans le header des requêtes axios.
                axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Fonction pour récupérer les infos de l'utilisateur et les stocker dans un tableau
    const userProfile = async () => {
        try {
            const result = await axios.get(`${API_BASE_URL}/users/profile`);
            if (result.status === 200) {
                console.log(result.data.currentUser);
                console.log("OKAY");
                currentUser.value = result.data.currentUser;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { currentUser, registerUser, userLoginIn, userProfile };
});
