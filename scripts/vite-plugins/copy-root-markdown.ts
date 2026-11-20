import { copyFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Plugin } from 'vite';

export function copyRootMarkdown(projectRoot: string): Plugin {
	return {
		name: 'mapcomponents-copy-root-markdown',
		writeBundle({ dir }) {
			const outputDirectory = dir ?? resolve(projectRoot, 'dist');
			for (const file of readdirSync(projectRoot)) {
				if (file.endsWith('.md')) {
					copyFileSync(resolve(projectRoot, file), resolve(outputDirectory, file));
				}
			}
		},
	};
}
