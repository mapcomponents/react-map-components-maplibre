import { mount } from 'cypress/react';
import './commands';

declare global {
	namespace Cypress {
		interface Chainable<Subject> {
			mount: typeof mount;
		}
	}
}

Cypress.Commands.add('mount', mount);
