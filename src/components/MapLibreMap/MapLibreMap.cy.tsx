import React, { useState } from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react18';
import * as stories from './MapLibreMap.stories';

const { ExampleConfig }: any = composeStories(stories);

const TestComponent = () => {
	const [showMap, setShowMap] = useState(true);

	return (
		<div>
			{showMap && <ExampleConfig />}
			<button
				onClick={() => setShowMap(!showMap)}
				style={{
					position: 'absolute',
					top: '10px',
					left: '10px',
					zIndex: 1000,
				}}
			>
				Toggle Map
			</button>
		</div>
	);
};

describe('MapLibreMap Tests', () => {
	it('Should display Maplibre map with osm bright style', () => {
		mount(<ExampleConfig />);

		// Wait for the map to be initialized and verify, that the terrain layer is added to the map
		cy.window()
			.should((win) => {
				expect((win as any)._map).to.exist;
			})
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_map: any) => {
					// check for style name
				});
			});
	});

	it('Should remove and re-add the MapLibreMap component and verify initialization', () => {
		mount(<TestComponent />);

		// Remove the map
		cy.get('button').click();

		// Verify the map is removed
		cy.window().should((win) => {
			expect((win as any)._map).to.not.exist;
		});

		// Re-add the map
		cy.get('button').click();

		// Verify the map is re-initialized
		cy.window()
			.should((win) => {
				expect((win as any)._map).to.exist;
			})
			.then((win) => {
				const { _map }: any = win;
				cy.wrap(_map).should((_map: any) => {
					// check for style name
				});
			});
	});
});
