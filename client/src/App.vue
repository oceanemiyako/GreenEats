<script setup>
import { RouterLink, RouterView } from "vue-router";
// On importe les deux stores.
import { useUserStore } from "./stores/user.js";
import { useProductStore } from "./stores/product.ts";
import { onMounted } from "vue";
import axios from "axios";

// On appelle des constantes et des methodes depuis les stores.
const userStore = useUserStore();
const productStore = useProductStore();
const { userProfile } = userStore;
const { fetchAllFavorites, fetchAllHistories } = productStore;

// Au montage de l'application :
onMounted(async () => {
    // On vérifie si le local storage du navigateur contient un token.
    if (localStorage.getItem("token")) {
        // Si oui alors on passe le token dans le header des requêtes axios.
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
        // Si le token est toujours valide on récupére les données de l'utilisateur ainsi que ses favoris et son historique de recherche.
        await userProfile();
        await fetchAllFavorites();
        await fetchAllHistories();
    }
});
</script>

<template>
    <!-- Le HTML de l'application est construit de façon à ce que le footer et le header soient affichés en permanence. Le contenu du main quand à lui dépend du router. -->
    <header>
        <router-link class="router-logo" to="/"><img class="logo" src="@/img/logo.png" /></router-link>
        <router-link to="/profil"><img src="@/img/profile.png" /></router-link>
    </header>
    <main>
        <router-view></router-view>
    </main>
    <footer>
        <nav>
            <router-link class="router" to="/scan"
                ><div class="img-p">
                    <img src="@/img/scan.png" />
                    <p>Scan</p>
                </div></router-link
            >
            <router-link class="router" to="/history"
                ><div class="img-p">
                    <img src="@/img/history.png" />
                    <p>Historique</p>
                </div></router-link
            >
            <router-link class="router" to="/favorites"
                ><div class="img-p">
                    <img src="@/img/favorite.png" />
                    <p>Favoris</p>
                </div></router-link
            >
            <router-link class="router" to="/search"
                ><div class="img-p">
                    <img src="@/img/search.png" />
                    <p>Recherche</p>
                </div></router-link
            >
        </nav>
    </footer>
</template>

<style scoped>
header {
    width: 100%;
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: var(--bg-footer-header);
}

.router {
    text-decoration: none;
    color: var(--green);
}

.router.router-link-active {
    color: var(--dark-green);
}

.router-logo {
    height: 100%;
    width: 50%;
    display: grid;
    place-content: center;
}

.logo {
    height: 100%;
    width: 100%;
}

main {
    height: 100%;
    width: 100%;
    overflow: auto;
}

footer {
    height: 100px;
    width: 100%;
    background-color: var(--bg-footer-header);

    > nav {
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-items: center;
    }
}

div.img-p {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}
</style>
