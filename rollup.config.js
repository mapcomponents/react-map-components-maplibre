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
    del({ targets: ["build/*"] }),
  ],
  external: [
    "!maplibre-gl",
    "prop-types",
    "d3",
    "@emotion/react",
    "@emotion/styled",
    "@babel/helpers",
    "jspdf",
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.devDependencies),
  ],
  inlineDynamicImports: true,
  onwarn: function (warning, warn) {
    warn(warning);
  },
};
export default config;
