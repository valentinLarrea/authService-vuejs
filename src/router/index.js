/**
 * Configuración del Router para la aplicación de autenticación
 *
 * Este archivo define todas las rutas de la aplicación y maneja la protección
 * de rutas basada en el estado de autenticación del usuario.
 *
 * Características:
 * - Rutas públicas (home, login, register)
 * - Rutas protegidas que requieren autenticación
 * - Guard global que redirige a login si no hay autenticación
 * - Lazy loading de componentes para optimizar la carga
 */

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/AuthStore.js";

/**
 * Definición de rutas de la aplicación
 *
 * Cada ruta incluye:
 * - path: URL de la ruta
 * - name: Nombre único para referenciar la ruta
 * - component: Componente que se renderiza (con lazy loading)
 * - meta.requiresAuth: Indica si la ruta requiere autenticación
 */
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
    meta: {
      requiresAuth: false, // Ruta pública - accesible sin autenticación
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      requiresAuth: false, // Ruta pública - formulario de inicio de sesión
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      requiresAuth: false, // Ruta pública - formulario de registro
    },
  },
  {
    path: "/protected",
    name: "protected",
    component: () => import("../views/RouteProtectedView.vue"),
    meta: {
      requiresAuth: true, // Ruta protegida - solo usuarios autenticados
    },
  },
];

/**
 * Instancia del router de Vue
 *
 * Configuración:
 * - history: Usa el modo history del navegador (URLs limpias sin #)
 * - routes: Array de rutas definidas arriba
 */
const router = createRouter({
  history: createWebHistory(), // Modo history para URLs limpias
  routes,
});

/**
 * Guard de navegación global - Protección de rutas
 *
 * Se ejecuta antes de cada cambio de ruta para verificar:
 * 1. Si la ruta de destino requiere autenticación (meta.requiresAuth: true)
 * 2. Si el usuario está autenticado (authStore.userAuthenticated)
 * 3. Redirige a login si se requiere auth pero el usuario no está logueado
 *
 * @param {RouteLocationNormalized} to - Ruta de destino
 * @param {RouteLocationNormalized} from - Ruta de origen
 * @param {NavigationGuardNext} next - Función para continuar la navegación
 *
 * Flujo de decisión:
 * - Si la ruta requiere auth Y el usuario NO está autenticado → redirige a login
 * - En cualquier otro caso → permite continuar la navegación
 */
router.beforeEach((to, from, next) => {
  // Obtiene la instancia del store de autenticación
  const authStore = useAuthStore();

  // Verifica si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta.requiresAuth && !authStore.userAuthenticated) {
    // Redirige al login si se necesita autenticación
    next({ name: "login" });
  } else {
    // Permite continuar la navegación
    next();
  }
});

/**
 * Exporta la instancia del router para ser usada en main.js
 * La aplicación Vue usará este router para manejar toda la navegación
 */
export default router;
