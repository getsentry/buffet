import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import { H3Error } from "h3";

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig();

  const sentryConfig = (config.public as any).sentry as {
    dsn: string;
    environment: string;
  };

  const { dsn, environment } = sentryConfig;

  if (!dsn) {
    console.warn("Sentry DSN is not set, skipping Sentry initialization");
    return;
  }

  Sentry.init({
    dsn,
    environment,
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: environment === "development" ? 1.0 : 0.2,
    profilesSampleRate: environment === "development" ? 1.0 : 0.2,
  });

  nitroApp.hooks.hook("error", (error) => {
    if (error instanceof H3Error) {
      if (error.statusCode === 404 || error.statusCode === 422) {
        return;
      }
    }
    Sentry.captureException(error);
  });

  nitroApp.hooks.hook("request", (event) => {
    event.context.$sentry = Sentry;
  });

  nitroApp.hooks.hookOnce("close", async () => {
    await Sentry.close(2000);
  });
});
