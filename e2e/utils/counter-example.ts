import { type Locator, type Page, expect } from "@playwright/test"

export class CounterExamplePage {
	readonly page: Page
	readonly addButton: Locator
	readonly subtractButton: Locator
	readonly intervalInput: Locator
	readonly displayedCounters: Locator

	constructor(page: Page) {
		this.page = page

		this.addButton = page.getByTestId("increment-button")
		this.subtractButton = page.getByTestId("decrement-button")
		this.intervalInput = page.getByTestId("interval-input")
		this.displayedCounters = page.getByTestId("count")
	}

	async goto() {
		await this.page.goto("localhost:3000/counter-example")
	}

	async pressAddButton() {
		await this.addButton.click()
	}

	async pressSubtractButton() {
		await this.subtractButton.click()
	}

	async getDisplayedCounterValues() {
		return await this.displayedCounters.allInnerTexts()
	}

	async getIntervalInputValue() {
		return await this.intervalInput.inputValue()
	}

	async setIntervalInputValue(value: number) {
		await this.intervalInput.fill(value.toString())
	}

	async expectDisplayValuesToBe(value: number) {
		const displays = await this.getDisplayedCounterValues()
		expect(displays.length).toBe(2)

		for (const result of displays) {
			expect(result).toBe(value.toString())
		}
	}
}
