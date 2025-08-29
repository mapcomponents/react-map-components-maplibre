import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react18';
import * as stories from './MapLibreMap.stories';

const { ExampleConfig, AddMaplibreInstance }: any = composeStories(stories);

describe('MlTerrainLayer Tests', () => {
	it('Should display Maplibre map with OSM Bright style', () => {
		mount(<ExampleConfig />);

		// Wait for the map to be initialized and verify that the terrain layer is added to the map
		cy.window()
			.should((win) => {
				expect((win as any)._map).to.exist;
			})
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_mapInstance: any) => {
					// Check for style name
					expect(_mapInstance?.getStyle().name).to.equal('OSM Bright');
					// Check for specific layer existence
					expect(
						_mapInstance
							?.getStyle()
							.layers.find((layer: { id: string }) => layer.id === 'landcover-glacier')
					).to.exist;
				});
			});
	});
});

describe('AddMaplibreInstance Tests', () => {
	beforeEach(() => {
		mount(<AddMaplibreInstance />);
	});

	it('Map should be added by clicking button "Add Map"', () => {
		// Initially, the map should not exist
		cy.get('[data-testid="map"]').should('not.exist');

		// Click the "Add Map" button
		cy.contains('button', 'Add Map').click();

		// Verify that the map element now exists in the DOM
		cy.get('[data-testid="map"]').should('exist');

		// Verify that the map instance exists in the window object
		cy.window().should((win) => {
			expect((win as any)._map).to.exist;
		});
	});

	it('Map should be removed by clicking button "Remove Map"', () => {
		// Add the map first
		cy.contains('button', 'Add Map').click();
		cy.get('[data-testid="map"]').should('exist');

		// Click the "Remove Map" button
		cy.contains('button', 'Remove Map').click();

		cy.get('[data-testid="map"]').should('not.exist');
		cy.window().should((win) => {
			expect((win as any)._map.getStyle()).to.be.undefined;
		});
	});
});
