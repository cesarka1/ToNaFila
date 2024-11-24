// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.NUXT_ENV_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_ENV_FIREBASE_APP_ID,
    },
  },
});
