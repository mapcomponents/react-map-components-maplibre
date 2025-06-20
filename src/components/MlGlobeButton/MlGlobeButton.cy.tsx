import React from 'react';
import { mount } from '@cypress/react';
import { expect } from 'chai';
import { composeStories } from '@storybook/testing-react';
import * as stories from './MlGlobeButton.stories';

const { CatalogueDemo }: any = composeStories(stories);

describe('MlGlobeButton', () => {
	
		it('shows MapIcon as start state and changes to PublicIcon after click', () => {
		mount(<CatalogueDemo/>)
		cy.window()
			.should((win) => expect((win as any)._map).to.exist)
			.then(() => {
				cy.get('[data-testid="MapIcon"]').should('exist');
				cy.get('[data-testid="PublicIcon"]').should('not.exist');
				cy.get('button').click();
				cy.get('[data-testid="PublicIcon"]').should('exist');
				cy.get('[data-testid="MapIcon"]').should('not.exist');
			})
	});

	// it('toggles between Globe and Mercator when clicked again', () => {
	// 	mountWithTheme(<MlGlobeButton />);
	// 	cy.get('button').click(); // Switches to Globe (PublicIcon)
	// 	cy.get('[data-testid="PublicIcon"]').should('exist');
	// 	cy.get('button').click(); // Switches back to Mercator (MapIcon)
	// 	cy.get('[data-testid="MapIcon"]').should('exist');
	// });

	// it('changes the projection on the map instance attached to window', () => {
	// 	mountWithTheme(<MlGlobeButton />);
	// 	cy.get('button').click();
	// 	cy.window().then((win) => {
	// 		const map = (win as any)._map;
	// 		expect(map.getProjection().type).to.eq('globe');
	// 	});
	// 	cy.get('button').click();
	// 	cy.window().then((win) => {
	// 		const map = (win as any)._map;
	// 		expect(map.getProjection().type).to.eq('mercator');
	// 	});
	// });
});
