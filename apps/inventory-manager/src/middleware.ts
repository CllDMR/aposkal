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
