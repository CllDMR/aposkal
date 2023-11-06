import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
    verifyRequest: "/auth/verify-email",
  },
  callbacks: {
    authorized({ token, req }) {
      if (req.nextUrl.pathname.startsWith("/auth"))
        if (req.nextUrl.pathname.startsWith("/auth/register")) return true;
        else return !!token?.sub && !!token.email;

      return !!token?.sub && !!token.email && !!token.ti && !!token.tn;
    },
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
    },
  },
});

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
