import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './MlTerrainLayer.stories';

// compile the "Primary" story with the library
const { ExampleConfig }: any = composeStories(stories);

describe('MlTerrainLayer Tests', () => {
	it('Should create terrain source, have hills layer, and set terrain property to null when Terrain Layer is not present', () => {
		// Mount the story using @cypress/react library
		mount(<ExampleConfig />);

		// Wait for the map to be initialized and verify the terrain properties
		cy.window()
			.should('have.property', '_map')
			.then((win) => {
				const { _map }: any = win;
				expect(_map?.style?.sourceCaches?.terrain).to.not.be.undefined;
				expect(_map?.style?._layers?.hills).to.not.be.undefined;
				expect(_map?.style?.terrain).to.not.be.null;
			});

		// Trigger the click event to toggle the Terrain Layer
		cy.get('.terrainLayerButton').click();

		// Wait for the map to update and verify the terrain properties again
		cy.window()
			.should('have.property', '_map')
			.then((win) => {
				const { _map }: any = win;
				expect(_map?.style?.sourceCaches?.terrain).to.be.undefined;
				expect(_map?.style?._layers?.hills).to.be.undefined;
				expect(_map?.style?.terrain).to.be.null;
			});
	});
});
