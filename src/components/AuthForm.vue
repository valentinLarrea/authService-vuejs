<template>
  <div class="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
    <h1 class="text-3xl font-bold text-primary uppercase mb-6 text-center tracking-wide">
      {{ titleText }}
    </h1>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4">
      <slot name="inputs"></slot>
      <div class="flex items-center justify-between gap-4 mt-6">
        <button
        type="submit"
        class="bg-blue-800 text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition"
      >
        {{ textButton }}
      </button>
      <button
        type="button"
        class="text-text py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition"
        @click="changeForm.action"
      >
        {{ changeForm.text }}
      </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  titleText: { type: String, default: "Formulario de Autenticación" },
  textButton: { type: String, default: "Enviar" },
  onSubmit: { type: Function, required: true },
  changeForm: {
    type: Object,
    default: () => ({
      text: "¿Deseas cambiar de formulario?",
      action: () => {}
    })
  }
});
</script>

<style scoped></style>
