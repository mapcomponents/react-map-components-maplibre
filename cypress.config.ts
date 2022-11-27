import { defineConfig } from 'cypress';
import * as path from 'path';

const isRunningInCI = process.env.CI === 'true';

export default defineConfig({
	component: {
		//supportFile: './cypress/support/component.js',
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig: {
				mode: 'development',
				resolve: {
					extensions: ['.mjs', '.js', '.jsx', '.json', '.cjs', '.ts', '.tsx'],
				},

				module: {
					rules: [
						{
							test: /\.(js|jsx|tsx|ts)$/, // USE THE babel-loader FOR THESE FILE EXTENSIONS
							use: [
								{
									loader: 'babel-loader',
									options: {
										sourceType: 'unambiguous',
										presets: [
											['@babel/preset-env', { shippedProposals: true, loose: true }],
											'@babel/preset-typescript',
											'@babel/preset-react',
										],
										plugins: [
											'@babel/plugin-transform-shorthand-properties',
											'@babel/plugin-transform-block-scoping',
											['@babel/plugin-proposal-decorators', { legacy: true }],
											['@babel/plugin-proposal-class-properties', { loose: true }],
											['@babel/plugin-proposal-private-methods', { loose: true }],
											'@babel/plugin-proposal-export-default-from',
											'@babel/plugin-syntax-dynamic-import',
											[
												'@babel/plugin-proposal-object-rest-spread',
												{ loose: true, useBuiltIns: true },
											],
											'@babel/plugin-transform-classes',
											'@babel/plugin-transform-arrow-functions',
											'@babel/plugin-transform-parameters',
											'@babel/plugin-transform-destructuring',
											'@babel/plugin-transform-spread',
											'@babel/plugin-transform-for-of',
											'@storybook/core-common/node_modules/babel-plugin-macros',
											'@babel/plugin-proposal-optional-chaining',
											'@babel/plugin-proposal-nullish-coalescing-operator',
											[
												'babel-plugin-polyfill-corejs3',
												{
													method: 'usage-global',
													absoluteImports: 'core-js',
													version: '3.21.1',
												},
											],
											'@babel/plugin-transform-template-literals',
										],
										babelrc: true,
										configFile: false,
									},
								},
							],
							exclude: [ /node_modules/, /dist/ ]
						},
						/*{
							test: /\.(ts|tsx)$/,
							exclude: [/node_modules/],
							use: {
								loader: require.resolve('babel-loader'),
								options: {
									plugins: [],
									presets: ['@babel/preset-typescript'],
									babelrc: false,
								},
							},
						},*/
						{
							test: /\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
							loader: 'file-loader',
							options: { name: 'static/media/[path][name].[ext]' },
						},
						{
							test: /\.css$/,
							use: [
								'style-loader',
								{
									loader: 'css-loader',
									options: { importLoaders: 1 },
								},
							],
						},
					],
				},
			},
		},
	},
});
