import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { defineConfig } from 'rollup';

import babel from '@rollup/plugin-babel';
import url from '@rollup/plugin-url';
import externals from 'rollup-plugin-node-externals';

import css from 'rollup-plugin-import-css';
import del from 'rollup-plugin-delete';
import svgr from '@svgr/rollup';
import * as fs from 'node:fs';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const externalsConfig = {
	deps: true,
	devDeps: true,
	exclude:['react', 'react-dom']
};

const config = defineConfig([
	{
		input: ['src/index.ts'],
		output: [
			{
			file: 'dist/index.cjs.js',
			format: 'cjs',
			sourcemap: true,
			},
			{
			file: 'dist/index.esm.js',
			format: 'es',
			sourcemap: true,
		}
	],
		plugins: [
			svgr({
				svgo: false,
			}),
			url(),
			babel({
				presets: ['@babel/preset-react'],
				babelHelpers: 'bundled'
			}),
			externals(externalsConfig),
			commonjs(),
			typescript({ declarationDir: 'dist/types', sourceMap: true
			,exclude: ["**/*.cy.tsx", "**/*.stories.tsx", "**/*.test.tsx"] }),
			css(),
			del({ targets: ['dist/*'] }),
		],
		external: [
			'react',
			'react-dom',
			'd3',
			'sql.js',
			...Object.keys(pkg.dependencies),
			...Object.keys(pkg.devDependencies),
		],
	},
]);
export default config;
