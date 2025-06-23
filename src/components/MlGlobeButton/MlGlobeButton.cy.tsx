import React from 'react';
import { mount } from '@cypress/react';
import { expect } from 'chai';
import { composeStories } from '@storybook/testing-react';
import * as stories from './MlGlobeButton.stories';

const { CatalogueDemo }: any = composeStories(stories);

describe('MlGlobeButton', () => {
	beforeEach(() => {
		// Reset window._map so that each test gets a new, clean map context
		cy.window().then((win) => {
			delete (win as any)._map;
			// Remove icon elements that might persist between tests
			const mapIcon = win.document.querySelector('[data-testid="MapIcon"]');
			if (mapIcon) mapIcon.remove();
			const publicIcon = win.document.querySelector('[data-testid="PublicIcon"]');
			if (publicIcon) publicIcon.remove();
		});
	});

	it('shows MapIcon as start state and toggles between MapIcon and PublicIcon', () => {
		mount(<CatalogueDemo />);
		cy.window().should((win) => expect((win as any)._map).to.exist);

		cy.get('[data-testid="MapIcon"]').should('exist');
		cy.get('[data-testid="PublicIcon"]').should('not.exist');
		cy.get('button').click();
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('[data-testid="MapIcon"]').should('not.exist');
		cy.get('button').click();
		cy.get('[data-testid="MapIcon"]').should('exist');
		cy.get('[data-testid="PublicIcon"]').should('not.exist');
	});

	it('changes the projection on the map instance attached to window', () => {
		mount(<CatalogueDemo />);
		cy.window().should((win) => expect((win as any)._map).to.exist);

		cy.window().should((win) => {
			const map = (win as any)._map;
			expect(map.getProjection()).to.be.undefined;
		});

		cy.get('button').click();
		cy.window().should((win) => {
			const map = (win as any)._map;
			expect(map.getProjection().type).to.eq('globe');
		});

		cy.get('button').click();
		cy.window().should((win) => {
			const map = (win as any)._map;
			expect(map.getProjection().type).to.eq('mercator');
		});
	});
});
