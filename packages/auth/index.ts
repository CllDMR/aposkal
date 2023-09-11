import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthOptions, Session } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db, eq, schema, tableCreator } from "@acme/db";

// import { sendMail } from "./mailer";

export type { Session } from "next-auth";
export { getServerSession } from "next-auth/next";
export { signIn, signOut, useSession } from "next-auth/react";
export type { SessionContextValue } from "next-auth/react";

// Update this whenever adding new providers so that the client can
export const providers = [""] as const;
export type OAuthProviders = (typeof providers)[number];

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db, tableCreator),
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/register",
  },
  providers: [
    Credentials({
      id: "credentials-login",
      name: "Credentials Login",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials) throw new Error("No credentials");

        const user = await db
          .select()
          .from(schema.user)
          .where(eq(schema.user.email, credentials.email))
          .limit(1)
          .then((a) => a[0]);

        if (user?.emailVerified) return user;
        return null;
      },
    }),
    Credentials({
      id: "credentials-register",
      name: "Credentials Register",
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
        if (!credentials) throw new Error("No credentials");

        const user = await db
          .select()
          .from(schema.user)
          .where(eq(schema.user.email, credentials.email))
          .limit(1)
          .then((a) => a[0]);

        if (user) throw new Error("Already exists");
        else {
          await db
            .insert(schema.user)
            .values({
              email: credentials.email,
              name: credentials.name,
            })
            .execute();

          const newUser = await db
            .select()
            .from(schema.user)
            .where(eq(schema.user.email, credentials.email))
            .limit(1)
            .then((a) => a[0]);

          if (typeof window === "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const {
              createTransport,
              getTestMessageUrl,
              // eslint-disable-next-line @typescript-eslint/no-var-requires
            } = require("nodemailer");

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            const transporter = createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              auth: {
                user: "clotilde.weissnat@ethereal.email",
                pass: "GJ2BZFrt8zG3YQd9JD",
              },
            });

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            const info = await transporter.sendMail({
              from: '"Clotilde Weissnat" <clotilde.weissnat@ethereal.email>', // sender address
              to: credentials.email, // list of receivers
              subject: "Verify Your Email", // Subject line
              html: `<a href='http://localhost:3000/auth/verify-email?token=${
                newUser!.id
              }'>Verify email</a>`, // html body
            });

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            console.log(getTestMessageUrl(info));
          }

          // await sendMail({
          //   to: credentials.email,
          //   userId: newUser!.id,
          // });
          // const newUser = await db
          //   .select()
          //   .from(schema.user)
          //   .where(eq(schema.user.email, credentials.email))
          //   .then((a) => a[0]);
          // return newUser ?? null;
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
            token.ti = (session as Session)?.user.ti;
            token.tn = (session as Session)?.user.tn;
          }
          break;

        default:
          break;
      }

      return token;
    },
    // signIn({ account, user, credentials, email, profile }) {
    //   return "";
    // },

    // authorized({ request: _, auth }) {
    //   return !!auth?.user;
    // },
  },
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const handler = NextAuth(authOptions);
