"use client"
import React from "react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"

import { useMultipleDeleteDialog } from "../../../hooks/tableHooks"

export function DeleteMultipleDialog() {
	const { cancelDelete, multipleDeleteDialogShouldBeVisible, onDelete } =
		useMultipleDeleteDialog()
	return (
		<Dialog
			visible={multipleDeleteDialogShouldBeVisible}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header="Confirm"
			modal
			footer={
				<React.Fragment>
					<Button label="No" icon="pi pi-times" outlined onClick={cancelDelete} />
					<Button label="Yes" icon="pi pi-check" severity="danger" onClick={onDelete} />
				</React.Fragment>
			}
			onHide={cancelDelete}
		>
			<div className="confirmation-content">
				<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
				{<span>Are you sure you want to delete the selected items?</span>}
			</div>
		</Dialog>
	)
}
