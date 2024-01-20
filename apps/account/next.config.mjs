// Importing env files here to validate on build
import "@acme/env";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  modularizeImports: {
    "@acme/ui/atoms": {
      transform: "@acme/ui/atoms/{{ kebabCase member }}",
      skipDefaultConversion: true,
      // preventFullImport: true,
    },
    "@acme/ui/molecules": {
      transform: "@acme/ui/molecules/{{ kebabCase member }}",
      skipDefaultConversion: true,
      // preventFullImport: true,
    },
    "@acme/ui/organisms": {
      transform: "@acme/ui/organisms/{{ kebabCase member }}",
      skipDefaultConversion: true,
      // preventFullImport: true,
    },
    "@acme/ui/organisms/landing": {
      transform: "@acme/ui/organisms/landing/{{ kebabCase member }}",
      skipDefaultConversion: true,
      // preventFullImport: true,
    },
    "@acme/ui/templates": {
      transform: "@acme/ui/templates/{{ kebabCase member }}",
      skipDefaultConversion: true,
      // preventFullImport: true,
    },
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@acme/util",
    "@acme/api-client",
    "@acme/api",
    "@acme/auth",
    "@acme/db",
    "@acme/env",
    "@acme/ui",
  ],
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "tailwindui.com",
      },
      {
        hostname: "i0.wp.com",
      },
      {
        hostname: "cloudflare-ipfs.com",
      },
    ],
  },
};

export default config;
