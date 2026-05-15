import { mount } from 'cypress/react';
// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';

// Ignore WebGL context creation errors (e.g. in headless/CI environments)
Cypress.on('uncaught:exception', (err) => {
	if (
		err.message.includes('Failed to initialize WebGL') ||
		err.message.includes('webglcontextcreationerror')
	) {
		return false;
	}
	return true;
});

// add component testing only related command here, such as mount
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		interface Chainable<Subject> {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', mount);
