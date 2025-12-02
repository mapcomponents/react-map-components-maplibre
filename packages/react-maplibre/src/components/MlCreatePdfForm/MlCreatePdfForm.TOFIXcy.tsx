import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './MlCreatePdfForm.stories';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const { ExampleConfig }: any = composeStories(stories);

describe('MlCreatePdfForm Tests', () => {
	it('Should generate and download a PDF export of the current map preview', function () {
		if (Cypress.env('CI')) {
			cy.log('Skipping test in CI environment');
			this.skip();
		}
		mount(<ExampleConfig />);
		cy.get('.pdfFormButton').click();
		cy.get('#createPdfFormID').should('be.visible');
		cy.get('.createPdfButton').click();

		cy.readFile('./cypress/downloads/Map.pdf', { timeout: 10000 }).should('contain', 'WhereGroup');
	});
});
