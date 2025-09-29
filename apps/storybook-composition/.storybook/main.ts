import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/react-vite';


function getAbsolutePath(value: string): string {
	return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
	stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
	addons: [],
	framework: {
		name: getAbsolutePath('@storybook/react-vite'),
		options: {
			builder: {
				viteConfigPath: 'vite.config.ts',
			},
		},
	},
	staticDirs: ['../public'],
	refs: (config, { configType }) => {
		if (configType === 'DEVELOPMENT') {
			return {
				'react-maplibre': {
					title: 'React MapLibreMap',
					url: 'http://localhost:4400',
				},
				'deck-gl': {
					title: 'Deck.gl',
					url: 'http://localhost:4401',
				},
				'ra-geospatial': {
					title: 'Ra Geospatial',
					url: 'http://localhost:4402',
				},
			};
		}
		return {
			'react-maplibre': {
				title: 'React MapLibreMap',
				url: 'https://mapcomponents.github.io/react-map-components-maplibre/react-maplibre/',
			},
			'deck-gl': {
				title: 'Deck.gl',
				url: 'https://mapcomponents.github.io/react-map-components-maplibre/deck-gl/',
			},
			'ra-geospatial': {
				title: 'React Admin Geospatial',
				url: 'https://mapcomponents.github.io/react-map-components-maplibre/ra-geospatial/',
			},
		};
	},
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
