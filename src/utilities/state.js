/**
 * Utilidades para manejo de estado de la aplicación
 *
 * Este módulo proporciona funciones reutilizables para manejar estados comunes
 * como loading, errores y mensajes de éxito en toda la aplicación.
 *
 * Características:
 * - Estado de carga reactivo con Vue 3
 * - Funciones para mostrar mensajes de error
 * - Funciones para mostrar mensajes de éxito
 * - Automatización del estado de loading
 */

import { ref } from "vue";

/**
 * Factory function que crea un conjunto de funciones para manejar estados
 *
 * Crea una instancia aislada de funciones de estado que pueden ser usadas
 * en stores, componentes o cualquier parte de la aplicación.
 *
 * @returns {Object} Objeto con funciones para manejar estado
 */
export function setState() {
  /**
   * Estado reactivo de carga
   * Indica si hay alguna operación en progreso
   * @type {Ref<boolean>}
   */
  const loading = ref(false);

  /**
   * Maneja mensajes de error y actualiza el estado de loading
   *
   * @param {string} msg - Mensaje de error a mostrar/retornar
   * @returns {string} El mismo mensaje de error para encadenamiento
   *
   * Comportamiento:
   * - Establece loading a false (la operación ha terminado con error)
   * - Retorna el mensaje para que pueda ser usado por el llamador
   * - Puede ser extendido para mostrar notificaciones, logs, etc.
   */
  const setError = (msg) => {
    loading.value = false;
    return msg;
  };

  /**
   * Maneja mensajes de éxito y actualiza el estado de loading
   *
   * @param {string} msg - Mensaje de éxito a mostrar/retornar
   * @returns {string} El mismo mensaje de éxito para encadenamiento
   *
   * Comportamiento:
   * - Establece loading a false (la operación ha terminado exitosamente)
   * - Retorna el mensaje para que pueda ser usado por el llamador
   * - Puede ser extendido para mostrar notificaciones, logs, etc.
   */
  const setSuccess = (msg) => {
    loading.value = false;
    return msg;
  };

  /**
   * API pública de la función setState
   *
   * Actualmente no se expone 'loading' ni 'setLoading',
   * pero pueden agregarse si se necesitan en el futuro:
   *
   * const setLoading = (msg) => {
   *     loading.value = true;
   *     return msg;
   * }
   *
   * return { loading, setLoading, setError, setSuccess };
   */
  return {
    setError, // Función para manejar errores
    setSuccess, // Función para manejar éxitos
  };
}
