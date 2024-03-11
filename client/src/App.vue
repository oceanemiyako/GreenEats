<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <router-link class="router-logo" to="/"
      ><img class="logo" src="@/img/logo.png"></router-link>
    <router-link to="/connection">Connect</router-link>
  </header>
  <main>
    <router-view></router-view>
  </main>
  <footer></footer>
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
}

.router-logo {
  width: 50%;
}

.logo {
  width: 100%;
}
</style>
