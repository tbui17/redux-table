import chalk from "chalk"
import { existsSync, writeFileSync } from "fs"

export function makeTitleCase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

function stopIfFileExists(filePath: string) {
	if (existsSync(filePath)) {
		console.log(`File ${filePath} already exists. Exiting...`)
		throw new Error("File already exists")
	}
}

export function writeToFile(filePath: string, fileContent: string) {
	stopIfFileExists(filePath)

	writeFileSync(filePath, fileContent)
	console.log(
		chalk.green(
			`File ${chalk.underline.blue(
				filePath
			)} has been created. Don't forget to change the unknown type!`
		)
	)
}
export function endsWithSeparator(str: string) {
	return str.endsWith("/") || str.endsWith("\\")
}

export function makeFirstLetterCapital(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
