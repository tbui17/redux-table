import { z } from "zod"
import { remindersSchema } from "./prismaZod"
import { DateTime } from "luxon"

export const luxonSchema = z.custom<DateTime>((val) => DateTime.isDateTime(val))

export const luxonToDatePipeline = luxonSchema.transform((val) => val.toJSDate())

export const dateToLuxonPipeline = z.date().transform((val) => DateTime.fromJSDate(val))

const luxonOrDateSchema = z.union([luxonSchema, z.date()])

export const coerceLuxonSchema = luxonOrDateSchema.transform((val) => {
	if (val instanceof Date) {
		return DateTime.fromJSDate(val)
	}
	return val
})

export const coerceDateSchema = luxonOrDateSchema.transform((val) => {
	if (val instanceof Date) {
		return val
	}
	return val.toJSDate()
})

const coerceNumberIdSchema = z.union([z.string(), z.bigint(), z.number()]).transform((val) => {
	if (typeof val === "bigint") {
		return parseInt(val.toString())
	}
	if (typeof val === "string") {
		return parseInt(val)
	}
	return val
})

export const remindersFrontendSchema = remindersSchema.extend({
	id: coerceNumberIdSchema,
	time: coerceDateSchema,
	channel_name: z.string(),
})

export const reminderFrontendToBackendPipeline = remindersFrontendSchema.transform((val) => {
	return {
		...val,
		// time: val.time.toJSDate(),
	}
})
const _remindersFrontEndSchemaCoerceArray = remindersFrontendSchema
	.strict()
	.array()
	.transform((val) => {
		if (val === undefined) {
			return []
		}
		return val
	})

export const remindersFrontEndSchemaCoerceArray = z.preprocess((val) => {
	if (val === undefined) {
		return []
	}
	return val
}, _remindersFrontEndSchemaCoerceArray)

export const remindersUpdateFormSchema = z.object({
	time: z
		.date()
		.max(new Date(99_999, 1, 1))
		.min(new Date(1, 0, 1)),
	reminder_message: z.string().transform((val, ctx) => {
		if (val.length > 500) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Message must be less than 500 characters.",
			})
		}
		if (val.length <= 0) {
			return "Ping!"
		}
		return val
	}),
	channel_id: z.string().min(1).max(500),
})

export type ReminderUpdateFormData = z.infer<typeof remindersUpdateFormSchema>

export const remindersUpdateSchema = remindersSchema
	.pick({
		time: true,
		reminder_message: true,
		id: true,
		channel_id: true,
	})
	.refine((val) => remindersUpdateFormSchema.safeParse(val).success)

export const remindersCreateSchema = remindersSchema.pick({
	time: true,
	reminder_message: true,
	channel_id: true,
})

export const reminderFormKeySchema = remindersUpdateFormSchema.keyof()

export const getGuildsAndTextBasedChannelsOfUserOutputSingleSchema = z.object({
	id: z.string(),
	name: z.string(),
	label: z.string(),
	guildName: z.string(),
})
