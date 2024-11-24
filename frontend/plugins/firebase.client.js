import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    databaseURL: config.public.firebaseDatabaseURL,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  console.log("Firebase Config:", {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    databaseURL: config.public.firebaseDatabaseURL,
  });

  const app = initializeApp(firebaseConfig);

  const database = getDatabase(app);

  return {
    provide: {
      firebaseApp: app,
      database,
    },
  };
});
