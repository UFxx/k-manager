export default {
	"extends": [
		"stylelint-config-standard",
		"stylelint-config-recommended-vue",
		"stylelint-config-standard-scss"
	],
	"overrides":
	[
		{
			files: ['*.vue'],
			customSyntax: 'postcss-html'
		}
	],
	"rules": {
		"no-descending-specificity": true,
		"no-duplicate-selectors": true,
		"declaration-block-no-duplicate-custom-properties": true,
		"block-no-empty": true,
		"color-no-invalid-hex": true,
		"no-irregular-whitespace": true,
		"color-hex-alpha": "never",
		"color-hex-length": "long",
		"selector-class-pattern": null,
		"custom-property-pattern": "^[a-z]+([A-Z][a-z]+)*$"
	}
}
