import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db, eq, schema, tableCreator } from "@acme/db";

import { env } from "./env.mjs";

export type { Session } from "@auth/core";

export const providers = [""] as const;
export type OAuthProviders = (typeof providers)[number];

const domain = env.NODE_ENV === "production" ? env.DOMAIN : undefined;
const cookiePrefix = "__Secure";
const useSecureCookies = env.NODE_ENV === "production";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name:
        env.NODE_ENV === "production"
          ? `__Secure-next-auth.session-token`
          : `next-auth.session-token`,
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
          ? `__Secure-next-auth.callback-url`
          : `next-auth.callback-url`,
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
          ? `__Host-next-auth.csrf-token`
          : `next-auth.csrf-token`,
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
          ? `${cookiePrefix}next-auth.pkce.code_verifier`
          : `next-auth.pkce.code_verifier`,
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
          ? `${cookiePrefix}next-auth.state`
          : `next-auth.state`,
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
          ? `${cookiePrefix}next-auth.nonce`
          : `next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        domain,
      },
    },
  },
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
          .where(eq(schema.user.email, credentials.email as string))
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
          .where(eq(schema.user.email, credentials.email as string))
          .limit(1)
          .then((a) => a[0]);

        if (user) throw new Error("Already exists");
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
            .limit(1)
            .then((a) => a[0]);

          // if (typeof window === "undefined") {
          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          //   const {
          //     createTransport,
          //     getTestMessageUrl,
          //     // eslint-disable-next-line @typescript-eslint/no-var-requires
          //   } = require("nodemailer");

          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          //   const transporter = createTransport({
          //     host: "smtp.ethereal.email",
          //     port: 587,
          //     auth: {
          //       user: "clotilde.weissnat@ethereal.email",
          //       pass: "GJ2BZFrt8zG3YQd9JD",
          //     },
          //   });

          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          //   const info = await transporter.sendMail({
          //     from: '"Clotilde Weissnat" <clotilde.weissnat@ethereal.email>', // sender address
          //     to: credentials.email, // list of receivers
          //     subject: "Verify Your Email", // Subject line
          //     html: `<a href='http://localhost:3000/auth/verify-email?token=${
          //       newUser!.id
          //     }'>Verify email</a>`, // html body
          //   });

          //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          //   console.log(getTestMessageUrl(info));
          // }

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
        if (request.nextUrl.pathname.startsWith("/auth/register")) return true;
        else return !!auth?.user.id && !!auth?.user.email;

      return (
        !!auth?.user?.id &&
        !!auth?.user.email &&
        !!auth?.user.ti &&
        !!auth?.user.tn
      );
    },
    // signIn({ account, user, credentials, email, profile }) {
    //   return "";
    // },

    // authorized({ request: _, auth }) {
    //   return !!auth?.user;
    // },
  },
});
