import { test, expect } from "@playwright/test"

import { ReminderTestDataClient } from "../../tests/utils/ReminderTestDataClient"
import { injectAuthCookiesFromLocalFileIntoContext } from "../utils/getStorageState"
import { ReminderEditPageModel } from "./reminderEditPage"
const dateRegex = /\d{2}\/\d{2}\/\d{4}.+/

test.describe("rendering", () => {
	test.beforeAll(async () => {
		const client = await ReminderTestDataClient.fromDbData()
		await client.teardownThenSetupReminders()
	})
	test.beforeEach(async ({ context }) => {
		await injectAuthCookiesFromLocalFileIntoContext(context)
	})

	test("renders edit modal with correct data", async ({ page }) => {
		const reminderPage = new ReminderEditPageModel(page)
		page.setDefaultTimeout(5000)
		await reminderPage.goto()

		await reminderPage.clickEditButton()

		const message = await reminderPage.getMessageText()
		expect(message).toBeTruthy()

		const time = await reminderPage.getTimeText()
		expect(time).toMatch(dateRegex)

		const options = await reminderPage.getOptions()
		expect(options.length).toBeGreaterThan(5)
	})
})
