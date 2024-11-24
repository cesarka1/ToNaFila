// https://nuxt.com/docs/api/configuration/nuxt-config

import * as dotenv from "dotenv";

dotenv.config();

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: ["~/plugins/firebase.client.js"],

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseURL: process.env.NUXT_ENV_FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_ENV_FIREBASE_APP_ID,
    },
  },

  compatibilityDate: "2024-11-24",
});