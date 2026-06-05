/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import react from '@vitejs/plugin-react';

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

export default defineConfig(async () => {
	return {
		root: __dirname,
		cacheDir: '../../node_modules/.vite/packages/react-maplibre',
		plugins: [
			react(),
			nxViteTsPaths(),
			nxCopyAssetsPlugin(['*.md']),
			dts({
				entryRoot: 'src',
				tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
				pathsToAliases: false,
			}),
		],
		// Uncomment this if you are using workers.
		// worker: {
		//  plugins: [ nxViteTsPaths() ],
		// },
		// Configuration for building your library.
		// See: https://vitejs.dev/guide/build.html#library-mode
		build: {
			outDir: 'dist',
			emptyOutDir: true,
			reportCompressedSize: true,
			commonjsOptions: {
				transformMixedEsModules: true,
			},
			lib: {
				// Could also be a dictionary or array of multiple entry points.
				entry: 'src/index.ts',
				name: '@mapcomponents/react-maplibre',
				fileName: 'index',
				// Change this to the formats you want to support.
				// Don't forget to update your package.json as well.
				formats: ['es' as const, 'cjs' as const],
			},
			sourcemap: true,
			rolldownOptions: {
				// Treat every bare import (react, deps, peer deps, sub-paths) as external
				// so no third-party code is bundled into the library.
				external: isExternal,
				input: [path.join(__dirname, 'src/index.ts')],
			},
		},
	};
});
