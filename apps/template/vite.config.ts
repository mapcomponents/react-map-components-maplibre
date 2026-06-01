/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(async () => {
	const react = (await import('@vitejs/plugin-react')).default;
	return {
		root: __dirname,
		cacheDir: '../../node_modules/.vite/apps/template',
		plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
		// Uncomment this if you are using workers.
		// worker: {
		//  plugins: [ nxViteTsPaths() ],
		// },
		build: {
			outDir: '../../dist/apps/template',
			emptyOutDir: true,
			reportCompressedSize: true,
			commonjsOptions: {
				transformMixedEsModules: true,
			},
		},
	};
});
