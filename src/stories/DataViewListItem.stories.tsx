import type { Meta, StoryObj } from "@storybook/react"
import { StorybookTrpcProvider } from "../utils/storyApi"

import { ReminderCrudApp } from "../components/reminders/ReminderCrudApp"
import { Typography, Divider, Avatar } from "@mui/material"
import { Stack } from "@mui/system"

const mockData = {
	discord_channels: {
		discord_guilds: {
			name: "My Guild",
		},
		id: "123",
		name: "My Channel",
	},
	id: 1,
	channel_id: "456",
	reminder_message: "Don't forget to submit your report!",
	time: new Date(),
}

const meta: Meta<typeof ReminderCrudApp> = {
	title: "components/DataViewListItem",
	tags: ["autodocs"],
	component: ReminderCrudApp,
	decorators: [
		(Story) => (
			<StorybookTrpcProvider>
				<Story />
			</StorybookTrpcProvider>
		),
	],
}

function DataLayout({
	imageUrl = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}: ComponentProps) {
	return (
		<>
			<li key={"$KEY"} className="flex justify-between gap-x-6 py-5">
				<Stack
					spacing={0}
					direction={"row"}
					alignItems="center"
					className="flex min-w-0 gap-x-4"
				>
					<DiscordGuildAvatar imageUrl={imageUrl} guildName="Example" />
				</Stack>
			</li>
			<Divider />
		</>
	)
}

type ComponentProps = {
	imageUrl?: string
	guildName?: string
}

function DiscordGuildAvatar({ imageUrl, guildName }: ComponentProps) {
	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{ flex: "" }}
			className="min-w-0 flex-auto items-center"
		>
			<Avatar
				sx={{
					width: 100,
					height: 100,
				}}
				className=" flex-none rounded-full bg-gray-50"
				src={imageUrl}
				alt=""
			/>
			<Typography sx={{ fontSize: 20 }} className="font-semibold leading-6">
				{guildName}
			</Typography>
		</Stack>
	)
}

export default meta

export type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: () => {
		return <ReminderCrudApp data={mockData} />
	},
}

export const Secondary: Story = {
	render: () => {
		return <DataLayout />
	},
}