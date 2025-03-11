module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

	addons: [
		'storybook-source-link',
		//'@storybook/addon-storysource',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
	],

	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},

	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('babel-loader'),
					options: {
						presets: [require.resolve('@babel/preset-typescript')],
					},
				},
			],
		});
		config.resolve.extensions.push('.ts', '.tsx');
		return config;
	},

	typescript: {
		check: false,
		checkOptions: {},
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},

	docs: {
		autodocs: true,
	},
	staticDirs: [
		'../public',
	],
	features: {
		buildStoriesJson: true,
	},
};
