import { composeStories } from '@storybook/react';
import { mount } from '@cypress/react';
import * as stories from './MapLibreMap.stories';
import { expect } from 'chai';

const { ExampleConfig }: any = composeStories(stories as any);

describe('MlTerrainLayer Tests', () => {
	it('Should display Maplibre map with osm bright style', () => {
		cy.intercept('https://wms.wheregroup.com/tileserver/style/osm-bright.json', {
			statusCode: 200,
			headers: { 'access-control-allow-origin': '*' },
			body: {
				version: 8,
				name: 'OSM Bright',
				sources: {},
				layers: [{ id: 'landcover-glacier', type: 'background' }],
			},
		}).as('osmBrightStyle');

		mount(<ExampleConfig />);
		cy.wait('@osmBrightStyle').its('response.statusCode').should('equal', 200);

		// Wait for the map to be initialized and verify, that the terrain layer is added to the map
		cy.window()
			.should((win) => expect((win as any)._map).to.exist)
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_map: any) => {
					// check for style name
					expect(_map?.getStyle().name).to.equal('OSM Bright');
					// check for one layer
					// eslint-disable-next-line @typescript-eslint/no-unused-expressions
					expect(
						_map
							?.getStyle()
							.layers.find((layer: { id: string }) => layer.id === 'landcover-glacier')
					).not.be.undefined;
				});
			});
	});
});
