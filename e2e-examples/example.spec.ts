import { test, expect } from "@playwright/test"

test("has title", async ({ page }) => {
	await page.goto("https://playwright.dev/")

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/)
})

test("get started link", async ({ page }) => {
	await page.goto("https://playwright.dev/")

	// Click the get started link.
	await page.getByRole("link", { name: "Get started" }).click()

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible()
})

test("test", async ({ page }) => {
	await page.goto("https://demo.playwright.dev/todomvc/")
	await page.goto("https://demo.playwright.dev/todomvc/#/")
	await page.getByPlaceholder("What needs to be done?").click()
	await page.getByPlaceholder("What needs to be done?").fill("hello world")
	await page.getByPlaceholder("What needs to be done?").press("Enter")
	await page.getByPlaceholder("What needs to be done?").fill("bye world")
	await page.getByPlaceholder("What needs to be done?").press("Enter")
	await page.locator("li").filter({ hasText: "hello world" }).getByLabel("Toggle Todo").check()
	await page.getByRole("button", { name: "Clear completed" }).click()
	const res = await page.getByTestId("todo-title").allInnerTexts()
	console.log(res)
})
