import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    NODE_ENV: z.union([
      z.literal("production"),
      z.literal("development"),
      z.literal("test"),
    ]),
  },
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    ACCOUNT_SUBDOMAIN: z.string(),
    ACCOUNT_PORT: z.coerce.number(),

    CUSTOMER_SUBDOMAIN: z.string(),
    CUSTOMER_PORT: z.coerce.number(),

    INVENTORY_SUBDOMAIN: z.string(),
    INVENTORY_PORT: z.coerce.number(),

    LOGISTIC_SUBDOMAIN: z.string(),
    LOGISTIC_PORT: z.coerce.number(),

    ORDER_SUBDOMAIN: z.string(),
    ORDER_PORT: z.coerce.number(),

    DOMAIN: z.string(),
    PORT: z.coerce.number(),

    NEXTAUTH_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_ACCOUNT_BASE_URL: z.string(),
    NEXT_PUBLIC_CUSTOMER_BASE_URL: z.string(),
    NEXT_PUBLIC_INVENTORY_BASE_URL: z.string(),
    NEXT_PUBLIC_LOGISTIC_BASE_URL: z.string(),
    NEXT_PUBLIC_ORDER_BASE_URL: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    ACCOUNT_SUBDOMAIN: process.env.ACCOUNT_SUBDOMAIN,
    ACCOUNT_PORT: process.env.ACCOUNT_PORT,

    CUSTOMER_SUBDOMAIN: process.env.CUSTOMER_SUBDOMAIN,
    CUSTOMER_PORT: process.env.CUSTOMER_PORT,

    INVENTORY_SUBDOMAIN: process.env.INVENTORY_SUBDOMAIN,
    INVENTORY_PORT: process.env.INVENTORY_PORT,

    LOGISTIC_SUBDOMAIN: process.env.LOGISTIC_SUBDOMAIN,
    LOGISTIC_PORT: process.env.LOGISTIC_PORT,

    ORDER_SUBDOMAIN: process.env.ORDER_SUBDOMAIN,
    ORDER_PORT: process.env.ORDER_PORT,

    DOMAIN: process.env.DOMAIN,
    PORT: process.env.LOGISTIC_PORT,

    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    VERCEL_URL: process.env.VERCEL_URL,
    DATABASE_URL: process.env.DATABASE_URL,

    NEXT_PUBLIC_ACCOUNT_BASE_URL: process.env.NEXT_PUBLIC_ACCOUNT_BASE_URL,
    NEXT_PUBLIC_CUSTOMER_BASE_URL: process.env.NEXT_PUBLIC_CUSTOMER_BASE_URL,
    NEXT_PUBLIC_INVENTORY_BASE_URL: process.env.NEXT_PUBLIC_INVENTORY_BASE_URL,
    NEXT_PUBLIC_LOGISTIC_BASE_URL: process.env.NEXT_PUBLIC_LOGISTIC_BASE_URL,
    NEXT_PUBLIC_ORDER_BASE_URL: process.env.NEXT_PUBLIC_ORDER_BASE_URL,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
