export { auth as middleware } from "@acme/auth";
// import { auth } from "@acme/auth";

// export default auth(() => {
//   console.log({
//     authMiddleware: true,
//   });

//   return false;
//   // return {
//   //   pages: {
//   //     signIn: "/auth/login",
//   //     signOut: "/auth/logout",
//   //     newUser: "/auth/register",
//   //     verifyRequest: "/auth/verify-email",
//   //     error: "/auth/error",
//   //   },
//   // };
// });

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
