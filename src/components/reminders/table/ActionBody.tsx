"use client"
import { Button } from "primereact/button"
import {
	useLaunchBeginCreateNewItemDialog,
	useLaunchMultipleDeleteDialog,
} from "../../../hooks/tableHooks"

export const LeftToolbar = () => {
	const openDialog = useLaunchBeginCreateNewItemDialog()

	const { deleteMultiple, shouldDisableDeleteButton } = useLaunchMultipleDeleteDialog()

	return (
		<div className="flex flex-wrap gap-2">
			<Button label="New" icon="pi pi-plus" severity="success" onClick={openDialog} />
			<Button
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				onClick={deleteMultiple}
				disabled={shouldDisableDeleteButton}
			/>
		</div>
	)
}
