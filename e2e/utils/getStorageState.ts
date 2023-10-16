import { type BrowserContext, chromium } from "@playwright/test"
import { readFileSync } from "fs"

export class UrlBuilder {
	protocol = "http"
	hostName = "127.0.0.1"
	port = "9222"

	build() {
		return `${this.protocol}://${this.hostName}:${this.port}`
	}
}

type GetStorageStateArgFactory = (builder: UrlBuilder) => string

type GetStorageStateOpts = {
	path: string
}

/**
 * The browser must have only one page open for this to work consistently.
 *
 * Retrieves the storage state of a Chromium browser context.
 * @param cdpUrl - The URL of the Chromium DevTools Protocol endpoint or a factory function that returns the URL.
 * @param options - Optional settings for the storage state retrieval.
 * @returns A Promise that resolves with the storage state object.
 */
export async function getStorageState(
	cdpUrl: GetStorageStateArgFactory | string = new UrlBuilder().build(),
	{ path = "auth.json" }: GetStorageStateOpts
) {
	const url = typeof cdpUrl === "string" ? cdpUrl : cdpUrl(new UrlBuilder())

	const browser = await chromium.connectOverCDP(url)
	const context = browser.contexts()[0]!

	await context.storageState({ path })
	await context.close()
	await browser.close()
}

type AddCookiesProps = Parameters<BrowserContext["addCookies"]>[0]

export function injectAuthCookiesFromLocalFileIntoContext(
	context: BrowserContext,
	authJsonPath = "auth.json"
) {
	const res: { cookies: AddCookiesProps; origins: unknown[] } = JSON.parse(
		readFileSync(authJsonPath, "utf-8")
	)
	return context.addCookies(res.cookies)
}
