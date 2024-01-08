/** @type {import('next').NextConfig} */
const nextConfig = {
  // modularizeImports: {
  //   "@acme/ui/atoms": {
  //     transform: "@acme/ui/atoms/{{ kebabCase member }}",
  //     skipDefaultConversion: true,
  //     // preventFullImport: true,
  //   },
  //   "@acme/ui/molecules": {
  //     transform: "@acme/ui/molecules/{{ kebabCase member }}",
  //     skipDefaultConversion: true,
  //     // preventFullImport: true,
  //   },
  //   "@acme/ui/organisms": {
  //     transform: "@acme/ui/organisms/{{ kebabCase member }}",
  //     skipDefaultConversion: true,
  //     // preventFullImport: true,
  //   },
  //   "@acme/ui/organisms/landing": {
  //     transform: "@acme/ui/organisms/landing/{{ kebabCase member }}",
  //     skipDefaultConversion: true,
  //     // preventFullImport: true,
  //   },
  // },
  // /** Enables hot reloading for local packages without a build step */
  // transpilePackages: ["@acme/api", "@acme/auth", "@acme/db", "@acme/ui"],
  // /** We already do linting and typechecking as separate tasks in CI */
  // eslint: { ignoreDuringBuilds: true },
  // typescript: { ignoreBuildErrors: true },
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

module.exports = nextConfig;
