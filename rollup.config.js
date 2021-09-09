import babel from "@rollup/plugin-babel";
import external from "rollup-plugin-peer-deps-external";

import del from "rollup-plugin-delete";
import pkg from "./package.json";

export default {
  input: pkg.source,
  output: [{ file: pkg.module, format: "esm", sourcemap: true }],
  plugins: [
    external(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    del({ targets: ["dist/*"] }),
  ],
  external: ["prop-types", "d3", ...Object.keys(pkg.peerDependencies || {})],
};
