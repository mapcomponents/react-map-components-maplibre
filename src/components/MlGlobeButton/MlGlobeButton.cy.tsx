import React from 'react';
import { mount } from '@cypress/react';
import MlGlobeButton from './MlGlobeButton';
import { expect } from 'chai';

// Attach a map instance to the window before each test
beforeEach(() => {
	// Dummy map with Projection API
	(window as any)._map = {
		_type: 'mercator',
		getProjection() {
			return { type: this._type };
		},
		setProjection({ type }: { type: string }) {
			this._type = type;
		},
	};
});

describe('MlGlobeButton', () => {
	it('shows MapIcon as start state and changes to PublicIcon after click', () => {
		mount(<MlGlobeButton />);
		cy.get('[data-testid="MapIcon"]').should('exist');
		cy.get('[data-testid="PublicIcon"]').should('not.exist');
		cy.get('button').click();
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('[data-testid="MapIcon"]').should('not.exist');
	});

	it('toggles between Globe and Mercator when clicked again', () => {
		mount(<MlGlobeButton />);
		cy.get('button').click(); // Switches to Globe (PublicIcon)
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('button').click(); // Switches back to Mercator (MapIcon)
		cy.get('[data-testid="MapIcon"]').should('exist');
	});

	it('changes the projection on the map instance attached to window', () => {
		mount(<MlGlobeButton />);
		cy.get('button').click();
		cy.window().then((win) => {
			const map = (win as any)._map;
			expect(map.getProjection().type).to.eq('globe');
		});
		cy.get('button').click();
		cy.window().then((win) => {
			const map = (win as any)._map;
			expect(map.getProjection().type).to.eq('mercator');
		});
	});
});