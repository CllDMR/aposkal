const { defineConfig } = require("tsup");
const path = require("path");

const commonConfig = {
  clean: true,
  splitting: true,
  // Skip until .d.ts.map is also supported https://github.com/egoist/tsup/issues/564
  dts: true,
  sourcemap: true,
  tsconfig: path.resolve(__dirname, "./tsconfig.json"),
  outDir: "dist",
  format: ["esm", "cjs"],
};
export default defineConfig((options) => [
  // actual exposed modules = 1 per component
  {
    entry: [
      "./src/atoms/!(index).ts?(x)",
      "./src/molecules/!(index).ts?(x)",
      "./src/organisms/!(index).ts?(x)",
    ],
    // minify: !options.watch,
    ...commonConfig,
    // For debugging, will output ESbuild metafile
    // metafile: true,
    esbuildOptions(options, context) {
      // the directory structure will be the same as the source
      options.outbase = "./";
    },
  },
  // index files to allow named imports
  // inspired by react-bootstrap structure
  {
    entry: [
      "index.ts",

      "./src/atoms/index.ts",
      "./src/molecules/index.ts",
      "./src/organisms/index.ts",
    ],
    // minify: !options.watch,
    ...commonConfig,
    esbuildOptions(options, context) {
      // the directory structure will be the same as the source
      options.outbase = "./";
    },
    // index files must NOT be bundled!
    // it acts as a map towards bundled components
    // but never rebundles them
    bundle: false,
  },
  /*
  There is no server/client specific code in this package yet,
  every component is isomorphic (work on client and server)
  {
    entry: ["server/index.ts"],
    ...commonConfig,
    format: ["cjs"],
    outDir: "dist/server",
  },
  {
    entry: ["client/index.ts"],
    ...commonConfig,
    format: ["esm", "iife"],
    outDir: "dist/client",
  },*/
]);
