const domain =
  process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined;
const cookiePrefix = "__Secure";
const useSecureCookies = process.env.NODE_ENV === "production";

export const authConfig = {
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? `__Secure-authjs.session-token`
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
        process.env.NODE_ENV === "production"
          ? `__Secure-authjs.callback-url`
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
        process.env.NODE_ENV === "production"
          ? `__Host-authjs.csrf-token`
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
        process.env.NODE_ENV === "production"
          ? `${cookiePrefix}authjs.pkce.code_verifier`
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
        process.env.NODE_ENV === "production"
          ? `${cookiePrefix}authjs.state`
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
        process.env.NODE_ENV === "production"
          ? `${cookiePrefix}authjs.nonce`
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
        id: token.sub,
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
            token.ti = session?.user.ti;
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
};
