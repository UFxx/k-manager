import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
	...pluginVue.configs['flat/recommended'],
	{
		plugins:
		{
			'@stylistic': stylistic
		},
		rules:
		{
			'vue/no-unused-vars': 'error',
			'vue/multi-word-component-names': 'off',
			'vue/html-self-closing':
			[
				"error",
				{
					"html":
					{
						"void": "always",
						"normal": "always",
						"component": "always"
					},
					"svg": "always"
				}
			],
			"vue/html-indent":
			[
				"error", "tab",
				{
					"attribute": 1,
					"baseIndent": 1,
					"closeBracket": 0,
					"alignAttributesVertically": true,
				}
			],
			"vue/component-definition-name-casing": ["error", "PascalCase"],
			"vue/html-quotes": ["error", "double", { "avoidEscape": true }],
			"vue/attribute-hyphenation": ["error", "never"],
			'vue/order-in-components':
			[
				"error",
				{
					order:
					[
						'name',
						'directives',
						'components',
						'mixins',
						['provide', 'inject'],
						'model',
						'props',
						'filters',
						'data',
						'computed',
						'watch',
						'methods',
						'LIFECYCLE_HOOKS',
						'ROUTER_GUARDS',
					],
				},
			],
			"no-trailing-spaces": "error",
			"no-duplicate-imports": "error",
			"no-unreachable" : "error",
			"no-unused-vars" : "error",
			'brace-style': ['error', 'allman'],
			"vue/html-indent": ["error", "tab", {
				"attribute": 1,
				"baseIndent": 1,
				"closeBracket": 0,
				"alignAttributesVertically": true
			}],
			"vue/script-indent": ["error", "tab", {
				"baseIndent": 1,
				"switchCase": 1,
				"ignores": []
			}],
			"vue/require-prop-types" : ["off"]
		},
		languageOptions:
		{
			sourceType: 'module',
			globals: {
				...globals.browser
			}
		}
	}
]