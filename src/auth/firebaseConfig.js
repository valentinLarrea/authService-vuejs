import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Configuración de Firebase
 *
 * Este archivo configura la conexión con Firebase Authentication.
 * Para usar este código:
 *
 * 1. Crea un proyecto en Firebase Console (https://console.firebase.google.com/)
 * 2. Ve a "Project Settings" > "General" > "Your apps"
 * 3. Registra una nueva app web o selecciona una existente
 * 4. Copia las claves de configuración de Firebase
 * 5. Reemplaza los valores de ejemplo en firebaseConfig con tus claves reales
 * 6. En Authentication, habilita el método "Email/Password"
 */

// Configuración de Firebase - Reemplaza con tus claves reales
const firebaseConfig = {
  apiKey: "API_KEY", // Tu API Key de Firebase
  authDomain: "AUTH_DOMAIN", // Tu dominio de autenticación (proyecto-id.firebaseapp.com)
  projectId: "PROJECT_ID", // ID de tu proyecto Firebase
  storageBucket: "STORAGE_BUCKET", // Bucket de almacenamiento (proyecto-id.appspot.com)
  messagingSenderId: "MESSAGING_SENDER_ID", // ID del remitente de mensajería
  appId: "APP_ID", // ID de la aplicación
};

/**
 * Inicializa la aplicación Firebase con la configuración proporcionada
 * @type {FirebaseApp}
 */
const app = initializeApp(firebaseConfig);

/**
 * Instancia del servicio de autenticación de Firebase
 * Esta instancia se usa en todo el store de autenticación para:
 * - Registrar usuarios (createUserWithEmailAndPassword)
 * - Iniciar sesión (signInWithEmailAndPassword)
 * - Cerrar sesión (signOut)
 * - Escuchar cambios de estado (onAuthStateChanged)
 *
 * @type {Auth}
 */
export const auth = getAuth(app);
