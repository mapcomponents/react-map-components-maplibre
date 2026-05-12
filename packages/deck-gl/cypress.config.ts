import { nxComponentTestingPreset } from '@nx/react/plugins/component-testing';
import { defineConfig } from 'cypress';

const preset = nxComponentTestingPreset(__filename, {
	bundler: 'vite',
	buildTarget: 'deck-gl:build',
});

export default defineConfig({
	component: {
		...preset,
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
