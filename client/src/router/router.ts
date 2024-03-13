import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Connection from "@/views/Connection.vue";
import Scan from "@/views/Scan.vue";
import Favorites from "@/views/Favorites.vue";
import Search from "@/views/Search.vue";
import History from "@/views/History.vue";
import SignUp from "@/views/SignUp.vue";
import Profile from "@/views/Profile.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path:"/connection",
      name: "connection",
      component: Connection
    },
    {
      path:"/scan",
      name: "scan",
      component: Scan
    },
    {
      path:"/favorites",
      name: "favorites",
      component: Favorites
    },
    {
      path:"/search",
      name: "search",
      component: Search
    },
    {
      path:"/history",
      name: "history",
      component: History
    },
    {
      path:"/sign-up",
      name: "sign-up",
      component: SignUp
    },
    {
      path:"/profile",
      name: "profile",
      component: Profile
    },

  ],
});

export default router;
