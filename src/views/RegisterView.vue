<template>
  <!-- Contenedor principal con fondo primary y altura mínima de pantalla -->
  <div
    class="bg-primary min-h-screen flex flex-col gap-4 items-center justify-center px-4"
  >
    <!-- Botón de navegación de regreso al home -->
    <div class="flex justify-center w-full">
      <RouterLink
        to="/"
        class="text-white rounded-xl py-2 uppercase font-bold px-8 font-raleway"
      >
        < Back to Home
      </RouterLink>
    </div>

    <!-- Contenedor del formulario con ancho máximo controlado -->
    <div class="w-full max-w-md">
      <!-- Formulario de autenticación reutilizable para registro -->
      <AuthForm
        :titleText="'Registrarse'"
        :textButton="'Registrarse'"
        :onSubmit="register"
        :changeForm="changeForm"
      >
        <!-- Slot de inputs con campos de email y contraseña -->
        <template #inputs>
          <!-- Campo de correo electrónico para el nuevo usuario -->
          <Input
            :type="emailConfig.type"
            :name="emailConfig.name"
            :placeholder="emailConfig.placeholder"
            :required="emailConfig.required"
            v-model="email"
          />
          <!-- Campo de contraseña para el nuevo usuario -->
          <Input
            :type="passConfig.type"
            :name="passConfig.name"
            :placeholder="passConfig.placeholder"
            :required="passConfig.required"
            v-model="password"
          />
        </template>
      </AuthForm>
    </div>
  </div>
</template>

<script setup>
/**
 * Vista RegisterView - Formulario de registro de nuevos usuarios
 *
 * Esta vista proporciona un formulario para que nuevos usuarios se registren
 * en la aplicación usando Firebase Authentication.
 *
 * Características:
 * - Formulario de registro con validación
 * - Integración completa con Firebase
 * - Autenticación automática después del registro exitoso
 * - Redirección automática a la ruta protegida
 * - Manejo de errores con alertas al usuario
 * - Navegación al formulario de login
 * - Botón de regreso al home
 * - Diseño responsive y accesible
 *
 * Flujo de registro:
 * 1. Usuario ingresa email y contraseña
 * 2. Al enviar, se ejecuta la función register()
 * 3. Se llama a authStore.registerUser() con las credenciales
 * 4. Firebase crea la cuenta Y autentica automáticamente al usuario
 * 5. El watcher detecta el cambio en userAuthenticated
 * 6. Se redirige automáticamente a la ruta protegida
 * 7. Si falla, se muestra un alert con el mensaje de error
 *
 * Estados y reactividad:
 * - email y password son reactivos y se enlazan con v-model
 * - El watcher observa cambios en authStore.userAuthenticated
 * - La redirección es automática sin intervención manual
 * - Comparte la misma lógica de redirección que LoginView
 */

import { ref, watch } from "vue";
import { useAuthStore } from "../store/AuthStore";
import { useRouter } from "vue-router";

import AuthForm from "../components/AuthForm.vue";
import Input from "../components/Input.vue";

// Instancias de store y router
const authStore = useAuthStore();
const router = useRouter();

/**
 * Estados reactivos para los campos del formulario
 * Se enlazan con v-model en los componentes Input
 * @type {Ref<string>}
 */
const email = ref("");
const password = ref("");

/**
 * Configuración del botón secundario para cambiar al formulario de login
 * @type {Object}
 * @property {string} text - Texto mostrado en el botón
 * @property {Function} action - Función ejecutada al hacer clic
 */
const changeForm = {
  text: "¿Deseas iniciar sesión?",
  action: () => redirectToRoute("login"),
};

/**
 * Configuración del campo de email para registro
 * Define las propiedades que se pasan al componente Input
 * @type {Ref<Object>}
 */
const emailConfig = ref({
  type: "email", // Tipo de input para validación
  name: "email", // Nombre del campo para formularios
  placeholder: "Correo Electrónico", // Texto de placeholder
  required: true, // Campo obligatorio
});

/**
 * Configuración del campo de contraseña para registro
 * Define las propiedades que se pasan al componente Input
 * @type {Ref<Object>}
 */
const passConfig = ref({
  type: "password", // Tipo password para ocultar texto
  name: "password", // Nombre del campo para formularios
  placeholder: "Contraseña", // Texto de placeholder
  required: true, // Campo obligatorio
});

/**
 * Función principal de registro de usuario
 *
 * @async
 * @function register
 * @throws {Error} Re-lanza errores de Firebase para mostrar al usuario
 *
 * Comportamiento:
 * - Llama al store para crear cuenta en Firebase
 * - Firebase autentica automáticamente al usuario después del registro
 * - No maneja la redirección (se hace via watcher)
 * - Muestra alertas de error si el registro falla
 */
const register = async () => {
  try {
    await authStore.registerUser(email.value, password.value);
    // La redirección se maneja automáticamente via watcher
    // Firebase autentica automáticamente después del registro exitoso
  } catch (error) {
    // Muestra el mensaje de error de Firebase al usuario
    alert(error.message);
  }
};

/**
 * Función utilitaria para navegación programática
 *
 * @param {string} routeName - Nombre de la ruta definida en el router
 *
 * Encapsula la lógica de navegación para reutilización
 * Usa router.push con objetos de ruta por buenas prácticas
 * Idéntica a la implementación en LoginView para consistencia
 */
const redirectToRoute = (routeName) => {
  router.push({ name: routeName });
};

/**
 * Watcher reactivo para redirección automática post-registro
 *
 * Observa cambios en authStore.userAuthenticated y redirige
 * automáticamente a la ruta protegida cuando el usuario se registra exitosamente.
 *
 * Comportamiento:
 * - Se ejecuta cada vez que userAuthenticated cambia
 * - Solo redirige cuando isAuth es true (usuario autenticado)
 * - Esto garantiza que la redirección ocurra después de que Firebase
 *   complete el registro Y la autenticación automática
 */
watch(
  () => authStore.userAuthenticated,
  (isAuth) => {
    if (isAuth) {
      redirectToRoute("protected");
    }
  }
);
</script>

<style scoped>
/* 
 * Se pueden agregar estilos personalizados si es necesario
 * para características específicas del registro
 */
</style>
