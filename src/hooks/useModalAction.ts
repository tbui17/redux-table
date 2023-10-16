import { useFormContext } from "react-hook-form"
import { type ReminderUpdateFormData } from "../models/reminder-frontend"
import { useReminderMutations } from "./useReminderDatabaseService"

import { useCallback } from "react"

export function useModalAction(onClose: () => void, id: number) {
	const { deleteReminder, createReminder, updateReminder } = useReminderMutations()
	const form = useFormContext<ReminderUpdateFormData>()
	const { handleSubmit, reset } = form

	const statuses = {
		delete: deleteReminder.status,
		create: createReminder.status,
		update: updateReminder.status,
	}

	const anyLoading = Object.values(statuses).some((status) => status === "loading")

	const onDelete = () => {
		onClose()
		deleteReminder.mutate(id)
	}

	const onEdit = handleSubmit((data: ReminderUpdateFormData) => {
		onClose()
		updateReminder.mutate({
			...data,
			id,
		})
	})

	const onCreate = handleSubmit((data: ReminderUpdateFormData) => {
		onClose()
		createReminder.mutate(data)
	})

	const onCancel = () => {
		onClose()
		reset()
	}

	const getSubmitAction = useCallback(
		(type: "create" | "update") => {
			return type === "create" ? onCreate : onEdit
		},
		[onCreate, onEdit]
	)

	return {
		form,
		anyLoading,
		statuses,
		onDelete,
		onEdit,
		onCreate,
		onCancel,
		getSubmitAction,
	}
}
