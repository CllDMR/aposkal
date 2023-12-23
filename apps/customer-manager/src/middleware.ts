export { auth as middleware } from "@acme/auth";

export const config = {
  matcher: [
    "/dashboard",
    "/companies",
    "/companies/(.*)",
    "/address-companies",
    "/address-companies/(.*)",
    "/settings",
    "/settings/(.*)",
  ],
};
