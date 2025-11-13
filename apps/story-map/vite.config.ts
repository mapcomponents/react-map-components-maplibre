/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: '../../node_modules/.vite/apps/story-map',
	plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
	// Uncomment this if you are using workers.
	// worker: {
	//  plugins: [ nxViteTsPaths() ],
	// },
	build: {
		outDir: '../../dist/apps/story-map',
		emptyOutDir: true,
		reportCompressedSize: true,
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
}));
