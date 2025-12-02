import storybook from 'eslint-plugin-storybook';
import nx from '@nx/eslint-plugin';

import react from 'eslint-plugin-react';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			'**/.cache',
			'**/.github',
			'**/.storybook',
			'**/.vscode',
			'**/config',
			'**/coverage',
			'**/dist',
			'**/docs',
			'**/docs-build',
			'**/js-docs',
			'**/node_modules',
			'**/storybook-static',
			'**/scripts',
			'**/vite.config.*.timestamp*',
			'**/vitest.config.*.timestamp*',
			'**/eslintErrorTest.js',
			'**/eslint.config.cjs',
		],
	},
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	...compat.extends(
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:storybook/recommended'
	),
	{
		plugins: {
			react,
			'@typescript-eslint': typescriptEslint,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'react/prop-types': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'@nx/enforce-module-boundaries': [
				'error',
				{
					enforceBuildableLibDependency: true,
					allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
					depConstraints: [
						{
							sourceTag: '*',
							onlyDependOnLibsWithTags: ['*'],
						},
					],
				},
			],
		},
	},
	{
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.cts',
			'**/*.mts',
			'**/*.js',
			'**/*.jsx',
			'**/*.cjs',
			'**/*.mjs',
		],
		rules: {},
	},
	...storybook.configs['flat/recommended'],
];
