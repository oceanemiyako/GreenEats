<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <router-link class="router-logo" to="/"
      ><img class="logo" src="@/img/logo.png"
    /></router-link>
    <router-link to="/connection"><img src="@/img/profile.png" /></router-link>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer>
    <nav>
      <router-link to="/scan"><img src="@/img/scan.png"></router-link>
      <router-link to="/history"><img src="@/img/history.png"></router-link>
      <router-link to="/favorites"><img src="@/img/favorite.png"></router-link>
      <router-link to="/search"><img src="@/img/search.png"></router-link>
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

footer {
  height: 100px;
  width: 100%;
  background-color: var(--bg-footer-header);
}
</style>
