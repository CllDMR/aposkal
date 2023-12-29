import { env } from "~/env.mjs";

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (env.NEXT_PUBLIC_ORDER_BASE_URL) return env.NEXT_PUBLIC_ORDER_BASE_URL;
  if (env.VERCEL_URL) return env.VERCEL_URL; // SSR should use vercel url

  return `http://localhost:${env.PORT}`; // dev SSR should use localhost
};

export const getBaseAuthUrl = () => {
  return env.NEXTAUTH_URL;
};
