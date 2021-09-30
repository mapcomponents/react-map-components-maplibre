import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";

import css from "rollup-plugin-import-css";
import del from "rollup-plugin-delete";
import pkg from "./package.json";

const config = {
  input: pkg.source,
  output: [{ file: pkg.module, format: "esm", sourcemap: true }],
  plugins: [
    external(),
    css(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    del({ targets: ["dist/*"] }),
  ],
  external: ["prop-types", "d3", ...Object.keys(pkg.peerDependencies || {})],
};
export default config;
