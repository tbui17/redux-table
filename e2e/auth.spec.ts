import { test } from "@playwright/test"

import { AuthPage } from "./utils/authPage"

test("auth successful setup", async ({ page, context }) => {
	const authPage = new AuthPage(page, context)
	await authPage.expectSignedIn()
})
