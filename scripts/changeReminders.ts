import { PrismaClient } from "@prisma/client"
import { DateTime } from "luxon"

const prisma = new PrismaClient()
async function main() {
	await prisma.reminders.updateMany({
		where: {
			time: {
				gt: DateTime.local(2900).toJSDate(),
			},
		},
		data: {
			time: DateTime.local(2060).toJSDate(),
		},
	})
}
void main()
