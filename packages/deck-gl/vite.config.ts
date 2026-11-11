/// <reference types='vitest' />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { copyRootMarkdown } from '../../scripts/vite-plugins/copy-root-markdown';

const isExternal = (id: string) => !id.startsWith('.') && !path.isAbsolute(id);

export default defineConfig(async () => {
	const react = (await import('@vitejs/plugin-react')).default;

	return {
		root: __dirname,
		cacheDir: '../../node_modules/.vite/packages/deck-gl',
		resolve: {
			tsconfigPaths: true,
			dedupe: [
				'react',
				'react-dom',
				'@mui/material',
				'@mui/system',
				'@emotion/react',
				'@emotion/styled',
			],
		},
		plugins: [
			react(),
			copyRootMarkdown(__dirname),
			dts({ entryRoot: 'src', tsconfigPath: path.join(__dirname, 'tsconfig.lib.json') }),
		],
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
				name: '@mapcomponents/deck-gl',
				fileName: 'index',
				// Change this to the formats you want to support.
				// Don't forget to update your package.json as well.
				formats: ['es' as const, 'cjs' as const],
			},
			rolldownOptions: {
				// Treat every bare import (react, deps, peer deps, sub-paths) as external
				// so no third-party code is bundled into the library.
				external: isExternal,
			},
		},
	};
});
