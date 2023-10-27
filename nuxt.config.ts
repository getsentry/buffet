// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss', '@vueuse/nuxt'],
  typescript: {
    typeCheck: true,
    strict: true,
  },
});
