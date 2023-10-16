import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expires: z.date(),
  sessionToken: z.string(),
})

export interface CompleteSession extends z.infer<typeof sessionSchema> {
  user: CompleteUser
}

/**
 * relatedSessionSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedSessionSchema: z.ZodSchema<CompleteSession> = z.lazy(() => sessionSchema.extend({
  user: relatedUserSchema,
}))
