import { type GetReminderOutputNotNull } from "../../types/router"

import ReminderEditModal from "./ReminderEditModal"

import { ReminderDialogFormProvider } from "../../providers/reminderFormProvider/ReminderFormProvider"

import { useState } from "react"
import { EditButton } from "../interactions/EditButton"
import { CreateButton } from "../interactions/CreateButton"

type Props = { data: GetReminderOutputNotNull }
export function ReminderCrudApp({ data }: Props) {
	const [openCreate, setOpenCreate] = useState(false)
	const [openEdit, setOpenEdit] = useState(false)

	return (
		<>
			<CreateButton
				onClick={() => {
					setOpenCreate(true)
				}}
			/>
			<EditButton
				onClick={() => {
					setOpenEdit(true)
				}}
			/>
			<ReminderDialogFormProvider data={data}>
				<ReminderEditModal
					type={"create"}
					open={openCreate}
					data={data}
					onClose={() => setOpenCreate(false)}
				/>
			</ReminderDialogFormProvider>
			<ReminderDialogFormProvider data={data}>
				<ReminderEditModal
					type={"update"}
					open={openEdit}
					data={data}
					onClose={() => setOpenEdit(false)}
				/>
			</ReminderDialogFormProvider>
		</>
	)
}
