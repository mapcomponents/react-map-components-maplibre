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

		cy.wait(3000);

		// Access the map instance from the window object
		cy.window().then((win) => {
			const { _map }: any = win;
			expect(_map?.style?.sourceCaches?.terrain).to.not.be.undefined;
			expect(_map?.style?._layers?.hills).to.not.be.undefined;
			expect(_map?.style?.terrain).to.not.be.null;
		});

		// Trigger the click event to toggle the Terrain Layer
		cy.get('.terrainLayerButton').click();
		cy.wait(2000);

		// Access the map instance from the window object
		cy.window().then((win) => {
			const { _map }: any = win;
			expect(_map?.style?.sourceCaches?.terrain).to.be.undefined;
			expect(_map?.style?._layers?.hills).to.be.undefined;
			expect(_map?.style?.terrain).to.be.null;
		});
	});
});
