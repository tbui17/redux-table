import { useReminderFormController } from "../../hooks/useReminderForm"
import { DateTimePicker } from "@mui/x-date-pickers"

export function ReminderDateTimePicker() {
	const { field } = useReminderFormController({ name: "time" })

	return (
		<DateTimePicker
			{...field}
			label="Time"
			sx={{
				maxHeight: 200,
				pb: 2,
			}}
		/>
	)
}
