import { writeFileSync } from "fs"

import SuperJSON from "superjson"
import { serverRouter } from "../src/utils/serverApi"

async function main() {
	const result = await serverRouter.reminders.get.getAllReminders()
	writeFileSync("testLogs/data.json", SuperJSON.stringify(result))
	console.log(`done retrieved ${result.length} reminders`)
}
void main()
