import { nxComponentTestingPreset } from '@nx/react/plugins/component-testing';
import { defineConfig } from 'cypress';

export default defineConfig({
	component: {
		...nxComponentTestingPreset(__filename, {
			bundler: 'vite',
			buildTarget: '@mapcomponents/three:build',
		}),
		supportFile: 'src/cypress/support/component.ts',
		indexHtmlFile: 'src/cypress/support/component-index.html',
	},
});
