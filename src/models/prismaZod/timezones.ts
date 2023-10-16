import * as z from "zod"
import { Completediscord_user, relateddiscord_userSchema, Completediscord_user_duplicate, relateddiscord_user_duplicateSchema } from "./index"

export const timezonesSchema = z.object({
  id: z.bigint(),
  created_at: z.date(),
  label: z.string(),
  description: z.string(),
  emoji: z.string(),
  value: z.string(),
})

export interface Completetimezones extends z.infer<typeof timezonesSchema> {
  discord_user: Completediscord_user[]
  discord_user_duplicate: Completediscord_user_duplicate[]
}

/**
 * relatedtimezonesSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedtimezonesSchema: z.ZodSchema<Completetimezones> = z.lazy(() => timezonesSchema.extend({
  discord_user: relateddiscord_userSchema.array(),
  discord_user_duplicate: relateddiscord_user_duplicateSchema.array(),
}))
