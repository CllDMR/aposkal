export { auth as middleware } from "@acme/auth";

export const config = {
  matcher: ["/dashboard", "/settings", "/settings/(.*)"],
};
