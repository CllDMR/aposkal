import type { NextAuthConfig } from "next-auth";

import { env } from "./env.mjs";

const domain = env.NODE_ENV === "production" ? env.DOMAIN : undefined;
const cookiePrefix = "__Secure";
const useSecureCookies = env.NODE_ENV === "production";

export const authConfig = {
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name:
        env.NODE_ENV === "production"
          ? `${cookiePrefix}-authjs.session-token`
          : `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain,
      },
    },
    callbackUrl: {
      name:
        env.NODE_ENV === "production"
          ? `${cookiePrefix}-authjs.callback-url`
          : `authjs.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: true,
        domain,
      },
    },
    csrfToken: {
      name:
        env.NODE_ENV === "production"
          ? `${cookiePrefix}-authjs.csrf-token`
          : `authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
        domain,
      },
    },
    pkceCodeVerifier: {
      name:
        env.NODE_ENV === "production"
          ? `${cookiePrefix}-authjs.pkce.code_verifier`
          : `authjs.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
        domain,
      },
    },
    state: {
      name:
        env.NODE_ENV === "production"
          ? `${cookiePrefix}-authjs.state`
          : `authjs.state`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        maxAge: 900,
        domain,
      },
    },
    nonce: {
      name:
        env.NODE_ENV === "production"
          ? `${cookiePrefix}-authjs.nonce`
          : `authjs.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain,
      },
    },
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
        ti: token.ti,
        tn: token.tn,
        email: token.email,
        image: token.picture,
        name: token.name,
      },
    }),
    jwt: ({ token, profile, account, user, trigger, session }) => {
      switch (trigger) {
        case "signIn":
          if (user) {
            token.sub = user.id;
            token.email = user.email;
            token.name = user.name;
            token.picture = user.image;
          }
          if (profile) {
            token.image = profile.image;
          }
          if (account) {
            /* empty */
          }
          break;
        case "signUp":
          if (user) {
            token.sub = user.id;
            token.email = user.email;
            token.name = user.name;
            token.picture = user.image;
          }
          if (profile) {
            token.image = profile.image;
          }
          if (account) {
            /* empty */
          }
          break;
        case "update":
          if (session) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            token.ti = session?.user.ti;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            token.tn = session?.user.tn;
          }
          break;
        default:
          break;
      }
      return token;
    },
    authorized: ({ auth, request }) => {
      if (request.nextUrl.pathname.startsWith("/auth"))
        if (request.nextUrl.pathname === "/auth/login") return true;
        else if (request.nextUrl.pathname === "/auth/select-tenant")
          return true;
        else if (request.nextUrl.pathname === "/auth/register") return true;
        else return !!auth?.user.id && !!auth?.user.email;
      return (
        !!auth?.user?.id &&
        !!auth?.user.email &&
        !!auth?.user.ti &&
        !!auth?.user.tn
      );
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
