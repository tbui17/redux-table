"use client"
import React from "react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { type GetReminderOutputNotNull } from "../../../types/router"
import { useDeleteDialog, useSelectedEditItem } from "../../../hooks/tableHooks"

export const DeleteDialog = () => {
	const item = useSelectedEditItem()

	if (!item) {
		return null
	}

	return <DeleteDialogImpl item={item} />
}

function DeleteDialogImpl({ item }: { item: GetReminderOutputNotNull }) {
	const { cancelDelete, deleteDialogShouldBeVisible, deleteItem } = useDeleteDialog()

	return (
		<Dialog
			visible={deleteDialogShouldBeVisible}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header="Confirm"
			modal
			footer={
				<>
					<Button label="No" icon="pi pi-times" outlined onClick={cancelDelete} />
					<Button
						label="Yes"
						icon="pi pi-check"
						severity="danger"
						onClick={() => {
							deleteItem(item)
						}}
					/>
				</>
			}
			onHide={cancelDelete}
		>
			<div className="confirmation-content">
				<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />

				<span>Are you sure you want to delete this item?</span>
			</div>
		</Dialog>
	)
}
