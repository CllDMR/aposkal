import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  session: { strategy: "jwt" },
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
