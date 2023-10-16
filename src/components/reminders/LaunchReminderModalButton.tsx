import { type GetReminderOutputNotNull } from "../../types/router"

import ReminderEditModal from "./ReminderEditModal"

import { ReminderDialogFormProvider } from "../../providers/reminderFormProvider/ReminderFormProvider"

import { useState } from "react"

import React from "react"
import { EditButton } from "../interactions/EditButton"
import { CreateButton } from "../interactions/CreateButton"

type Props = {
	data: GetReminderOutputNotNull
	type: "create" | "update"
}

const useReminderModal = () => {
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	return { open, handleOpen, handleClose }
}

function LaunchReminderModalButton({ data, type }: Props) {
	const { open, handleOpen, handleClose } = useReminderModal()

	const ActionButton = type === "update" ? EditButton : CreateButton

	return (
		<>
			<ActionButton onClick={handleOpen} />
			<ReminderDialogFormProvider data={data}>
				<ReminderEditModal open={open} type={type} data={data} onClose={handleClose} />
			</ReminderDialogFormProvider>
		</>
	)
}

export default LaunchReminderModalButton
