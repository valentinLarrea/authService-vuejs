<template>
  <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
    <!-- Título del formulario -->
    <h1
      class="text-3xl font-bold text-text uppercase mb-6 text-center tracking-wide font-raleway"
    >
      {{ props.titleText }}
    </h1>

    <!-- Formulario principal con prevención de envío por defecto -->
    <form @submit.prevent="props.onSubmit" class="flex flex-col gap-4">
      <!-- Slot para inputs personalizados desde el componente padre -->
      <slot name="inputs"></slot>

      <!-- Contenedor de botones -->
      <div class="flex items-center justify-between gap-4 mt-6">
        <!-- Botón principal de envío del formulario -->
        <button
          type="submit"
          class="bg-text text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition font-raleway"
        >
          {{ props.textButton }}
        </button>

        <!-- Botón secundario para cambiar de formulario -->
        <button
          type="button"
          class="text-text py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition font-raleway"
          @click="props.changeForm.action"
        >
          {{ props.changeForm.text }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
/**
 * Componente AuthForm - Formulario reutilizable para autenticación
 *
 * Este componente proporciona una estructura base para formularios de autenticación
 * (login, registro, etc.) con un diseño consistente y funcionalidad común.
 *
 * Características:
 * - Formulario responsive con Tailwind CSS
 * - Slot para inputs personalizados
 * - Botón principal de envío
 * - Botón secundario para cambiar entre formularios
 * - Prevención de envío por defecto del formulario
 */

import { defineProps } from "vue";

/**
 * Props del componente AuthForm
 */
const props = defineProps({
  /**
   * Título principal del formulario
   * @type {String}
   * @default "Formulario de Autenticación"
   */
  titleText: {
    type: String,
    default: "Formulario de Autenticación",
  },

  /**
   * Texto del botón principal de envío
   * @type {String}
   * @default "Enviar"
   */
  textButton: {
    type: String,
    default: "Enviar",
  },

  /**
   * Función que se ejecuta al enviar el formulario
   * Debe ser una función asíncrona que maneje la lógica de autenticación
   * @type {Function}
   * @required
   */
  onSubmit: {
    type: Function,
    required: true,
  },

  /**
   * Objeto que define el botón secundario para cambiar de formulario
   * @type {Object}
   * @property {String} text - Texto del botón secundario
   * @property {Function} action - Función a ejecutar al hacer clic
   * @default { text: "¿Deseas cambiar de formulario?", action: () => {} }
   */
  changeForm: {
    type: Object,
    default: () => ({
      text: "¿Deseas cambiar de formulario?",
      action: () => {},
    }),
  },
});
</script>

<style scoped>
/* 
 * Se pueden agregar estilos personalizados aquí si es necesario
 */
</style>
