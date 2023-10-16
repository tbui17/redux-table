"use client"
import React from "react"
import { Button } from "primereact/button"
import { type GetReminderOutputNotNull } from "../../../types/router"
import { useAppDispatch } from "../../../models/reduxStore/store"
import { beginEditItem } from "../../../models/reduxStore/tableDialogSlice"
import { useReminderFormContext } from "../../../hooks/useReminderForm"

export const TableEditButton: React.FC<{
	rowData: GetReminderOutputNotNull
}> = ({ rowData }) => {
	const dispatch = useAppDispatch()
	const form = useReminderFormContext()
	const editProduct = () => {
		form.reset({
			time: new Date(rowData.time),
			channel_id: rowData.channel_id,
			reminder_message: rowData.reminder_message,
		})

		dispatch(beginEditItem(rowData))
	}

	return (
		<Button
			icon="pi pi-pencil"
			rounded
			outlined
			className="mr-2"
			onClick={() => editProduct()}
		/>
	)
}
