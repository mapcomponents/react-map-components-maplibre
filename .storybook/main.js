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
        name: "@storybook/react-webpack5",
        options: {}
    },

    webpackFinal: async (config, { configType }) => {
		// split into more chunks
		config.optimization = {
			splitChunks: {
				chunks: 'all',
				minSize: 30 * 1024, // 30KB
				maxSize: 1024 * 1024, // 1MB
			},
		};

		config.externals = { fs: 'fs' };

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
        autodocs: true
    },
	staticDirs: [
		'../public',
	],
	features: {
    buildStoriesJson: true,
  }
};
