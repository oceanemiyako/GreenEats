<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user.js";
import { computed } from "vue";

const userStore = useUserStore();
const isAuthenticated = computed(() => !!userStore.currentUser);

</script>

<template>
  <header>
    <router-link class="router-logo" to="/"
      ><img class="logo" src="@/img/logo.png"
    /></router-link>
    <router-link v-if="isAuthenticated" to="/profile"><img src="@/img/profile.png" /></router-link>
    <router-link v-else to="/connection"><img src="@/img/profile.png" /></router-link>
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
          <p>History</p>
        </div></router-link
      >
      <router-link class="router" to="/favorites"
        ><div class="img-p">
          <img src="@/img/favorite.png" />
          <p>Favorites</p>
        </div></router-link
      >
      <router-link class="router" to="/search"
        ><div class="img-p">
          <img src="@/img/search.png" />
          <p>Search</p>
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
