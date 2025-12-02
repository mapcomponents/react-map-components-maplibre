import { composeStories } from '@storybook/react';
import * as stories from './MlHexagonMap.stories';

const { NoiseMap }: any = composeStories(stories);

describe('MlHexagonMap Test', () => {
	it('Should display Maplibre map with MlHexagonMap', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<NoiseMap />);
		cy.window()
			.should((win) => expect((win as any)._map).to.exist)
			.then((win) => {
				const map = (win as any)._map;
				cy.wrap(map._controls)
					.should('have.length.at.least', 2)
					.then((controls) => {
						expect(controls[1]._props.id).to.equal('deckgl-layer');
					});
			});
	});
});
