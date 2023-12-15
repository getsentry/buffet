import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  const config = useRuntimeConfig();

  const sentryConfig = (config.public as any).sentry as {
    dsn: string;
    environment: string;
  };

  const { dsn, environment } = sentryConfig;

  if (!dsn) {
    return;
  }

  Sentry.init({
    app: nuxtApp.vueApp,
    dsn,
    environment,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay(),
    ],

    tracesSampleRate: environment === "development" ? 1.0 : 0.2,
    tracePropagationTargets: ["localhost", /^https:\/\/buffet.*\.sentry\.dev/],

    replaysSessionSampleRate: environment === "development" ? 1.0 : 0.2,
    replaysOnErrorSampleRate: 1.0,
  });
});
