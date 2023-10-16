import { type Page, expect, type BrowserContext, type Locator } from "@playwright/test"

import { injectAuthCookiesFromLocalFileIntoContext } from "./getStorageState"

export class AuthPage {
	public userSessionLocator: Locator
	constructor(
		public page: Page,
		public context: BrowserContext,
		public url = "http://localhost:3000/login"
	) {
		this.userSessionLocator = this.page.getByTestId("user-session")
	}

	async init() {
		await injectAuthCookiesFromLocalFileIntoContext(this.context)
		expect(await this.context.cookies().then((res) => res.length)).toBeTruthy()
		await this.page.goto("http://localhost:3000/login")
	}

	public async expectSignedIn() {
		this.page.setDefaultTimeout(5000)
		await expect(this.userSessionLocator).toBeAttached()
	}
}
