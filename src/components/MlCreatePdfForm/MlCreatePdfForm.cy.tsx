import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from "./MlCreatePdfForm.stories";

// compile the "Primary" story with the library
const {ExampleConfig } = composeStories(stories);

describe('MlCreatePdfForm Tests', () => {
	it('Should generate and download a PDF export of the current map preview', () => {
		// and mount the story using @cypress/react library
		mount(<ExampleConfig />);

    cy.get(".pdfFormButton").click();
 
		cy.wait(1000)
    cy.get(".createPdfButton").click();
		cy.wait(5000)
    cy.readFile("./cypress/downloads/Map.pdf").should('contain', 'WhereGroup')
	});
});
