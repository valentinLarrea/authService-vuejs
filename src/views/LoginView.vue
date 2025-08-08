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
      <!-- Formulario de autenticación reutilizable -->
      <AuthForm
        :titleText="'Iniciar Sesión'"
        :textButton="'Iniciar Sesión'"
        :onSubmit="login"
        :changeForm="changeForm"
      >
        <!-- Slot de inputs con campos de email y contraseña -->
        <template #inputs>
          <!-- Campo de correo electrónico -->
          <Input
            :type="emailConfig.type"
            :name="emailConfig.name"
            :placeholder="emailConfig.placeholder"
            :required="emailConfig.required"
            v-model="email"
          />
          <!-- Campo de contraseña -->
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
 * Vista LoginView - Formulario de inicio de sesión
 *
 * Esta vista proporciona un formulario para que los usuarios existentes
 * inicien sesión en la aplicación usando Firebase Authentication.
 *
 * Características:
 * - Formulario de login con validación
 * - Integración completa con Firebase Auth
 * - Redirección automática después del login exitoso
 * - Manejo de errores con alertas al usuario
 * - Navegación al formulario de registro
 * - Botón de regreso al home
 * - Diseño responsive y accesible
 *
 * Flujo de autenticación:
 * 1. Usuario ingresa email y contraseña
 * 2. Al enviar, se ejecuta la función login()
 * 3. Se llama a authStore.loginUser() con las credenciales
 * 4. Si es exitoso, el watcher detecta el cambio en userAuthenticated
 * 5. Se redirige automáticamente a la ruta protegida
 * 6. Si falla, se muestra un alert con el mensaje de error
 *
 * Estados y reactividad:
 * - email y password son reactivos y se enlazan con v-model
 * - El watcher observa cambios en authStore.userAuthenticated
 * - La redirección es automática sin intervención manual
 */

import { ref, watch } from "vue";
import { useAuthStore } from "../store/AuthStore";
import { RouterLink, useRouter } from "vue-router";

import AuthForm from "../components/AuthForm.vue";
import Input from "../components/Input.vue";

// Instancias de store y router
const authStore = useAuthStore();
const router = useRouter();

/**
 * Estados reactivos para los campos del formulario
 * Se enlazan con v-model en los componentes Input
 */
const email = ref("");
const password = ref("");

/**
 * Configuración del botón secundario para cambiar al formulario de registro
 * @type {Object}
 * @property {string} text - Texto mostrado en el botón
 * @property {Function} action - Función ejecutada al hacer clic
 */
const changeForm = {
  text: "¿Deseas registrarte?",
  action: () => redirectToRoute("register"),
};

/**
 * Configuración del campo de email
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
 * Configuración del campo de contraseña
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
 * Función principal de inicio de sesión
 *
 * @async
 * @function login
 * @throws {Error} Re-lanza errores de Firebase para mostrar al usuario
 *
 * Comportamiento:
 * - Llama al store para autenticar con Firebase
 * - No maneja la redirección (se hace via watcher)
 * - Muestra alertas de error si la autenticación falla
 * - Los errores comunes incluyen: credenciales incorrectas, usuario no encontrado, etc.
 */
const login = async () => {
  try {
    await authStore.loginUser(email.value, password.value);
    // La redirección se maneja automáticamente via watcher
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
 */
const redirectToRoute = (routeName) => {
  router.push({ name: routeName });
};

/**
 * Watcher reactivo para redirección automática
 *
 * Observa cambios en authStore.userAuthenticated y redirige
 * automáticamente a la ruta protegida cuando el usuario se autentica exitosamente.
 *
 * Comportamiento:
 * - Se ejecuta cada vez que userAuthenticated cambia
 * - Solo redirige cuando isAuth es true (usuario autenticado)
 * - Esto garantiza que la redirección ocurra después de que Firebase
 *   actualice el estado del usuario via onAuthStateChanged
 *
 * Ventajas de este enfoque:
 * - Separación de responsabilidades (login solo autentica, watcher redirige)
 * - Manejo automático del timing de Firebase
 * - Reactividad completa con el estado global
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
 * Se pueden agregar estilos personalizados aquí si es necesario
 */
</style>
