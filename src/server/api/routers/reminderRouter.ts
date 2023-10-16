import { createTRPCRouter, reminderRLSProcedure } from "~/server/api/trpc"

import { z } from "zod"
import { remindersCreateSchema, remindersUpdateSchema } from "../../../models/reminder-frontend"
import { type Prisma } from "@prisma/client"

export const DEFAULT_SELECT = {
	id: true,
	reminder_message: true,
	time: true,
	channel_id: true,
	discord_channels: {
		select: {
			id: true,
			name: true,
			discord_guilds: {
				select: {
					name: true,
				},
			},
		},
	},
} as const satisfies Prisma.remindersSelect

const get = createTRPCRouter({
	getReminder: reminderRLSProcedure.input(z.number()).query(async ({ ctx, input }) => {
		return await ctx.db.reminders.findUnique({
			select: DEFAULT_SELECT,
			where: {
				id: input,
			},
		})
	}),
	getReminders: reminderRLSProcedure.input(z.number().array()).query(async ({ ctx, input }) => {
		return await ctx.db.reminders.findMany({
			select: DEFAULT_SELECT,
			where: {
				id: { in: input },
			},
		})
	}),
	getAllReminders: reminderRLSProcedure.query(async ({ ctx }) => {
		return await ctx.db.reminders.findMany({
			select: DEFAULT_SELECT,
			where: {
				user_id: ctx.session.user.id,
			},
			orderBy: {
				id: "asc",
			},
		})
	}),
})

const patch = createTRPCRouter({
	updateReminder: reminderRLSProcedure
		.input(remindersUpdateSchema)
		.mutation(async ({ ctx, input: { id, reminder_message, time, channel_id } }) => {
			await ctx.db.reminders.update({
				where: {
					id,
				},
				data: {
					reminder_message,
					time,
					channel_id,
				},
			})
			return true
		}),
})

const deleteRouter = createTRPCRouter({
	deleteReminder: reminderRLSProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
		await ctx.db.reminders.delete({
			where: {
				id: input,
			},
		})
		return true
	}),

	deleteReminders: reminderRLSProcedure
		.input(z.number().array())
		.mutation(async ({ ctx, input }) => {
			await ctx.db.reminders.deleteMany({
				where: {
					id: { in: input },
				},
			})
			return true
		}),
})

const post = createTRPCRouter({
	createReminder: reminderRLSProcedure
		.input(remindersCreateSchema)
		.mutation(async ({ ctx, input }) => {
			const { id: webhookId } = await ctx.db.webhooks.findFirstOrThrow({
				select: {
					id: true,
				},
				where: {
					discord_channel_id: input.channel_id,
				},
			})
			const { id: reminderId } = await ctx.db.reminders.create({
				data: {
					time: input.time,
					reminder_message: input.reminder_message,
					channel_id: input.channel_id,
					user_id: ctx.userDiscordProviderId,
					webhook_id: webhookId,
				},
				select: {
					id: true,
				},
			})

			return reminderId
		}),
})

export const reminderRouter = createTRPCRouter({
	get,
	patch,
	delete: deleteRouter,
	post,
})