import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './MlTerrainLayer.stories';

// compile the "Primary" story with the library
const { ExampleConfig }: any = composeStories(stories);

describe('MlTerrainLayer Tests', () => {
	it('Should ...', () => {
		// and mount the story using @cypress/react library
		mount(<ExampleConfig />);
		cy.get('.terrainLayerButton').click();
		cy.wait(5000);
		cy.get('.terrainLayerButton').click();
		cy.wait(5000);
	});
});
