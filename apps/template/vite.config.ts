/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
	return {
		root: __dirname,
		cacheDir: '../../node_modules/.vite/apps/template',
		plugins: [react()],
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
