/// <reference types='vitest' />
import { defineConfig } from 'vite';
import { copyRootMarkdown } from '../../scripts/vite-plugins/copy-root-markdown';

export default defineConfig(async () => {
	const react = (await import('@vitejs/plugin-react')).default;
	return {
		root: __dirname,
		cacheDir: '../../node_modules/.vite/apps/storybook-composition',
		resolve: {
			tsconfigPaths: true,
		},
		server: {
			port: 4200,
			host: 'localhost',
		},
		preview: {
			port: 4200,
			host: 'localhost',
		},
		plugins: [react(), copyRootMarkdown(__dirname)],
		build: {
			outDir: '../../dist/apps/storybook-composition',
			emptyOutDir: true,
			reportCompressedSize: true,
			commonjsOptions: {
				transformMixedEsModules: true,
			},
		},
	};
});
