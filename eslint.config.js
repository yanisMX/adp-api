const js = require("@eslint/js");

module.exports = [
	js.configs.recommended,
	{
		rules: {
			"no-unused-vars": "error",
			"no-undef": "warn",
			"quotes": ["error", "double"]
		}
	}
];
