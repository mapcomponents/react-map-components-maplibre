import type { StorybookConfig } from '@storybook/react-vite';


const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: ["@storybook/addon-docs"],
	framework: {
		name: "@storybook/react-vite",
		options: {
			builder: {
				viteConfigPath: 'vite.config.ts',
			},
		},
	},
	staticDirs: ['../public'],

	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			tsconfigPath: "./tsconfig.lib.json",
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
		},
	},

};

export default config;
