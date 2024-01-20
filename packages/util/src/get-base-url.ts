import { env } from "@acme/env";

export const getBaseAuthUrl = () => {
  return env.NEXTAUTH_URL;
};

export const getBaseUrl = (
  domain:
    | "self"
    | "account"
    | "customer"
    | "inventory"
    | "logistic"
    | "muhasebe"
    | "order",
) => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (domain == "account" && env.NEXT_PUBLIC_ACCOUNT_BASE_URL)
    return env.NEXT_PUBLIC_ACCOUNT_BASE_URL;
  if (domain == "customer" && env.NEXT_PUBLIC_CUSTOMER_BASE_URL)
    return env.NEXT_PUBLIC_CUSTOMER_BASE_URL;
  if (domain == "inventory" && env.NEXT_PUBLIC_INVENTORY_BASE_URL)
    return env.NEXT_PUBLIC_INVENTORY_BASE_URL;
  if (domain == "logistic" && env.NEXT_PUBLIC_LOGISTIC_BASE_URL)
    return env.NEXT_PUBLIC_LOGISTIC_BASE_URL;
  if (domain == "muhasebe" && env.NEXT_PUBLIC_MUHASEBE_BASE_URL)
    return env.NEXT_PUBLIC_MUHASEBE_BASE_URL;
  if (domain == "order" && env.NEXT_PUBLIC_ORDER_BASE_URL)
    return env.NEXT_PUBLIC_ORDER_BASE_URL;
  if (env.VERCEL_URL) return env.VERCEL_URL; // SSR should use vercel url

  return `http://localhost:${env.MUHASEBE_PORT}`; // dev SSR should use localhost
};
