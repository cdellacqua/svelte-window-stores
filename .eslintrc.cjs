module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['svelte3', '@typescript-eslint', 'eslint-plugin-import'],
	ignorePatterns: ['*.cjs'],
	overrides: [{files: ['*.svelte'], processor: 'svelte3/svelte3'}],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		'prettier/prettier': 'warn',
		'import/extensions': ['error', 'ignorePackages'],
	},
};
