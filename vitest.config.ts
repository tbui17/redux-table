import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		globals: true,
		outputFile: { json: "testLogs/testResults.json" },
		reporters: ["json", "default"],
		dir: "tests",
	},
	resolve: {
		alias: {
			jest: "vi",
			"~": "./src",
		},
	},
})
