import { Command } from "commander"
import {
	makeFirstLetterCapital,
	writeToFile,
	TrpcStorybookCreator,
	StorybookCreator,
} from "./scriptLib"

export function createProgram() {
	const program = new Command("cli")

	program.version("0.1.0")

	program
		.command("createContext")
		.argument("<filename>")
		.action((filename: string) => {
			const dir = "src/contexts/"
			const txt = makeFirstLetterCapital(filename)
			const filepath = `${dir}${txt}Context.ts`
			const fileContent = `import { contextFactory } from "./contextFactory"
const { useHook, Provider } = contextFactory<unknown>()
export const use${txt}Context = useHook
export const ${txt}Provider = Provider`
			writeToFile(filepath, fileContent)
		})

	program
		.command("createHook")
		.argument("<filename>")
		.action((fileName: string) => {
			const dir = "src/hooks/"
			const txt = makeFirstLetterCapital(fileName)
			const name = `use${txt}`
			const filePath = `${dir}${name}.ts`
			const fileContent = `export function ${name}(){
	
}`
			writeToFile(filePath, fileContent)
		})

	program
		.command("createTest")
		.argument("<filename>")
		.action((fileName: string) => {
			const dir = "tests/"
			const filePath = `${dir}${fileName}.test.ts`
			const fileContent = `import {describe, expect, it} from "vitest"

describe("${fileName}", () => {

	it("should", () => {

		expect(true).toBe(true)

	})
	
})`
			writeToFile(filePath, fileContent)
		})

	program
		.command("createStorybook")
		.argument("componentName")
		.option("-trpc --trpc", "Add trpc context")
		.action((componentName: string, options: { trpc: boolean }) => {
			if (options.trpc) {
				new TrpcStorybookCreator().createFile(componentName)
				return
			}
			new TrpcStorybookCreator().createFile(componentName)
			// new StorybookCreator().createFile(componentName)
		})

	return program
}
