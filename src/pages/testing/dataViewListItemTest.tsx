import { Autocomplete, TextField, Typography } from "@mui/material"
import { api } from "../../utils/api"
import { ReminderCrudApp } from "../../components/reminders/ReminderCrudApp"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useEffect, useState } from "react"

export default function DataViewListItemTest() {
	const { data, isSuccess } = api.reminders.get.getAllReminders.useQuery(undefined, {})

	const first = data?.[0]
	const second = data?.[1]
	const [selected, setSelected] = useState<NonNullable<typeof data>[0] | undefined>(first)
	useEffect(() => {
		if (data) {
			setSelected(data[0])
		}
	}, [data])

	if (!first || !second) {
		return <Typography>Loading...</Typography>
	}

	return (
		<>
			<ReactQueryDevtools initialIsOpen={true} />

			{selected ? (
				<CustomAutocomplete
					options={[first, second]}
					selected={selected}
					onChange={(e, v) => {
						v && setSelected(v)
					}}
				/>
			) : null}
			{isSuccess && first && second && selected ? (
				<>
					<ReminderCrudApp data={selected} />
				</>
			) : (
				<Typography>Loading...</Typography>
			)}
		</>
	)
}

// Define your types
interface OptionType {
	discord_channels: {
		discord_guilds: {
			name: string
		}
		id: string
		name: string
	}
	id: number
	channel_id: string
	reminder_message: string
	time: Date
}
interface AutocompleteProps {
	options: OptionType[]
	selected: OptionType
	onChange: (event: React.ChangeEvent<object>, value: OptionType | null) => void
}

// Create your Autocomplete component
const CustomAutocomplete: React.FC<AutocompleteProps> = ({ options, selected, onChange }) => {
	return (
		<Autocomplete
			options={options}
			getOptionLabel={(opt) => `${opt.id.toString()}: ${opt.reminder_message.toString()}`}
			isOptionEqualToValue={(opt, val) => opt.id === val.id}
			renderInput={(props) => <TextField {...props} />}
			onChange={onChange}
			value={selected}
		/>
	)
}
