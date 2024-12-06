import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react18';
import * as stories from './MlCreatePdfForm.stories';

const { ExampleConfig }: any = composeStories(stories);

if (!Cypress.env('CI')) {
	describe('MlCreatePdfForm Tests', () => {
		it('Should generate and download a PDF export of the current map preview', () => {
			mount(<ExampleConfig />);
			cy.get('.pdfFormButton').click();

			cy.wait(2000);
			cy.readFile('./cypress/downloads/Map.pdf').should('contain', 'WhereGroup');
		});
	});
} else {
	Cypress.log({ message: 'Skipping MlCreatePdfForm tests in CI environment' });
}
