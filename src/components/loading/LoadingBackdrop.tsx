import { Backdrop, CircularProgress } from "@mui/material"
import React, { type ReactNode, memo, type ReactElement } from "react"
import { createDefaultReminderFieldValues } from "../../lib/createDefaultReminderFieldValues"
import { type ReminderUpdateFormData } from "../../models/reminder-frontend"
import { ReminderFormProvider } from "../../providers/reminderFormProvider"
import { type WrappedComponent, type PropsAreEqual, type HocReturn } from "../../types/types"
import { type FieldValues, type UseFormReturn, useFormContext } from "react-hook-form"
import { api } from "../../utils/api"

type Props = {
	open: boolean
}

const LoadingBackdrop = ({ open }: Props) => {
	return (
		<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
}

export default LoadingBackdrop
