import NextAuth from "next-auth";

import { authOptions } from "./api/auth/authOptions";

export default NextAuth(authOptions).auth;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|auth|images|favicon.ico|robots.txt|.*\\.png|.*\\.svg|$).*)",
  ],
};
