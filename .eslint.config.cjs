module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true,
		jest: true,
	},
	extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:storybook/recommended"
    ],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/prop-types': 'off',
		// empty functions can sometimes be set intentionally. e.g. with useRef/useState, if we want an empty function first
		'@typescript-eslint/no-empty-function': 'off',
		"@typescript-eslint/no-explicit-any": "off"
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
