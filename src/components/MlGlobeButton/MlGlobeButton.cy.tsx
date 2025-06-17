import React from 'react';
import { mount } from '@cypress/react';
import MlGlobeButton from './MlGlobeButton';
import { expect } from 'chai';

// Mock implementation for useMap using window
const mockMap = {
	getProjection: () => ({ type: 'mercator' }),
	setProjection: function ({ type }: { type: string }) {
		this._type = type;
		this.getProjection = () => ({ type });
	},
	_type: 'mercator',
};

const useMapMock = () => ({ map: (window as any)._testMap });

beforeEach(() => {
	// Attach a fresh mock map to window for each test
	(window as any)._testMap = { ...mockMap };
	// Stub (replace) the useMap import in the tested component
	cy.stub(require('../../hooks/useMap'), 'default').callsFake(useMapMock);
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

	it('switches between Globe and Mercator when clicked again', () => {
		mount(<MlGlobeButton />);
		cy.get('button').click(); // Switches to Globe (PublicIcon)
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('button').click(); // Switches back to Mercator (MapIcon)
		cy.get('[data-testid="MapIcon"]').should('exist');
	});

	it('actually changes the projection on the map mock', () => {
		mount(<MlGlobeButton />);
		cy.get('button').click();
		cy.window().then((win) => {
			const map = (win as any)._testMap;
			expect(map.getProjection().type).to.eq('globe');
		});
		cy.get('button').click();
		cy.window().then((win) => {
			const map = (win as any)._testMap;
			expect(map.getProjection().type).to.eq('mercator');
		});
	});
});