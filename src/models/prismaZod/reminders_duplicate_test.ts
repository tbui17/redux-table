import * as z from "zod"
import { Completediscord_channels, relateddiscord_channelsSchema, Completediscord_user, relateddiscord_userSchema, Completewebhooks, relatedwebhooksSchema } from "./index"

export const reminders_duplicate_testSchema = z.object({
  created_at: z.date(),
  user_id: z.string(),
  channel_id: z.string(),
  reminder_message: z.string(),
  webhook_id: z.string(),
  id: z.number().int(),
  time: z.date(),
})

export interface Completereminders_duplicate_test extends z.infer<typeof reminders_duplicate_testSchema> {
  discord_channels: Completediscord_channels
  discord_user: Completediscord_user
  webhooks: Completewebhooks
}

/**
 * relatedreminders_duplicate_testSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedreminders_duplicate_testSchema: z.ZodSchema<Completereminders_duplicate_test> = z.lazy(() => reminders_duplicate_testSchema.extend({
  discord_channels: relateddiscord_channelsSchema,
  discord_user: relateddiscord_userSchema,
  webhooks: relatedwebhooksSchema,
}))
