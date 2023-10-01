import { withAuth } from "next-auth/middleware";

import { getBaseAuthUrl, getBaseUrl } from "./utils/get-base-url";

const baseUrl = getBaseUrl();
const encodedBaseUrlQuery = `?callbackUrl=${encodeURIComponent(baseUrl)}`;
const baseAuthUrl = getBaseAuthUrl();

const toAuthURL = (path: string) =>
  `${baseAuthUrl}${path}${encodedBaseUrlQuery}`;

export default withAuth({
  pages: {
    signIn: toAuthURL("/auth/login"),
    signOut: toAuthURL("/auth/logout"),
    newUser: toAuthURL("/auth/register"),
    verifyRequest: toAuthURL("/auth/verify-email"),
  },
  callbacks: {
    authorized({ token }) {
      return !!token?.sub && !!token.email && !!token.ti && !!token.tn;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard",
    "/addresses",
    "/addresses/(.*)",
    "/sale-orders",
    "/sale-orders/(.*)",
    "/posts",
    "/posts/(.*)",
    "/settings",
    "/settings/(.*)",
  ],
};
