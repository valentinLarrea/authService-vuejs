<template>
  <div class="bg-primary min-h-screen flex flex-col gap-4 items-center justify-center px-4">
    <div class="flex justify-center w-full">
      <RouterLink to="/" class="text-white rounded-xl py-2 uppercase font-bold px-8"> < Back to Home</RouterLink>
    </div>
    <div class="w-full max-w-md">
      <AuthForm :titleText="'Iniciar Sesión'" :textButton="'Iniciar Sesión'" :onSubmit="login" :changeForm="changeForm">
        <template #inputs>
          <Input
            :type="emailConfig.type"
            :name="emailConfig.name"
            :placeholder="emailConfig.placeholder"
            :required="emailConfig.required"
            v-model="email"
          />
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
import { ref, watch } from "vue";
import { useAuthStore } from "../store/AuthStore"
import { RouterLink, useRouter } from "vue-router";

import AuthForm from "../components/AuthForm.vue";
import Input from "../components/Input.vue";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref(""); 

const changeForm = {
  text: "¿Deseas registrarte?",
  action: () => redirectToRoute("register"),
};

const emailConfig = ref({
  type: "email",
  name: "email",
  placeholder: "Correo Electrónico",
  required: true,
});


const passConfig = ref({
  type: "password",
  name: "password",
  placeholder: "Contraseña",
  required: true,
});

const login = async () => {
  try {
    await authStore.loginUser(email.value, password.value);
  } catch (error) {
    alert(error.message);
  }
};

const redirectToRoute = (routeName) => {
  router.push({ name: routeName });
};

watch(() => authStore.userAuthenticated, (isAuth) => {
  if (isAuth) {
    redirectToRoute("protected");
  }
});
</script>

<style scoped></style>
