export { auth as middleware } from "@acme/auth";

export const config = {
  matcher: [
    "/auth",
    "/auth/(.*)",
    "/settings/(.*)",
    "/profile",
    "/settings",
    "/settings/(.*)",
  ],
};
