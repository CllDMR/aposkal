export { auth as middleware } from "@acme/auth";

export const config = {
  matcher: [
    "/dashboard",
    "/address-tenants",
    "/address-tenants/(.*)",
    "/sale-offers",
    "/sale-offers/(.*)",
    "/sale-orders",
    "/sale-orders/(.*)",
    "/settings",
    "/settings/(.*)",
  ],
};
