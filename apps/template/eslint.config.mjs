import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
	...baseConfig,
	...nx.configs['flat/react'],
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: typescriptParser,
			globals: {
				// browser globals
				window: 'readonly',
				document: 'readonly',
				navigator: 'readonly',
				// node globals
				module: 'readonly',
				require: 'readonly',
				process: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'react-refresh': reactRefresh,
			'react-hooks': reactHooks,
		},
		rules: {
			...typescriptEslint.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': 'warn',
		},
	},
];
