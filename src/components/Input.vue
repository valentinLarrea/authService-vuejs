<template>
  <div>
    <!-- Input personalizado con estilos de Tailwind y soporte para v-model -->
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 font-raleway border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-gray-800"
    />
  </div>
</template>

<script setup>
/**
 * Componente Input - Input reutilizable con soporte para v-model
 *
 * Este componente proporciona un input HTML personalizado con estilos consistentes
 * y soporte completo para v-model del componente padre.
 *
 * Características:
 * - Soporte completo para v-model (modelValue + update:modelValue)
 * - Estilos personalizados con Tailwind CSS
 * - Tipos de input flexibles (text, email, password, etc.)
 * - Estados de focus con anillo de color accent
 * - Validación HTML5 opcional
 */

import { defineProps } from "vue";

/**
 * Props del componente Input
 * Implementa la interfaz necesaria para v-model y configuración del input
 */
defineProps({
  /**
   * Valor actual del input (para v-model)
   * Se enlaza con :value y se actualiza mediante el evento update:modelValue
   * @type {String|Number}
   * @default ""
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },

  /**
   * Tipo del input HTML
   * Acepta cualquier tipo válido de input (text, email, password, number, etc.)
   * @type {String}
   * @default "text"
   */
  type: {
    type: String,
    default: "text",
  },

  /**
   * Atributo name del input
   * Útil para formularios y accesibilidad
   * @type {String}
   * @default ""
   */
  name: {
    type: String,
    default: "",
  },

  /**
   * Texto de placeholder que se muestra cuando el input está vacío
   * @type {String}
   * @default ""
   */
  placeholder: {
    type: String,
    default: "",
  },

  /**
   * Define si el input es requerido para validación HTML5
   * @type {Boolean}
   * @default false
   */
  required: {
    type: Boolean,
    default: false,
  },
});

/**
 * Eventos emitidos por el componente
 *
 * @event update:modelValue - Se emite cuando el valor del input cambia
 * @param {String} value - Nuevo valor del input
 *
 * Este evento es necesario para que v-model funcione correctamente.
 * El componente padre recibirá automáticamente este evento y actualizará
 * la variable enlazada con v-model.
 */
</script>

<style scoped>
/* 
 * Se pueden agregar estilos personalizados aquí si es necesario
 */
</style>
