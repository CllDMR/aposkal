export { default } from "next-auth/middleware";

export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero or one
  // add [customerID] to the path
  matcher: ["/app/:path*"],
};
