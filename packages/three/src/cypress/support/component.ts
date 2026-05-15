import { mount } from 'cypress/react';
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

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', mount);
