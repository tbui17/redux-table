import { Typography } from "@mui/material"
import { db } from "../../server/db"
import SuperJSON from "superjson"
import { ServerActionPage } from "./serveraction"

export default async function Page() {
	const data = await db.reminders.findMany({ take: 1 }).then((res) => SuperJSON.stringify(res))

	return (
		<>
			<ServerActionPage />
			<Typography fontWeight="bold">{data}</Typography>
		</>
	)
}
