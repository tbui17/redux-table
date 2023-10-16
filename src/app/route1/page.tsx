import { Typography } from "@mui/material"
import { db } from "../../server/db"
import SuperJSON from "superjson"

export default async function Page() {
	const data = await db.reminders.findMany().then((res) => SuperJSON.stringify(res))

	return <Typography fontWeight="bold">{data}</Typography>
}
