// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  sourcemap: {
    server: true,
    client: true,
  },
  runtimeConfig: {
    public: {
      sentry: {
        dsn: "", // will be overwritten by NUXT_PUBLIC_SENTRY_DSN variable
        environment: "development", // will be overwritten by NUXT_PUBLIC_SENTRY_ENVIRONMENT
      },
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/create": { ssr: false },
  },
  modules: [
    "@nuxtjs/eslint-module",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    [
      "@vee-validate/nuxt",
      {
        autoImports: true,
      },
    ],
  ],
  typescript: {
    typeCheck: true,
    strict: true,
  },
  supabase: {
    redirect: false,
  },
});
