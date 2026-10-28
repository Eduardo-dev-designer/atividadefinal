import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth,  initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// No Firebase Console: Configurações do projeto > Geral > Seus apps > Web.
// Use as credenciais do SEU projeto. Não copie credenciais de terceiros.
const firebaseConfig = {
  apiKey: "COLE_AQUI_API_KEY",
  authDomain: "COLE_AQUI_AUTH_DOMAIN",
  databaseURL: "COLE_AQUI_DATABASE_URL",
  projectId: "COLE_AQUI_PROJECT_ID",
  storageBucket: "COLE_AQUI_STORAGE_BUCKET",
  messagingSenderId: "COLE_AQUI_MESSAGING_SENDER_ID",
  appId: "COLE_AQUI_APP_ID"
};

export const firebaseConfigurado =
  Boolean(firebaseConfig.apiKey) &&
  Boolean(firebaseConfig.projectId) &&
  Boolean(firebaseConfig.appId) &&
  Boolean(firebaseConfig.databaseURL) &&
  !Object.values(firebaseConfig).some((valor) => valor.startsWith("COLE_AQUI"));

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = (() => {
  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch {
    // Caso o módulo já tenha sido inicializado durante Fast Refresh.
    return getAuth(app);
  }
})();

export const db = getFirestore(app);
export const database = getDatabase(app);
