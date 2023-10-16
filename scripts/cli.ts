import { createProgram } from "./createProgram"

function main() {
	const program = createProgram()
	program.parse(process.argv)
}

void main()
