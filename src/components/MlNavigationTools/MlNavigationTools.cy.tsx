import React from 'react';
import { composeStories } from '@storybook/testing-react';
import { mount } from '@cypress/react';
import * as stories from './MlNavigationTools.stories';
import MlNavigationTools from './MlNavigationTools';


/* 
This test does not properly work yet!
*/

// compile the "Primary" story with the library
const { ExampleConfig } = composeStories(stories);

describe('MlNavigationTools Tests', () => {
	it('should test the functionality of the Zoom Button (+)', () => {
		mount(<ExampleConfig />);

		let firstZoom: number;
		let secondZoom: number;

		cy.get('.maplibregl-canvas-container').as('getMap');
		cy.wait('@getMap').then(() => {
			console.log('Hello World');
		});

		cy.window().then((win) => {
			firstZoom = win?._map?.style.z;
			console.log(win?._map?.style.z);
		});

		cy.get('.zoomplus').click();

		cy.window().then((win) => {
			secondZoom = win?._map?.style.z;
			console.log(secondZoom);
		});

		cy.window().should((win) => {
			const { _map }: any = win;
			console.log(firstZoom, _map?.getZoom());
			expect(_map?.getZoom()).to.be.greaterThan(firstZoom);
		});
		cy.get('.zoomminus').click();
		cy.get('.zoomminus').click();

		cy.window().should((win) => {
			const { _map }: any = win;
			console.log(_map?.getZoom());
			expect(_map?.getZoom()).to.be.lessThan(secondZoom);
		});
	});
});

// test for FollowGPS button not yet implemented
