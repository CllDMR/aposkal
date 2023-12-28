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

    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),

    MAILCHIMP_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().optional(),
  },
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

    VERCEL_URL: process.env.VERCEL_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,

    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
