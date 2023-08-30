import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
  },
  callbacks: {
    authorized({ token }) {
      return !!(token?.sub && token.email && token.ti && token.tn);
    },
  },
});

export const config = {
  matcher: [
    "/auth/select-tenant",
    "/auth/verify-email",
    "/auth/verify-email-sent",
    "/auth/logout",
    "/dashboard",
    "/posts",
    "/posts/(.*)",
    "/settings",
    "/settings/(.*)",
  ],
};
