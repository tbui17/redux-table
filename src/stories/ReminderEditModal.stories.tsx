import type { Meta, StoryObj } from "@storybook/react"
import { StorybookTrpcProvider, withTrpcContext } from "../utils/storyApi"
import { within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import ReminderMessageField from "../components/reminders/modal/ReminderMessageField"
import ReminderEditModal from "../components/reminders/ReminderEditModal"

import { createDefaultReminderFieldValues } from "~/lib/createDefaultReminderFieldValues"
import { type GetReminderOutputNotNull } from "../types/router"
import { createChannelData } from "./utils/createTestChannelData"
import { ReminderDialogFormProvider } from "~/providers/reminderFormProvider"

const formMockData = {
	reminder_message: "hello",
	time: new Date(),
	channel_id: "123",
}

const getReminderMockData: GetReminderOutputNotNull = {
	...formMockData,
	id: 12345,
	discord_channels: {
		id: "123",
		name: "test",
		discord_guilds: {
			name: "test",
		},
	},
}

const meta: Meta<typeof ReminderEditModal> = {
	args: {
		data: getReminderMockData,
	},
	argTypes: {
		data: {
			description: "The data to be used in the form. Must refresh the page to see changes.",
			defaultValue: getReminderMockData,
			control: {
				type: "object",
			},
		},
	},
	title: "Components/ReminderEditModal",
	tags: ["autodocs"],
	component: ReminderEditModal,
	decorators: [
		(Story) => (
			<ReminderDialogFormProvider
				defaultValues={createDefaultReminderFieldValues()}
				data={getReminderMockData}
			>
				<StorybookTrpcProvider>{<Story />}</StorybookTrpcProvider>
			</ReminderDialogFormProvider>
		),
	],
}

export default meta

export type Story = StoryObj<typeof meta>

export const MessageField: Story = {
	render: () => <ReminderMessageField />,
	play: async (ctx) => {
		/*interaction tests*/

		// field should populate with data from the form
		const { canvasElement } = ctx
		const elements = within(canvasElement).getByRole("textbox")
		await expect(elements.textContent).toBeTruthy()
	},
}

export const Primary: Story = {
	render: () => {
		return <ReminderEditModal />
	},
	play: async (ctx) => {
		const editButton = within(ctx.canvasElement).getByTitle("EDIT")
		await expect(editButton).toBeInTheDocument()
	},

	decorators: [
		withTrpcContext((ctx) => {
			ctx.discordRouter.getGuildsAndTextBasedChannelsOfUser.setData(
				undefined,
				createChannelData()
			)
		}),
	],
}
