"use client"
import React from "react"
import { TableCancelButton } from "./TableCancelButton"
import { TableSaveButton } from "./TableSaveButton"

import { useEditDialogModalVisibilityControl } from "../../../hooks/tableHooks"

export function EditDialogFooter() {
	const { close } = useEditDialogModalVisibilityControl()

	return (
		<>
			<TableCancelButton
				onClick={() => {
					close()
				}}
			/>
			<TableSaveButton
				onClick={() => {
					close()
				}}
			/>
		</>
	)
}
