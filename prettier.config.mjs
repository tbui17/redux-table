/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
	plugins: ["prettier-plugin-tailwindcss"],
	tabWidth: 4,
	useTabs: true,
	singleQuote: false,
	trailingComma: "es5",
	printWidth: 100,
	quoteProps: "as-needed",

	semi: false,
}

export default config;
