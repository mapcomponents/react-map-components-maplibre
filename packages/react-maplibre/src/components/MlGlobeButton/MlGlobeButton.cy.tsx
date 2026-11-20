import { mount } from '@cypress/react';
import { expect } from 'chai';
import { composeStories } from '@storybook/react';
import type { Map } from 'maplibre-gl';
import { MapComponentsProvider } from '../../contexts/MapContext';
import MlGlobeButton from './MlGlobeButton';
import * as stories from './MlGlobeButton.stories';

const { CatalogueDemo } = composeStories(stories);

const expectProjection = (projection: 'globe' | 'mercator') =>
	cy
		.window()
		.its('_map', { timeout: 10000 })
		.should((map: Map) => {
			expect(map.getProjection()?.type).to.eq(projection);
		});

describe('MlGlobeButton', () => {
	beforeEach(() => {
		cy.window().then((win) => {
			Reflect.deleteProperty(win, '_map');
		});
	});

	it('is disabled until a map is available', () => {
		mount(
			<MapComponentsProvider>
				<MlGlobeButton />
			</MapComponentsProvider>
		);

		cy.get('button').should('be.disabled');
		cy.get('[data-testid="MapIcon"]').should('exist');
	});

	it('shows MapIcon as start state and toggles between MapIcon and PublicIcon', () => {
		mount(<CatalogueDemo />);
		expectProjection('mercator');

		cy.get('[data-testid="MapIcon"]', { timeout: 10000 }).should('exist');
		cy.get('[data-testid="PublicIcon"]').should('not.exist');
		cy.get('button').should('be.enabled').click();
		cy.get('[data-testid="PublicIcon"]').should('exist');
		cy.get('[data-testid="MapIcon"]').should('not.exist');
		cy.get('button').click();
		cy.get('[data-testid="MapIcon"]').should('exist');
		cy.get('[data-testid="PublicIcon"]').should('not.exist');
	});

	it('changes the projection on the map instance attached to window', () => {
		mount(<CatalogueDemo />);
		expectProjection('mercator');

		cy.get('button').should('be.enabled').click();
		expectProjection('globe');
		cy.get('button').click();
		expectProjection('mercator');
	});
});
