"use server"

import SuperJSON from "superjson"
import { serverRouter } from "../../utils/serverApi"

export async function getReminders(req55: any) {
	const res1 = req55

	const session = await getServerSessionInServerAction()

	const res3 = SuperJSON.stringify(res1)

	const res2 = await serverRouter.example.hello({ text: "hello world" })
	return {
		res1,
		res2,
		res3,
		session,
	}
}

import { cookies, headers } from "next/headers"
import { getServerSession as originalGetServerSession } from "next-auth"
import { authOptions } from "../../server/auth"

const getServerSessionInServerAction = async () => {
	const req = {
		headers: Object.fromEntries(headers() as Headers),
		cookies: Object.fromEntries(
			cookies()
				.getAll()
				.map((c) => [c.name, c.value])
		),
	}
	const res = {
		getHeader() {
			return
		},
		setCookie() {
			return
		},
		setHeader() {
			return
		},
	}

	// @ts-expect-error - The type used in next-auth for the req object doesn't match, but it still works
	const session = await originalGetServerSession(req, res, authOptions)
	return session
}