import { defineConfig } from 'cypress';

//const isRunningInCI = process.env.CI === 'true';

export default defineConfig({
	component: {
		defaultCommandTimeout: 10000,
		viewportWidth: 800,
		viewportHeight: 600,
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
										babelrc: true,
										configFile: false,
									},
								},
							],
							exclude: [/node_modules/, /dist/],
						},
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
