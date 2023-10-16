import { type RouterOutputs } from "../utils/api"

export type GetGuildsAndTextBasedChannelsOfUserOutput =
	RouterOutputs["discordRouter"]["getGuildsAndTextBasedChannelsOfUser"]

export type GetGuildsAndTextBasedChannelsOfUserOutputSingle =
	GetGuildsAndTextBasedChannelsOfUserOutput[0]
export type GetReminderOutput = RouterOutputs["reminders"]["get"]["getReminder"]

export type GetReminderOutputNotNull = NonNullable<GetReminderOutput>
