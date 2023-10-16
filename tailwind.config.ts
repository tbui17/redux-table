import { type Config } from "tailwindcss";

export default {
	darkMode: "class",
	corePlugins: {
		preflight: false,
	},
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config
