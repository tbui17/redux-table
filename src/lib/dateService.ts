import { DateTime } from "luxon"
import { type USStringDateTime } from "~/types/dates"

type AcceptableDateInputs = Date | DateTime | null | undefined

/**
 * Utility class for handling date conversions.
 */
class DateConverterService {
	constructor(private impl: typeof DateTime) {}

	public convertDate(date: AcceptableDateInputs) {
		const res = this.resolveInput(date)
		return res
	}

	/**
	 *
	 * Formats the date as MM/DD/YYYY hh:mm A by default
	 */
	public formatDate(date: AcceptableDateInputs) {
		const res = this.resolveInput(date)
		return res.toFormat("MM/dd/yyyy hh:mm a" as const) as USStringDateTime
	}

	private resolveInput(input: AcceptableDateInputs) {
		if (!input) {
			return this.impl.now()
		}
		if (input instanceof Date) {
			return this.impl.fromJSDate(input)
		}

		return input
	}
}

export const dateConverter = new DateConverterService(DateTime)
