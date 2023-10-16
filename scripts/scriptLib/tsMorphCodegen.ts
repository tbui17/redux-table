import {
	IndentationText,
	Project,
	QuoteKind,
	type SourceFile,
	VariableDeclarationKind,
} from "ts-morph"

import prettier from "prettier"

function createProject() {
	return new Project({
		manipulationSettings: {
			indentationText: IndentationText.Tab,
			useTrailingCommas: true,
			quoteKind: QuoteKind.Double,
		},
		libFolderPath: "node_modules/@types",
		tsConfigFilePath: "tsconfig.json",
	})
}

/** Get useful information about file location and contents. */
export function getFileInfo(file: SourceFile) {
	return {
		fileName: file.getFilePath(),
		fileText: file.getFullText(),
	}
}

async function lint(text: string) {
	const opts = await prettier.resolveConfig("prettier.config.mjs")

	if (!opts) {
		throw new Error("No prettier config found.")
	}
	return prettier.format(text, { parser: "typescript", ...opts })
}

/** Generates a storybook file component with TRPC mock preconfigured. */
export async function generateStorybookFile(componentName: string) {
	const file = await generateStorybookFileImplWithLint(componentName)
	const message = {
		fileName: file.getFilePath(),
		fileText: file.getFullText(),
		directoryPath: file.getDirectoryPath(),
	}
	console.log(message)

	file.saveSync()
}

async function generateStorybookFileImplWithLint(componentName: string) {
	const file = generateStorybookFileImpl(componentName)
	const linted = await lint(file.getFullText())
	file.replaceWithText(linted)
	return file
}

/**
 *
 * Returns the file object. Caller must call save on the file afterwards.
 *
 */
export function generateStorybookFileImpl(componentName: string) {
	const project = createProject()
	const fileName = `src/stories/${componentName}.stories.tsx`

	const file = project.createSourceFile(fileName, undefined, { overwrite: true })

	// Import Statements
	file.addImportDeclaration({
		moduleSpecifier: "@storybook/react",
		namedImports: ["Meta", "StoryObj"],
		isTypeOnly: true,
	})
	file.addImportDeclaration({
		moduleSpecifier: "../utils/storyApi",
		namedImports: ["StorybookTrpcProvider", "withTrpcContext"],
	})
	file.addImportDeclaration({
		moduleSpecifier: "@storybook/testing-library",
		namedImports: ["within"],
	})
	file.addImportDeclaration({ moduleSpecifier: "@storybook/jest", namedImports: ["expect"] })

	const funcStmts = ["return <div></div>"]
	file.addFunction({ name: componentName, statements: funcStmts, isExported: false })

	// Meta
	file.addVariableStatement({
		declarationKind: VariableDeclarationKind.Const,
		declarations: [
			{
				name: "meta",
				type: `Meta<typeof ${componentName}>`,
				initializer: `{
        title: "components/${componentName}",
        tags: ["autodocs"],
        component: ${componentName},
        decorators: [(Story) => <StorybookTrpcProvider><Story /></StorybookTrpcProvider>]
      }`,
			},
		],
	})
	file.addExportAssignment({
		expression: "meta",
		isExportEquals: false,
	})

	// Story Type
	file.addTypeAlias({ name: "Story", type: "StoryObj<typeof meta>", isExported: true })

	// Primary Variant
	file.addVariableStatement({
		declarationKind: VariableDeclarationKind.Const,
		declarations: [
			{
				name: "Primary",
				type: "Story",
				initializer: `{
	decorators: [
		withTrpcContext((ctx) => {
			ctx.example.hello.setData({ text: "hello" }, () => {
				return {
					greeting: "world",
				};
			});
		}),
	],
	play: async (ctx) => {
		/*interaction tests*/
		const { canvasElement } = ctx;
		const elements = within(canvasElement).getAllByRole("generic");
		await expect(elements.length).toBeTruthy();
	},
};
`,
			},
		],
		isExported: true,
	})

	return file
}
