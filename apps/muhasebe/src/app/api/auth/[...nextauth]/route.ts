export { GET, POST } from "@acme/auth";


// import { DrizzleAdapter } from "@auth/drizzle-adapter";
// import { compare, hash } from "bcryptjs";
// import { nanoid } from "nanoid";
// import type { NextAuthConfig } from "next-auth";
// import NextAuth, { AuthError } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// import { db, eq, schema, tableCreator } from "@acme/db";
// import { sendEmailVerifyEmailAddress } from "@acme/email";

// export type { Session } from "@auth/core";

// export const runtime = "node";
// export const providers = [""] as const;
// export type OAuthProviders = (typeof providers)[number];
// const saltRounds = 6;

// // const domain =
// //   process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined;
// const cookiePrefix = "__Secure";
// const useSecureCookies = process.env.NODE_ENV === "production";

// export const authOptions = {
//   session: { strategy: "jwt" },
//   adapter: DrizzleAdapter(db, tableCreator),
//   pages: {
//     signIn: "/auth/login",
//     signOut: "/auth/logout",
//     newUser: "/auth/register",
//     error: "/auth/error",
//     verifyRequest: "/auth/verifyRequest",
//   },
//   cookies: {
//     sessionToken: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? `${cookiePrefix}-authjs.session-token`
//           : `authjs.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: true,
//         // domain,
//       },
//     },
//     callbackUrl: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? `${cookiePrefix}-authjs.callback-url`
//           : `authjs.callback-url`,
//       options: {
//         sameSite: "lax",
//         path: "/",
//         secure: true,
//         // domain,
//       },
//     },
//     csrfToken: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? `${cookiePrefix}-authjs.csrf-token`
//           : `authjs.csrf-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: true,
//         // domain,
//       },
//     },
//     pkceCodeVerifier: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? `${cookiePrefix}-authjs.pkce.code_verifier`
//           : `authjs.pkce.code_verifier`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: useSecureCookies,
//         maxAge: 900,
//         // domain,
//       },
//     },
//     state: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? `${cookiePrefix}-authjs.state`
//           : `authjs.state`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: useSecureCookies,
//         maxAge: 900,
//         // domain,
//       },
//     },
//     nonce: {
//       name:
//         process.env.NODE_ENV === "production"
//           ? `${cookiePrefix}-authjs.nonce`
//           : `authjs.nonce`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: useSecureCookies,
//         // domain,
//       },
//     },
//   },
//   providers: [
//     Credentials({
//       id: "credentials",
//       name: "Credentials Login or Register",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "jsmith@example.com",
//           required: true,
//         },
//         name: {
//           label: "Name",
//           type: "text",
//           placeholder: "J Smith",
//           required: false,
//         },
//         password: { label: "Password", type: "password", required: true },
//       },
//       async authorize(credentials, _req) {
//         if (!credentials)
//           throw new AuthError({
//             name: "Credentials",
//             message: "No credentials provided.",
//           });

//         const user = await db
//           .select()
//           .from(schema.user)
//           .where(eq(schema.user.email, credentials.email as string))
//           .limit(1)
//           .then((a) => a[0]);

//         if (user) {
//           if (!user?.emailVerified)
//             throw new AuthError({
//               name: "Authentication",
//               message: "User email not verified.",
//             });
//           // Email not verified.
//           else if (typeof credentials.password === "string") {
//             // if (credentials.password === user.password) return user;
//             if (await compare(credentials.password, user.password)) return user;
//             else
//               throw new AuthError({
//                 name: "Authentication",
//                 message: "credentials.password is not true.",
//               });
//           } else
//             throw new AuthError({
//               name: "Authentication",
//               message: "credentials.password is empty.",
//             });
//         } else {
//           if (credentials.email && credentials.name && credentials.password) {
//             const emailVerifiedCode = nanoid();

//             await db
//               .insert(schema.user)
//               .values({
//                 email: credentials.email as string,
//                 name: credentials.name as string,
//                 // password: credentials.password as string,
//                 password: await hash(
//                   credentials.password as string,
//                   saltRounds,
//                 ),
//                 emailVerifiedCode,
//               })
//               .execute();

//             const newUser = await db
//               .select()
//               .from(schema.user)
//               .where(eq(schema.user.email, credentials.email as string))
//               .limit(1)
//               .then((a) => a[0]);

