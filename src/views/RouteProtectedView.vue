<template>
  <div class="bg-primary min-h-screen flex items-center justify-center px-4">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
      <h2 class="text-2xl font-bold text-primary mb-4">Ruta Protegida</h2>
      <p class="text-gray-700 mb-6">¡Bienvenido! Has accedido correctamente.</p>
      <button
        @click="logoutSession"
        class="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition"
      >
        Cerrar sesión
      </button>
    </div>
  </div>
</template>


<script setup>
import { useAuthStore } from "../store/AuthStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logoutSession = async () => {
    try {
        await authStore.logout();
        router.push({ name: "login" });
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
};
</script>

<style scoped>

</style>