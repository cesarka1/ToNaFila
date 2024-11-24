import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const config = useRuntimeConfig();

const firebaseConfig = {
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: config.public.firebaseMessagingSenderId,
  appId: config.public.firebaseAppId,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Autenticação
const database = getDatabase(firebaseApp); // Realtime Database

export { firebaseApp, auth, database };
