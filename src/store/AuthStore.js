/**
 * Store de Autenticación con Pinia
 *
 * Este store maneja todo el estado y las operaciones relacionadas con la autenticación
 * de usuarios usando Firebase. Proporciona un punto centralizado
 * para manejar login, registro, logout y el estado del usuario autenticado.
 *
 * Características:
 * - Estado reactivo del usuario autenticado
 * - Métodos para login, registro y logout
 * - Manejo de errores centralizado
 * - Sincronización automática con Firebase Auth
 * - Integración con el sistema de notificaciones de estado
 */

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

/**
 * Store de autenticación usando Pinia con Composition API
 *
 * @returns {Object} Objeto con estado y métodos del store
 */
export const useAuthStore = defineStore("auth", () => {
  /**
   * Estado reactivo del usuario actual
   * Contiene el objeto usuario de Firebase o null si no hay usuario autenticado
   * @type {Ref<User|null>}
   */
  const user = ref(null);

  /**
   * Funciones para manejar estados de la aplicación (error, success)
   * Importadas del utils de estado centralizado
   */
  const { setError, setSuccess } = setState();

  /**
   * Listener de cambios de estado de autenticación de Firebase
   *
   * Se ejecuta automáticamente cuando:
   * - El usuario inicia sesión
   * - El usuario cierra sesión
   * - Se registra un nuevo usuario
   * - Se refresca la página (mantiene la sesión)
   *
   * Mantiene sincronizado el estado local con Firebase Auth
   */
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser;
  });

  /**
   * Computed que indica si hay un usuario autenticado
   * Convierte el objeto user en un boolean para facilitar las validaciones
   * @type {ComputedRef<boolean>}
   * @returns {boolean} true si hay usuario autenticado, false en caso contrario
   */
  const userAuthenticated = computed(() => !!user.value);

  /**
   * Inicia sesión de un usuario existente
   *
   * @async
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @throws {Error} Lanza error si las credenciales son incorrectas o hay problemas de red
   *
   * Comportamiento:
   * - Si es exitoso: actualiza automáticamente el estado user via onAuthStateChanged
   * - Si falla: muestra mensaje de error y lanza excepción para manejo en el componente
   */
  const loginUser = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
      throw error; // Re-lanza para que el componente pueda manejarlo
    }
  };

  /**
   * Registra un nuevo usuario en el sistema
   *
   * @async
   * @param {string} email - Correo electrónico del nuevo usuario
   * @param {string} password - Contraseña del nuevo usuario (mínimo 6 caracteres)
   * @throws {Error} Lanza error si el email ya existe, la contraseña es débil, etc.
   *
   * Comportamiento:
   * - Si es exitoso: crea la cuenta Y autentica automáticamente al usuario
   * - Actualiza el estado user via onAuthStateChanged
   * - Muestra mensaje de éxito
   * - Si falla: muestra mensaje de error y lanza excepción
   */
  const registerUser = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Usuario registrado exitosamente.");
      // Firebase autentica automáticamente al usuario después del registro
    } catch (error) {
      setError("Error al registrar usuario: " + error.message);
      throw error; // Re-lanza para que el componente pueda manejarlo
    }
  };

  /**
   * Cierra la sesión del usuario actual
   *
   * @async
   * @throws {Error} Lanza error si hay problemas de red o con Firebase
   *
   * Comportamiento:
   * - Cierra la sesión en Firebase
   * - Actualiza automáticamente user a null via onAuthStateChanged
   * - Muestra mensaje de éxito
   * - Si falla: muestra mensaje de error (pero no re-lanza la excepción)
   */
  const logout = async () => {
    try {
      await signOut(auth);
      setSuccess("Sesión cerrada exitosamente.");
      // onAuthStateChanged actualizará user a null automáticamente
    } catch (error) {
      setError("Error al cerrar sesión: " + error.message);
    }
  };

  /**
   * API pública del store
   * Expone solo lo necesario para los componentes
   */
  return {
    // Estado reactivo
    user, // Objeto usuario completo de Firebase
    userAuthenticated, // Boolean computed para validaciones rápidas

    // Métodos de autenticación
    loginUser, // Iniciar sesión
    registerUser, // Registrar nuevo usuario
    logout, // Cerrar sesión
  };
});
