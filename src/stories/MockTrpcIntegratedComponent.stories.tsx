import type { Meta, StoryObj } from "@storybook/react"
import { StorybookTrpcProvider, withTrpcContext } from "../utils/storyApi"
import { within } from "@storybook/testing-library"
import { expect } from "@storybook/jest"
import { type RouterOutputs } from "../utils/api"
import { MockTrpcIntegratedComponent } from "./MockTrpcIntegratedComponent"

const meta: Meta<typeof MockTrpcIntegratedComponent> = {
	title: "Example/MockTrpcIntegratedComponent",
	tags: ["autodocs"],

	component: MockTrpcIntegratedComponent,
	decorators: [
		// Apply context providers here
		(Story) => (
			<StorybookTrpcProvider>
				<Story />
			</StorybookTrpcProvider>
		),
	],
}
export default meta
type Story = StoryObj<typeof meta>

// define variants of the components to be showcased as Story objects

export const ExampleTrpc1: Story = {
	decorators: [
		withTrpcContext((ctx) => {
			// define mock data for trpc here

			ctx.example.hello.setData({ text: "johnny" }, () => {
				return {
					greeting: "Sally",
				}
			})
			ctx.reminders.get.getAllReminders.setData(undefined, () => {
				const result: RouterOutputs["reminders"]["get"]["getAllReminders"][0] = {
					discord_channels: {
						discord_guilds: {
							name: "guild 1",
						},
						id: "123",
						name: "channel 1",
					},

					id: 44,
					channel_id: "456",
					reminder_message: "reminder msg",
					time: new Date(2023, 9, 3, 15, 30, 15),
				}
				return [result]
			})
		}),
	],

	play: async (ctx) => {
		// write interaction tests here

		const { canvasElement } = ctx

		const canvas = within(canvasElement)
		const listItem = canvas.getByRole("group")
		const statusValue = within(listItem).getByTitle("status data")

		await expect(statusValue).toHaveTextContent("success")

		const nameValue = within(listItem).getByTitle("name data")
		// this is testing the trpc mocking, actual value would be "johnny"
		await expect(nameValue).toHaveTextContent("Sally")
	},
}
