import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import SpeedDial from './SpeedDial';

// compile the "Primary" story with the library
// const { ExampleConfig }: any = composeStories(stories);

describe('MlCreatePdfForm Tests', () => {
	it('Should open&close CreatePDF, Layers, Sketch and Background Button group', () => {
		// and mount the story using @cypress/react library
		mount(<SpeedDial />);

		cy.get('.MuiSpeedDial').click();
		cy.wait(5000);
		cy.get('.MuiSpeedDial').click();
	});
});
