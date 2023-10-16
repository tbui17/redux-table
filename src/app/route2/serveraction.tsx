"use client"
import { Button, Typography } from "@mui/material"
import { useState } from "react"
import SuperJSON from "superjson"
import { getReminders } from "./p1"
import { useSession } from "next-auth/react"

export const ServerActionPage = () => {
	const state = useState<any>({})
	const session = useSession()
	const r2 = session.data?.user.name

	const onClick = async () => {
		const res = await getReminders(r2)
		state[1](res)
	}

	return (
		<>
			<Typography>{SuperJSON.stringify(state)}</Typography>
			<Button onClick={onClick}>Click me</Button>
		</>
	)
}
