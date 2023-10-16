import { env } from "../env.mjs"
import { appRouter } from "../server/api/root"
import { db } from "../server/db"

export const serverRouter = appRouter.createCaller({
	session: {
		expires: new Date(3000).toISOString(),
		user: {
			id: env.TEST_USER,
		},
	},
	db,
})
