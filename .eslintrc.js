/* eslint-disable no-undef */
module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['@typescript-eslint', 'import'],
	parser: '@typescript-eslint/parser',
	globals: {
		__ENV__: true,
		__PLATFORM__: true,
		__DEV__: true,
		__TEST__: true,
		__PROD__: true,
		__COVERAGE__: true,
		__CT_CHUNK_FIX__: true,
		__WEBPACK_MODE__: true,
	},
	rules: {
		// import rules
		'import/no-cycle': ['error', { ignoreExternal: true, maxDepth: 1 }],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
				'newlines-between': 'always-and-inside-groups',
				distinctGroup: false,
				pathGroupsExcludedImportTypes: ['builtin'],
			},
		],
		// end import rules

		'@typescript-eslint/naming-convention': [
			'error',
			{
				prefix: ['I'],
				selector: 'interface',
				format: ['PascalCase'],
			},
			{
				prefix: ['E'],
				selector: 'enum',
				format: ['PascalCase'],
			},
			{
				prefix: ['T'],
				selector: 'typeAlias',
				format: ['PascalCase'],
			},
			{
				selector: 'variable',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
			},
			{
				selector: 'enumMember',
				format: ['PascalCase'],
			},
		],
		'@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
		'@typescript-eslint/no-var-requires': 'off',
	},
	overrides: [],
}
