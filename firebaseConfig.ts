
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "COLE_AQUI_API_KEY",
  authDomain: "COLE_AQUI_AUTH_DOMAIN",
  databaseURL: "COLE_AQUI_DATABASE_URL",
  projectId: "COLE_AQUI_PROJECT_ID",
  storageBucket: "COLE_AQUI_STORAGE_BUCKET",
  messagingSenderId: "COLE_AQUI_MESSAGING_SENDER_ID",
  appId: "COLE_AQUI_APP_ID",
};

// Evita inicializar o Firebase mais de uma vez
export const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

// Serviços do Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);

// Verifica se as credenciais foram preenchidas
export const firebaseConfigurado =
  Boolean(firebaseConfig.apiKey) &&
  Boolean(firebaseConfig.projectId) &&
  Boolean(firebaseConfig.appId) &&
  Boolean(firebaseConfig.databaseURL) &&
  !Object.values(firebaseConfig).some(
    (valor) => valor.startsWith("COLE_AQUI")
  );
