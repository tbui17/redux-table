"use client"
import { classNames } from "primereact/utils"

export const FormLabel = ({
	labelForField,
	labelDisplay,
	className,
}: {
	labelForField: string
	labelDisplay: string
	className?: string
}) => (
	<label htmlFor={labelForField} className={classNames("font-bold", className)}>
		{labelDisplay}
	</label>
)
