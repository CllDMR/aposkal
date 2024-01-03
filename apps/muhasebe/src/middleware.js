export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|images|favicon.ico|robots.txt|.*\\.png|.*\\.svg|$).*)",
  ],
};
