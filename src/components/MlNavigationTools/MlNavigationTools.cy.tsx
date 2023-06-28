import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './MlNavigationTools.stories';
import MlNavigationTools from './MlNavigationTools';

// compile the "Primary" story with the library
const { ExampleConfig } = composeStories(stories);

// test for FollowGPS button not yet implemented
describe('MlNavigationTools Tests', () => {
	it('should test the functionality of the Zoom Button (+)', async () => {
		mount(<ExampleConfig />);

		let initialZoom;

		await cy.wait(3000);
		cy.window().then((win) => {
			initialZoom = win?._map?.getZoom();
		});

		cy.get('.zoomplus').click();

		cy.window().then(
			(win) => {
				const { _map }: any = win;
				console.log(initialZoom, _map?.getZoom());
				expect(_map?.getZoom()).to.be.greaterThan(initialZoom);
			}

			/* cy.window().then((win) => {
			const { _map }: any = win;
			expect(_map?._easeOptions?.pitch).to.not.be.exist;
		});

		cy.get('.pitchbutton').click();

		cy.wait(3000);

		cy.window().then((win) => {
			const { _map }: any = win;
			expect(_map?._easeOptions?.pitch).to.be.exist;
		}
    */
		);
	});
});
