import { mount } from 'cypress/react';
import { setWorkerUrl } from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
import './commands';

setWorkerUrl(maplibreWorkerUrl);

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
