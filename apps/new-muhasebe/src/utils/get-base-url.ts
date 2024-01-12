import { env } from "~/env.mjs";

export const getBaseAuthUrl = () => {
  return env.NEXTAUTH_URL;
};

export const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.NEXT_PUBLIC_MUHASEBE_BASE_URL)
    return process.env.NEXT_PUBLIC_MUHASEBE_BASE_URL;
  if (process.env.VERCEL_URL) return process.env.VERCEL_URL; // SSR should use vercel url

  return `http://localhost:${process.env.MUHASEBE_PORT}`; // dev SSR should use localhost
};
