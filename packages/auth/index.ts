import Credentials from "@auth/core/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import { db, eq, schema, tableCreator } from "@acme/db";

export { useSession } from "next-auth/react";
export type { UpdateSession } from "next-auth/react";

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = [""] as const;
export type OAuthProviders = (typeof providers)[number];

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth({
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db, tableCreator),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "J Smith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const user = await db
          .select()
          .from(schema.user)
          .where(eq(schema.user.email, credentials.email as string))
          .then((a) => a[0]);

        if (user) return user;
        else {
          await db
            .insert(schema.user)
            .values({
              email: credentials.email as string,
              name: credentials.name as string,
            })
            .execute();

          const newUser = await db
            .select()
            .from(schema.user)
            .where(eq(schema.user.email, credentials.email as string))
            .then((a) => a[0]);
          return newUser ?? null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        tid: token.tid,
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
            token.image = profile.picture;
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
            token.image = profile.picture;
          }

          if (account) {
            /* empty */
          }

          break;
        case "update":
          if (session) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            token.ti = session.user.ti;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            token.tn = session.user.tn;
          }
          break;

        default:
          break;
      }

      return token;
    },
    authorized({ request: _, auth }) {
      return !!auth?.user;
    },
  },
});
