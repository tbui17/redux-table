"use client"
import React from "react"
import { Button } from "primereact/button"
import { type GetReminderOutputNotNull } from "../../../types/router"
import { useConfirmDelete } from "../../../hooks/tableHooks"

export const TableDeleteButton: React.FC<{
	rowData: GetReminderOutputNotNull
}> = ({ rowData }) => {
	const confirmDeleteProduct = useConfirmDelete(rowData)
	return (
		<Button
			icon="pi pi-trash"
			rounded
			outlined
			severity="danger"
			onClick={() => confirmDeleteProduct()}
		/>
	)
}
