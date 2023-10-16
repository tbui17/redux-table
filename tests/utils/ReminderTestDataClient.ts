import { type discord_user, type reminders } from "@prisma/client"
import { db } from "../../src/server/db"

import { env } from "../../src/env.mjs"

type SeedData = {
	users: discord_user[]
	reminders: reminders[]
}

export class ReminderTestDataClient {
	constructor(
		public seedData: SeedData,
		public testUserId: string
	) {}

	static async fromDbData(testUserId: string = env.TEST_USER_ID) {
		const [users, reminders] = await Promise.all([
			db.discord_user_duplicate.findMany(),
			db.reminders_duplicate.findMany(),
		])
		return new ReminderTestDataClient({ users, reminders }, testUserId)
	}

	setupReminders() {
		return db.reminders.createMany({ data: this.seedData.reminders })
	}

	teardownReminders() {
		return db.reminders.deleteMany({
			where: {
				user_id: this.testUserId,
			},
		})
	}

	async teardownThenSetupReminders() {
		await db.$transaction([this.teardownReminders(), this.setupReminders()])
	}
}
