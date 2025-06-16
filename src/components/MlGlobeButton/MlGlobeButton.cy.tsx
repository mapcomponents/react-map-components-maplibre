import React from 'react';
import { mount } from '@cypress/react';
import MlGlobeButton from './MlGlobeButton';

// Extend Cypress' Chainable interface to include mockUseMap
declare global {
	namespace Cypress {
		interface Chainable {
			mockUseMap(): Chainable<void>;
		}
	}
}

//  Mock implementation for useMap
const mockMap = {
	map: {
		getProjection: () => ({ type: 'mercator' }),
		setProjection: function ({ type }: { type: string }) {
			this._type = type;
			this.getProjection = () => ({ type });
		},
		_type: 'mercator',
	},
};

const useMapMock = () => ({ map: mockMap });

// Overwrites the import of useMap in the component with a mock for test purposes
Cypress.Commands.add('mockUseMap', () => {
	cy.stub(require('../../hooks/useMap'), 'default').callsFake(useMapMock);
});

describe('MlGlobeButton', () => {
	beforeEach(() => {
		cy.mockUseMap();
	});

	it('shows MapIcon as start state and changes to PublicIcon after click', () => {
		mount(<MlGlobeButton />);
		cy.get('[data-testid="MapIcon"]').should('exist');
		cy.get('[data-testid="PublicIcon"]').should('not.exist');
		cy.get('button').click();
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('[data-testid="MapIcon"]').should('not.exist');
	});

	it('switches between Globe and Mercator when clicked again', () => {
		mount(<MlGlobeButton />);
		cy.get('button').click(); // Switches to Globe (PublicIcon)
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('button').click(); // Switches back to Mercator (MapIcon)
		cy.get('[data-testid="MapIcon"]').should('exist');
	});
});
