import { Typography, Divider } from "@mui/material"
import { Stack, Box } from "@mui/system"
import { type Meta, type StoryObj } from "@storybook/react"

import { type Page } from "../Page"

const people = [
	{
		name: "Leslie Alexander",
		email: "leslie.alexander@example.com",
		role: "Co-Founder / CEO",
		imageUrl:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		lastSeen: "3h ago",
		lastSeenDateTime: "2023-01-23T13:23Z",
	},
	{
		name: "Michael Foster",
		email: "michael.foster@example.com",
		role: "Co-Founder / CTO",
		imageUrl:
			"https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		lastSeen: "3h ago",
		lastSeenDateTime: "2023-01-23T13:23Z",
	},
	{
		name: "Dries Vincent",
		email: "dries.vincent@example.com",
		role: "Business Relations",
		imageUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		lastSeen: null,
	},
	{
		name: "Lindsay Walton",
		email: "lindsay.walton@example.com",
		role: "Front-end Developer",
		imageUrl:
			"https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		lastSeen: "3h ago",
		lastSeenDateTime: "2023-01-23T13:23Z",
	},
	{
		name: "Courtney Henry",
		email: "courtney.henry@example.com",
		role: "Designer",
		imageUrl:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		lastSeen: "3h ago",
		lastSeenDateTime: "2023-01-23T13:23Z",
	},
	{
		name: "Tom Cook",
		email: "tom.cook@example.com",
		role: "Director of Product",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
		lastSeen: null,
	},
]

function ListSnippet() {
	return (
		<ul role="list" className="divide-y divide-gray-100 pr-5">
			{people.map((person) => (
				<>
					<li key={person.email} className="flex justify-between gap-x-6 py-5">
						<Stack direction="row">
							<img
								className="h-12 w-12 flex-none rounded-full bg-gray-50"
								src={person.imageUrl}
								alt=""
							/>
							<Stack spacing={0} direction={"row"} className="flex min-w-0 gap-x-4">
								<Stack spacing={1} className="min-w-0 flex-auto">
									<Typography className="text-sm font-semibold leading-6">
										{person.name}
									</Typography>
									<Typography className="mt-2 truncate text-xs leading-5">
										{person.email}
									</Typography>
								</Stack>
							</Stack>
						</Stack>
						<Stack
							spacing={1}
							className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"
						>
							<Typography className="text-sm leading-6">{person.role}</Typography>

							<Stack direction="row" className="mt-1 flex items-center gap-x-1.5">
								<Box className="Typography-1 flex-none rounded-full bg-emerald-500/20">
									<Typography className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
								</Box>
								<Typography className="leading-50 text-xs">Online</Typography>
							</Stack>
						</Stack>
					</li>
					<Divider />
				</>
			))}
		</ul>
	)
}

const meta = {
	title: "Snippets/ListSnippet",
	tags: ["autodocs"],
	component: ListSnippet,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
		layout: "fullscreen",
	},
} satisfies Meta<typeof Page>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
