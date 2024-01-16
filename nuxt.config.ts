// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      api: process.env.APIURL,
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss", "nuxt-snackbar", "nuxt-icon"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
