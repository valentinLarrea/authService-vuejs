import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { auth } from "../auth/firebaseConfig";
import { setState } from "../utilities/state";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const { setError, setSuccess } = setState();

  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  const userAuthenticated = computed(() => !!user.value);

  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
      throw error;
    }
  };

  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Usuario registrado exitosamente.");
    } catch (error) {
      setError("Error al registrar usuario: " + error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setSuccess("Sesión cerrada exitosamente.");
    } catch (error) {
      setError("Error al cerrar sesión: " + error.message);
    }
  };

  return {
    user,
    userAuthenticated,
    loginUser,
    registerUser,
    logout,
  };
});
