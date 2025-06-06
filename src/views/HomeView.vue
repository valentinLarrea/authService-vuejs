<template>
  <div class="bg-primary h-screen flex flex-col items-center justify-center text-center px-4">
    <div>
      <h1 class="text-5xl sm:text-6xl text-text font-extrabold uppercase mb-4 drop-shadow-lg">
        Bienvenido al AuthService
      </h1>
      <p class="text-xl sm:text-2xl text-white">
        Seleccione una de las siguientes opciones.
      </p>
    </div>
    <div class="flex flex-col sm:flex-row items-center gap-4 justify-center mt-8">
      <router-link
        to="/login"
        class="bg-text text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
      >
        Iniciar Sesión
      </router-link>
      <router-link
        to="/register"
        class="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
      >
        Registrarse
      </router-link>
    </div>
  </div>
</template>


<script setup></script>

<style scoped></style>
