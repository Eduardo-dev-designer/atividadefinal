
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDbxknmDEL1gIhsBPw6nXOK7qY8LmviAIM",
  authDomain: "atividade-6e64d.firebaseapp.com",
  databaseURL: "https://atividade-6e64d-default-rtdb.firebaseio.com",
  projectId: "atividade-6e64d",
  storageBucket: "atividade-6e64d.firebasestorage.app",
  messagingSenderId: "292163477104",
  appId: "1:292163477104:web:994f60ae6662204019deb5",
  measurementId: "G-JHRQR5QWJV"
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
