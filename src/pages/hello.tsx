import SuperJSON from "superjson"
import { api } from "../utils/api"



export default function Hello() {
	const { data } = api.example.TESTGETALLREMINDERS.useQuery()
	const html = data?.map((reminder) => {
		return (
			<div key={reminder.id.toString()}>
				<h1>{reminder.reminder_message}</h1>
				<p>{reminder.time.toLocaleDateString()}</p>
				<p>{SuperJSON.stringify(reminder)}</p>
			</div>
		)
	})
	return (
		<>
			<main>{html}</main>
		</>
	)
}
