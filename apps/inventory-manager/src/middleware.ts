// import { auth } from "@acme/auth";

// import { getBaseAuthUrl, getBaseUrl } from "./utils/get-base-url";

// const baseUrl = getBaseUrl();
// const encodedBaseUrlQuery = `?callbackUrl=${encodeURIComponent(baseUrl)}`;
// const baseAuthUrl = getBaseAuthUrl();

// const toAuthURL = (path: string) =>
//   `${baseAuthUrl}${path}${encodedBaseUrlQuery}`;

// export default auth(() => ({
//   pages: {
//     signIn: toAuthURL("/auth/login"),
//     signOut: toAuthURL("/auth/logout"),
//     newUser: toAuthURL("/auth/register"),
//     verifyRequest: toAuthURL("/auth/verify-email"),
//   },
// }));

export { auth as middleware } from "@acme/auth";

export const config = {
  matcher: [
    "/dashboard",
    "/product-categories",
    "/product-categories/(.*)",
    "/product-tags",
    "/product-tags/(.*)",
    "/products",
    "/products/(.*)",
    "/suppliers",
    "/suppliers/(.*)",
    "/warehouses",
    "/warehouses/(.*)",
    "/settings",
    "/settings/(.*)",
  ],
};
