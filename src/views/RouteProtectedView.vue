<template>
  <!-- Contenedor principal con fondo primary y altura mínima de pantalla -->
  <div class="bg-primary min-h-screen flex items-center justify-center px-4">
    
    <!-- Tarjeta central con contenido de la ruta protegida -->
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
      
      <!-- Título de bienvenida -->
      <h2 class="text-2xl font-bold text-primary mb-4 font-raleway">
        Ruta Protegida
      </h2>
      
      <!-- Mensaje de confirmación de acceso exitoso -->
      <p class="text-gray-700 mb-6 font-raleway">
        ¡Bienvenido! Has accedido correctamente.
      </p>
      
      <!-- Botón para cerrar sesión -->
      <button
        @click="logoutSession"
        class="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition font-raleway"
      >
        Cerrar sesión
      </button>
      
    </div>
  </div>
</template>

<script setup>
/**
 * Vista RouteProtectedView - Ruta protegida que requiere autenticación
 * 
 * Esta vista demuestra el funcionamiento del sistema de autenticación
 * y protección de rutas. Solo es accesible para usuarios autenticados.
 * 
 * Características:
 * - Acceso restringido solo a usuarios autenticados
 * - Protegida por el guard global del router (meta.requiresAuth: true)
 * - Interfaz simple que confirma el acceso exitoso
 * - Funcionalidad de logout integrada
 * - Redirección automática a login después del logout
 * - Diseño centrado y responsivo
 * 
 * Flujo de acceso:
 * 1. Usuario intenta acceder a /protected
 * 2. Router guard verifica authStore.userAuthenticated
 * 3. Si está autenticado: permite acceso y muestra esta vista
 * 4. Si NO está autenticado: redirige automáticamente a /login
 * 
 * Seguridad:
 * - Esta vista nunca se renderiza sin autenticación válida
 * - El guard del router actúa como primera línea de defensa
 * - Firebase Auth mantiene el estado de sesión sincronizado
 * - El logout limpia completamente el estado de autenticación
 */

import { useAuthStore } from "../store/AuthStore";
import { useRouter } from "vue-router";

// Instancias de store y router para manejo de autenticación y navegación
const authStore = useAuthStore();
const router = useRouter();

/**
 * Función para cerrar sesión del usuario actual
 * 
 * @async
 * @function logoutSession
 * 
 * Comportamiento:
 * - Llama al método logout del store para cerrar sesión en Firebase
 * - Redirige manualmente al login después del logout exitoso
 * - Maneja errores de logout (aunque son raros)
 * - No usa watcher porque queremos redirección inmediata
 * 
 * Diferencias con login/register:
 * - Redirección manual vs automática (via watcher)
 * - Esto es intencional: el logout debe redirigir inmediatamente
 * 
 * Manejo de errores:
 * - Los errores se logean en consola para debugging
 * - En producción se podría mostrar una notificación al usuario
 * - Los errores de logout son poco comunes (problemas de red principalmente)
 */
const logoutSession = async () => {
    try {
        // Cierra la sesión en Firebase
        await authStore.logout();
        
        // Redirige inmediatamente al login
        router.push({ name: "login" });
        
    } catch (error) {
        // En caso de error, lo registramos para debugging
        console.error("Error al cerrar sesión:", error);
    }
};
</script>

<style scoped>
/* 
 * Se pueden agregar estilos personalizados para:
 * - Animaciones de entrada/salida
 * - Estados de loading durante el logout
 * - Estilos específicos para diferentes tipos de contenido protegido
 */
</style>