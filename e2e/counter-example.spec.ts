import { test, expect } from "@playwright/test"
import { CounterExamplePage } from "./utils/counter-example"

test("increments and decrements correctly", async ({ page }) => {
	const counterPage = new CounterExamplePage(page)
	await counterPage.goto()
	expect(await counterPage.getIntervalInputValue()).toBe("1")

	await counterPage.pressAddButton()
	await counterPage.expectDisplayValuesToBe(1)

	await counterPage.pressAddButton()
	await counterPage.expectDisplayValuesToBe(2)

	await counterPage.pressSubtractButton()
	await counterPage.expectDisplayValuesToBe(1)

	await counterPage.expectDisplayValuesToBe(1)
})

test("interval changes correctly", async ({ page }) => {
	const counterPage = new CounterExamplePage(page)
	await counterPage.goto()
	expect(await counterPage.getIntervalInputValue()).toBe("1")

	await counterPage.setIntervalInputValue(2)
	expect(await counterPage.getIntervalInputValue()).toBe("2")

	await counterPage.pressAddButton()
	await counterPage.expectDisplayValuesToBe(2)

	await counterPage.setIntervalInputValue(100)
	await counterPage.pressAddButton()
	await counterPage.expectDisplayValuesToBe(102)
})