import { ReminderCrudApp } from "../components/reminders/ReminderCrudApp"
import ReminderTable from "~/components/reminders/table/ReminderTable"

import { api } from "../utils/api"

export default function Reminders() {
	return <ReminderTable />
	// return data && <ReminderDataView itemTemplate={DataViewListItem} data={data} />
}
