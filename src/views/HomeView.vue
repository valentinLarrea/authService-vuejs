<template>
  <!-- Contenedor principal - Pantalla completa con fondo primary -->
  <div
    class="bg-primary h-screen flex flex-col items-center justify-center text-center px-4"
  >
    <!-- Sección de encabezado y descripción -->
    <div>
      <!-- Título principal de la aplicación -->
      <h1
        class="text-5xl sm:text-6xl text-text font-extrabold uppercase mb-4 drop-shadow-lg font-raleway"
      >
        AuthService
      </h1>

      <!-- Descripción/instrucciones para el usuario -->
      <p class="text-xl sm:text-2xl text-white font-raleway">
        Seleccione una de las siguientes opciones.
      </p>
    </div>

    <!-- Contenedor de botones de navegación -->
    <div
      class="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8"
    >
      <!-- Botón para navegar al formulario de inicio de sesión -->
      <router-link
        to="/login"
        class="bg-text text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition font-raleway"
      >
        Iniciar Sesión
      </router-link>

      <!-- Botón para navegar al formulario de registro -->
      <router-link
        to="/register"
        class="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition font-raleway"
      >
        Registrarse
      </router-link>
    </div>
  </div>
</template>

<script setup>
/**
 * Vista HomeView - Página de inicio de la aplicación de autenticación
 *
 * Esta es la página principal que se muestra cuando los usuarios
 * acceden por primera vez a la aplicación.
 *
 * Características:
 * - Diseño responsive que se adapta a móviles y desktop
 * - Layout centrado tanto vertical como horizontalmente
 * - Navegación directa a formularios de login y registro
 * - Estilo consistente con el diseño general de la app
 * - Uso de colores personalizados definidos en Tailwind config
 *
 * Rutas:
 * - /login: Redirige al formulario de inicio de sesión
 * - /register: Redirige al formulario de registro
 *
 * Esta vista es pública (no requiere autenticación) según la configuración
 * del router en meta.requiresAuth: false
 */
</script>

<style scoped>
/* 
 * Se pueden agregar estilos personalizados aquí si es necesario
 * para casos específicos que no cubra Tailwind CSS
 */
</style>
