import React from 'react';
import { mount } from '@cypress/react';
import MlGlobeButton from './MlGlobeButton';

// Export mock to access it in the test
export const setProjectionMock = jest.fn();

// Mock for useMap Hook
jest.mock('../../src/hooks/useMap', () => {
	return () => ({
		map: {
			map: {
				getProjection: () => ({ type: 'mercator' }),
				setProjection: setProjectionMock,
			},
		},
	});
});

describe('MlGlobeButton', () => {
	beforeEach(() => {
		setProjectionMock.mockClear();
	});

	it('shows the MapIcon when projection is mercator', () => {
		mount(<MlGlobeButton />);
		cy.get('button').find('svg[data-testid="MapIcon"]').should('exist');
		cy.get('button').find('svg[data-testid="PublicIcon"]').should('not.exist');
	});

	it('calls setProjection on click and displays the PublicIcon (Globe)', () => {
		mount(<MlGlobeButton />);
		cy.get('button').click();

		// Check whether setProjection has been called
		expect(setProjectionMock).toHaveBeenCalled();

		// Check whether the globe icon is displayed
		cy.get('button').find('svg[data-testid="PublicIcon"]').should('exist');
		cy.get('button').find('svg[data-testid="MapIcon"]').should('not.exist');
	});
});
