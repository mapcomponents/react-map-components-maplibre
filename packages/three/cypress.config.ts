import { nxComponentTestingPreset } from '@nx/react/plugins/component-testing';
import { defineConfig } from 'cypress';

// @ts-expect-error __filename is available in Node CJS context where Cypress runs
const filename: string = __filename;

const preset = nxComponentTestingPreset(filename, {
	bundler: 'vite',
	buildTarget: '@mapcomponents/three:build',
});

export default defineConfig({
	component: {
		...preset,
		supportFile: 'src/cypress/support/component.ts',
		indexHtmlFile: 'src/cypress/support/component-index.html',
		setupNodeEvents(on) {
			on('before:browser:launch', (browser, launchOptions) => {
				if (browser.family === 'chromium') {
					launchOptions.args.push('--use-gl=angle');
					launchOptions.args.push('--use-angle=swiftshader');
					launchOptions.args.push('--ignore-gpu-blocklist');
					launchOptions.args.push('--disable-gpu-sandbox');
					launchOptions.args.push('--enable-webgl');
				}
				if (browser.name === 'electron') {
					launchOptions.preferences.webPreferences = {
						...launchOptions.preferences.webPreferences,
						webgl: true,
					};
				}
				return launchOptions;
			});
		},
	},
});
