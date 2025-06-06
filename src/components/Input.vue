<template>
  <div>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent placeholder-gray-400 text-gray-800"
    />
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  modelValue: { type: [String, Number], default: "" },
  type: { type: String, default: "text" },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
});
</script>

<style scoped></style>
