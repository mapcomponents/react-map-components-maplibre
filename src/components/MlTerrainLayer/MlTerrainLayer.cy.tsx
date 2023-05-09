import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './MlTerrainLayer.stories';

// compile the "Primary" story with the library
const { ExampleConfig } = composeStories(stories);

describe('MlTerrainLayer Tests', () => {
	it('Should ...', () => {
		// and mount the story using @cypress/react library
		mount(<ExampleConfig />);
		cy.request('https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_col.json');
	});
});
