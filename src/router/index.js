import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/AuthStore.js";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/protected",
    name: "protected",
    component: () => import("../views/RouteProtectedView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.userAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
