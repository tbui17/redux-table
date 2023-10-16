import { pick } from "lodash"
import { type GetReminderOutputNotNull } from "../types/router"

/**
 * Creates default reminder field values based on the given data.
 * If data is provided, it picks the relevant fields from it.
 * Otherwise, it returns default values for all fields.
 * @param data Optional data to pick fields from.
 * @returns Default reminder field values.
 */

export function createDefaultReminderFieldValues(data?: GetReminderOutputNotNull) {
	const formFields = ["channel_id", "reminder_message", "time"] as const
	if (data) {
		return pick(data, formFields)
	}
	return {
		time: new Date(),
		reminder_message: "",
		channel_id: "",
	}
}
