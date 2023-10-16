import { type GetReminderOutputNotNull } from "../types/router"

import { contextFactory } from "./contextFactory"

const initial: GetReminderOutputNotNull = {
	discord_channels: {
		discord_guilds: { name: "" },
		id: "",
		name: "",
	},
	id: 0,
	channel_id: "",
	reminder_message: "",
	time: new Date(),
}

const ctx = contextFactory<GetReminderOutputNotNull>(initial)

export const useReminderDataContext = ctx.useHook

export const ReminderDataContextProvider = ({
	initialValues,
	children,
}: {
	initialValues: GetReminderOutputNotNull
	children: React.ReactNode
}) => {
	return (
		<>
			<ctx.Provider value={initialValues}>{children}</ctx.Provider>
		</>
	)
}
