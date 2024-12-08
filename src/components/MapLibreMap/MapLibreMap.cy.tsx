import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react18';
import * as stories from './MapLibreMap.stories';

const { ExampleConfig }: any = composeStories(stories);

describe('MlTerrainLayer Tests', () => {
	it('Should display Maplibre map with osm bright style', () => {
		mount(<ExampleConfig />);

		// Wait for the map to be initialized and verify, that the terrain layer is added to the map
		cy.window()
			.should((win) => {
				expect((win as any)._map).to.exist;
			})
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_map: any) => {
					// check for style name
					expect(_map?.getStyle().name).to.equal('OSM Bright');
					// check for one layer
					expect(
						_map
							?.getStyle()
							.layers.find((layer: { id: string }) => layer.id === 'landcover-glacier')
					).not.be.undefined;
				});
			});
	});
});
