import babel from "@rollup/plugin-babel";
import url from "@rollup/plugin-url";
import external from "rollup-plugin-peer-deps-external";

import css from "rollup-plugin-import-css";
import del from "rollup-plugin-delete";
import svgr from '@svgr/rollup';
import pkg from "./package.json";

const config = {
  input: pkg.source,
  output: [{ file: pkg.module, format: "esm", sourcemap: true }],
  plugins: [
    svgr({
      svgo: false,
    }),
    url(),
    external(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    css(),
    del({ targets: ["dist/*"] }),
  ],
  external: [
    "prop-types",
    "d3",
    "@emotion/react",
    "@emotion/styled",
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};
export default config;
