// Configuração do Firebase usando compatibilidade
// const firebaseConfig = {
//     apiKey: "AIzaSyAFTDzSGMMAXx1_Hk9I6uo4WAWwj3inVpM",
//     authDomain: "tonafila-64a15.firebaseapp.com",
//     projectId: "tonafila-64a15",
//     storageBucket: "tonafila-64a15.firebasestorage.app",
//     messagingSenderId: "301447080005",
//     appId: "1:301447080005:web:70317091daa3c810665b2c",
//     measurementId: "G-F16G1M7MWF",
//     databaseURL: "https://tonafila-64a15-default-rtdb.firebaseio.com"
// };
// Importa as funções necessárias do Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Configurações do Firebase (substitua pelos seus valores do Firebase Console)
const firebaseConfig = {
  apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASE_URL,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NUXT_ENV_FIREBASE_APP_ID,
};

// Inicializa o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Para autenticação
const database = getDatabase(firebaseApp); // Para o Realtime Database

export { firebaseApp, auth, database };

