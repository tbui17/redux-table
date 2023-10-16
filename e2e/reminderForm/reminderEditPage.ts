import { type Locator, type Page } from "@playwright/test"
export class ReminderEditPageModel {
	page: Page
	editButtonLocator: Locator
	messageLocator: Locator
	timeLocator: Locator
	channelLocator: Locator
	arrowDropDownIconLocator: Locator
	optionsLocator: Locator
	dialogLocator: Locator

	constructor(page: Page) {
		this.page = page
		this.page.setDefaultTimeout(1000)
		this.dialogLocator = this.page.getByRole("dialog")
		this.editButtonLocator = this.page.getByRole("button", { name: "Edit", exact: false })
		this.messageLocator = this.page.getByLabel("Message", { exact: false })
		this.timeLocator = this.page.getByLabel("Time", { exact: false })
		this.channelLocator = this.page.getByRole("listbox", { expanded: true })
		this.arrowDropDownIconLocator = this.dialogLocator.getByRole("button", {
			name: "Open",
			exact: false,
		})
		this.optionsLocator = this.page.getByRole("option")
		this.beginLoggingNetworkRequests()
	}

	private beginLoggingNetworkRequests() {
		this.page.on("request", (request) => console.log(">>", request.method(), request.url()))
		this.page.on("response", (response) => console.log("<<", response.status(), response.url()))
	}

	async goto() {
		await this.page.goto("http://localhost:3000/testing/dataViewListItemTest")
	}

	async clickEditButton(): Promise<void> {
		await this.editButtonLocator.click()
	}

	async getMessageText() {
		return this.messageLocator.inputValue({ timeout: 5000 })
	}

	async getTimeText() {
		return this.timeLocator.inputValue({ timeout: 5000 })
	}

	async clickArrowDropDownIcon(): Promise<void> {
		await this.arrowDropDownIconLocator.click()
	}

	async getOptions() {
		await this.page.waitForResponse(/.*\/trpc\/.*channel|Channel/, { timeout: 2000 })

		await this.clickArrowDropDownIcon()
		return await this.optionsLocator.all()
	}
}
