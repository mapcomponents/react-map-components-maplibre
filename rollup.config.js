import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";

import babel from "@rollup/plugin-babel";
import url from "@rollup/plugin-url";
import external from "rollup-plugin-peer-deps-external";

import css from "rollup-plugin-import-css";
import del from "rollup-plugin-delete";
import svgr from "@svgr/rollup";

import pkg from "./package.json";

const config = {
  input: pkg.source,
  output: [{ file: pkg.module, format: "esm", sourcemap: true }],
  plugins: [
    svgr({
      svgo: false,
    }),
    url(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
    }),
    external(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: "tsconfig.json",
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
  inlineDynamicImports: true,
  onwarn: function (warning, warn) {
    if (
      warning.code === "CIRCULAR_DEPENDENCY" ||
      warning.code === "THIS_IS_UNDEFINED"
    )
      return;
    warn(warning);
  },
};
export default config;
