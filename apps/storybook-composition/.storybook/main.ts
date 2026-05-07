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
				'three': {
					title: 'Three',
					url: 'http://localhost:4403',
				},
			};
		}
		return {
			'react-maplibre': {
				title: 'React MapLibreMap',
				url: 'https://mapcomponents.github.io/react-map-components-maplibre/react-maplibre/',
			},
			'three': {
				title: 'three',
				url: 'https://mapcomponents.github.io/react-map-components-maplibre/three/',
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