//             await sendEmailVerifyEmailAddress(
//               credentials.name as string,
//               credentials.email as string,
//               emailVerifiedCode,
//             );

//             // const response = await fetch(
//             //   "https://mandrillapp.com/api/1.0/messages/send",
//             //   {
//             //     body: JSON.stringify({
//             //       key: process.env.MAILCHIMP_API_KEY,
//             //       message: {
//             //         from_email: "no_reply@ustagil.org",
//             //         subject: "Confirm Registration to Ustagil",
//             //         text: `${baseUrl}/auth/verify-email?code=${emailVerifiedCode}&email=${
//             //           credentials.email as string
//             //         }`,
//             //         to: [{ email: credentials.email, type: "to" }],
//             //       },
//             //     }),
//             //     headers: {
//             //       "Content-Type": "application/json",
//             //     },
//             //     method: "POST",
//             //   },
//             // );

//             // if (!response.ok) {
//             //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//             //   const errors = await response.json();
//             //   throw new AuthError({
//             //     name: "Email",
//             //     message: "Something bad happend." + JSON.stringify(errors),
//             //   });
//             // }

//             return newUser ?? null;
//           } else
//             throw new AuthError({
//               name: "Credentials",
//               message: "Invalid credentials.",
//             }); // Could not found user with email. Should register but not found name value. Probably trying to register with login page.
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     session: ({ session, token }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: token.sub!,
//         ti: token.ti as string,
//         tn: token.tn as string,
//         role: token.role as string,
//         email: token.email,
//         image: token.picture,
//         name: token.name,
//       },
//     }),
//     jwt: ({ token, profile, account, user, trigger, session }) => {
//       switch (trigger) {
//         case "signIn":
//           if (user) {
//             token.sub = user.id;
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
//             token.role = (user as any).role as string;
//             token.email = user.email;
//             token.name = user.name;
//             token.picture = user.image;
//           }
//           if (profile) {
//             token.image = profile.image;
//           }
//           if (account) {
//             /* empty */
//           }
//           break;
//         case "signUp":
//           if (user) {
//             token.sub = user.id;
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
//             token.role = (user as any).role as string;
//             token.email = user.email;
//             token.name = user.name;
//             token.picture = user.image;
//           }
//           if (profile) {
//             token.image = profile.image;
//           }
//           if (account) {
//             /* empty */
//           }
//           break;
//         case "update":
//           if (session) {
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//             token.ti = session?.user.ti;
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//             token.tn = session?.user.tn;
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//             token.role = session?.user.role;
//           }
//           break;
//         default:
//           break;
//       }
//       return token;
//     },
//     authorized: ({ auth, request }) => {
//       if (request.nextUrl.pathname.startsWith("/auth"))
//         if (request.nextUrl.pathname === "/auth/login") return true;
//         else if (request.nextUrl.pathname === "/auth/select-tenant")
//           return true;
//         else if (request.nextUrl.pathname === "/auth/register") return true;
//         else return !!auth?.user.id && !!auth?.user.email && !!auth?.user.role;
//       return (
//         !!auth?.user?.id &&
//         !!auth?.user.email &&
//         !!auth?.user.role &&
//         !!auth?.user.ti &&
//         !!auth?.user.tn
//       );
//     },
//   },
// } satisfies NextAuthConfig;

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
//   update,
// } = NextAuth(authOptions);

// //#region Old codes for later usage

// // Credentials({
// //   id: "credentials-register",
// //   name: "Credentials Register",
// //   credentials: {
// //     email: {
// //       label: "Email",
// //       type: "text",
// //       placeholder: "jsmith@example.com",
// //     },
// //     name: {
// //       label: "Name",
// //       type: "text",
// //       placeholder: "J Smith",
// //     },
// //     password: { label: "Password", type: "password" },
// //   },
// //   async authorize(credentials, _req) {
// //     if (!credentials) throw new Error("No credentials");

// //     const user = await db
// //       .select()
// //       .from(schema.user)
// //       .where(eq(schema.user.email, credentials.email as string))
// //       .limit(1)
// //       .then((a) => a[0]);

// //     if (user) throw new Error("Already exists");
// //     else {
// //       await db
// //         .insert(schema.user)
// //         .values({
// //           email: credentials.email as string,
// //           name: credentials.name as string,
// //         })
// //         .execute();

// //       const newUser = await db
// //         .select()
// //         .from(schema.user)
// //         .where(eq(schema.user.email, credentials.email as string))
// //         .limit(1)
// //         .then((a) => a[0]);

// //       return newUser ?? null;
// //     }
// //   },
// // }),

// // signIn({ account, user, credentials, email, profile }) {
// //   return "";
// // },
// // authorized({ request: _, auth }) {
// //   return !!auth?.user;
// // },

// // if (typeof window === "undefined") {
// //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// //   const {
// //     createTransport,
// //     getTestMessageUrl,
// //     // eslint-disable-next-line @typescript-eslint/no-var-requires
// //   } = require("nodemailer");

// //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
// //   const transporter = createTransport({
// //     host: "smtp.ethereal.email",
// //     port: 587,
// //     auth: {
// //       user: "clotilde.weissnat@ethereal.email",
// //       pass: "GJ2BZFrt8zG3YQd9JD",
// //     },
// //   });

// //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
// //   const info = await transporter.sendMail({
// //     from: '"Clotilde Weissnat" <clotilde.weissnat@ethereal.email>', // sender address
// //     to: credentials.email, // list of receivers
// //     subject: "Verify Your Email", // Subject line
// //     html: `<a href='http://localhost:3000/auth/verify-email?token=${
// //       newUser!.id
// //     }'>Verify email</a>`, // html body
// //   });

// //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
// //   console.log(getTestMessageUrl(info));
// // }

// // await sendMail({
// //   to: credentials.email,
// //   userId: newUser!.id,
// // });
// // const newUser = await db
// //   .select()
// //   .from(schema.user)
// //   .where(eq(schema.user.email, credentials.email))
// //   .then((a) => a[0]);
// // return newUser ?? null;

// // const domain = process.env.NODE_ENV === "production" ? process.env.DOMAIN : undefined;
// // const cookiePrefix = "__Secure";
// // const useSecureCookies = process.env.NODE_ENV === "production";

// // cookies: {
// //   sessionToken: {
// //     name:
// //       process.env.NODE_ENV === "production"
// //         ? `__Secure-next-auth.session-token`
// //         : `next-auth.session-token`,
// //     options: {
// //       httpOnly: true,
// //       sameSite: "lax",
// //       path: "/",
// //       secure: true,
// //       domain,
// //     },
// //   },
// //   callbackUrl: {
// //     name:
// //       process.env.NODE_ENV === "production"
// //         ? `__Secure-next-auth.callback-url`
// //         : `next-auth.callback-url`,
// //     options: {
// //       sameSite: "lax",
// //       path: "/",
// //       secure: true,
// //       // domain,
// //     },
// //   },
// //   csrfToken: {
// //     name:
// //       process.env.NODE_ENV === "production"
// //         ? `__Host-next-auth.csrf-token`
// //         : `next-auth.csrf-token`,
// //     options: {
// //       httpOnly: true,
// //       sameSite: "lax",
// //       path: "/",
// //       secure: true,
// //       // domain,
// //     },
// //   },
// //   pkceCodeVerifier: {
// //     name:
// //       process.env.NODE_ENV === "production"
// //         ? `${cookiePrefix}next-auth.pkce.code_verifier`
// //         : `next-auth.pkce.code_verifier`,
// //     options: {
// //       httpOnly: true,
// //       sameSite: "lax",
// //       path: "/",
// //       secure: useSecureCookies,
// //       maxAge: 900,
// //       // domain,
// //     },
// //   },
// //   state: {
// //     name:
// //       process.env.NODE_ENV === "production"
// //         ? `${cookiePrefix}next-auth.state`
// //         : `next-auth.state`,
// //     options: {
// //       httpOnly: true,
// //       sameSite: "lax",
// //       path: "/",
// //       secure: useSecureCookies,
// //       maxAge: 900,
// //       // domain,
// //     },
// //   },
// //   nonce: {
// //     name:
// //       process.env.NODE_ENV === "production"
// //         ? `${cookiePrefix}next-auth.nonce`
// //         : `next-auth.nonce`,
// //     options: {
// //       httpOnly: true,
// //       sameSite: "lax",
// //       path: "/",
// //       secure: useSecureCookies,
// //       // domain,
// //     },
// //   },
// // },

// // pages: {
// //   signIn: "/auth/login-test",
// //   signOut: "/auth/logout",
// //   newUser: "/auth/register",
// //   error: "/auth/error",
// //   verifyRequest: "/auth/verifyRequest",
// // },

// //#endregion
