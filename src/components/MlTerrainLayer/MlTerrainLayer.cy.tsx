import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react18';
import * as stories from './MlTerrainLayer.stories';

const { ExampleConfig }: any = composeStories(stories);

describe('MlTerrainLayer Tests', () => {
	it('Should create terrain source, have hills layer, and set terrain property to null when Terrain Layer is not present', () => {
		mount(<ExampleConfig />);

		// Wait for the map to be initialized and verify, that the terrain layer is added to the map
		cy.window()
			.should((win) => {
				expect((win as any)._map).to.exist;
			})
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_map: any) => {
					expect(_map?.style?.sourceCaches?.terrain).to.not.be.undefined;
					expect(_map?.style?._layers?.hills).to.not.be.undefined;
				});
			});

		// Trigger the click event to turn the terrain layer off
		cy.get('.terrainLayerButton').click();

		// Dynamically wait for the map to update and verify terrain removal
		cy.window()
			.should((win) => {
				expect((win as any)._map).to.exist;
			})
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_map: any) => {
					expect(_map?.style?.sourceCaches?.terrain).to.be.undefined;
					expect(_map?.style?._layers?.hills).to.be.undefined;
				});
			});
	});
});
