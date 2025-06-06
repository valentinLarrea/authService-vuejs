import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Si vas a utilizar este code, fijate de crear un proyecto en Firebase y 
// reemplazar los valores de firebaseConfig con los de tu proyecto :')))

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);