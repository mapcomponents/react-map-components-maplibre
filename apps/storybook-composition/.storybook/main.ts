import type { StorybookConfig } from '@storybook/react-vite';


const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	framework: {
		name: "@storybook/react-vite",
		options: {
			builder: {
				viteConfigPath: 'vite.config.ts',
			},
		},
	},
	staticDirs: ['../public'],

};

export default config;
