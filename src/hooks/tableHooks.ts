import { useMemo } from "react"

import { useModalAction } from "./useModalAction"
import { useGetChannels, useReminderMutations } from "./useReminderDatabaseService"
import { type GetReminderOutputNotNull } from "../types/router"
import { useAppDispatch, useAppSelector } from "../models/reduxStore/store"
import {
	beginCreateNewItem,
	closeAllDialogsAndUnselectAll,
	closeEditDialog,
	confirmIfWantToDelete,
	hideSingleDeleteDialog,
	openEditDialog,
	openMultipleDeleteDialog,
	openSingleDeleteDialog,
	setChannelById,
	setFullSearchTextInputValue,
	setReminderMessage,
	setReminderTime,
	setSelectedTableRows,
	shouldDisableDeleteButtonSelector,
} from "../models/reduxStore/tableDialogSlice"
import { api } from "../utils/api"
import { useFormContext } from "react-hook-form"
import { useReminderFormContext } from "./useReminderForm"

export const useConfirmDelete = (data: GetReminderOutputNotNull) => {
	const dispatch = useAppDispatch()
	const confirmDelete = () => {
		dispatch(confirmIfWantToDelete(data))
	}

	return confirmDelete
}

export const useOnSelectionChange = () => {
	const dispatch = useAppDispatch()

	const onSelectionChange = (selectedRows: GetReminderOutputNotNull[]) => {
		dispatch(setSelectedTableRows(selectedRows))
	}

	return onSelectionChange
}

export const useSetFullSearchTextField = () => {
	const dispatch = useAppDispatch()

	return (text: string) => {
		dispatch(setFullSearchTextInputValue(text))
	}
}

export const useEditDialogModalVisibilityControl = () => {
	const dispatch = useAppDispatch()

	const open = () => {
		dispatch(openEditDialog())
	}

	const close = () => {
		dispatch(closeEditDialog())
	}

	return {
		open,
		close,
	}
}

export const useDeleteDialog = () => {
	const dispatch = useAppDispatch()

	const deleteReminder = useReminderMutations().deleteReminder

	const deleteItem = (item: GetReminderOutputNotNull) => {
		deleteReminder.mutate(item.id)
		dispatch(closeAllDialogsAndUnselectAll())
	}

	const deleteDialogShouldBeVisible = useAppSelector(
		(state) => state.tableDialogSlice.deleteSingleDialogIsOpen
	)

	const cancelDelete = () => {
		dispatch(closeAllDialogsAndUnselectAll())
	}

	return {
		deleteDialogShouldBeVisible,
		cancelDelete,
		deleteItem,
	}
}

export const useSelectedRow = () => {
	return useAppSelector((state) => state.tableDialogSlice.selectedTableRows)
}

export const useDeleteDialogModalVisibilityControl = () => {
	const dispatch = useAppDispatch()

	const open = () => {
		dispatch(openEditDialog())
	}

	const close = () => {
		dispatch(closeEditDialog())
	}

	return {
		open,
		close,
	}
}

export const useLaunchBeginCreateNewItemDialog = () => {
	const dispatch = useAppDispatch()

	const createNewItem = () => {
		dispatch(beginCreateNewItem())
	}

	return createNewItem
}

export const useSelectedEditItem = () => {
	const item = useAppSelector((s) => s.tableDialogSlice.selectedEditItem)
	return item
}

export const useMultipleDeleteDialog = () => {
	const itemsToDelete = useAppSelector((s) => s.tableDialogSlice.selectedTableRows)
	const dispatch = useAppDispatch()
	const deleteMultiple = useReminderMutations().deleteReminders

	const onDelete = () => {
		deleteMultiple.mutate(itemsToDelete.map((i) => i.id))
		dispatch(closeAllDialogsAndUnselectAll())
	}

	const multipleDeleteDialogShouldBeVisible = useAppSelector(
		(s) => s.tableDialogSlice.deleteMultipleDialogIsOpen
	)

	const cancelDelete = () => {
		dispatch(closeAllDialogsAndUnselectAll())
	}

	return {
		onDelete,
		multipleDeleteDialogShouldBeVisible,
		cancelDelete,
	}
}

export const useLaunchMultipleDeleteDialog = () => {
	const dispatch = useAppDispatch()
	const shouldDisableDeleteButton = useAppSelector((s) => shouldDisableDeleteButtonSelector(s))

	const deleteMultiple = () => {
		dispatch(openMultipleDeleteDialog())
	}

	return {
		deleteMultiple,
		shouldDisableDeleteButton,
	}
}

export const useEditDialog = (item: GetReminderOutputNotNull) => {
	const form = useReminderFormContext()
	const { reset, control, handleSubmit } = form
	const dispatch = useAppDispatch()
	const onClose = () => {
		reset()
		dispatch(closeEditDialog())
	}
	const { createReminder, updateReminder } = useReminderMutations()
	const editDialogIsOpen = useAppSelector((s) => s.tableDialogSlice.editDialogIsOpen)

	const onEdit = handleSubmit((data) => {
		updateReminder.mutate({
			...item,
			...data,
		})
		dispatch(closeAllDialogsAndUnselectAll())
	})

	const onCreate = handleSubmit((data) => {
		createReminder.mutate(data)
		dispatch(closeAllDialogsAndUnselectAll())
	})

	const channels = useGetChannels()

	const errors = form.formState.errors

	const reminderOnChange = (value: string) => {
		dispatch(setReminderMessage(value))
	}

	const timeOnChange = (value: Date) => {
		dispatch(setReminderTime(value))
	}

	const channelOnChange = (id: string) => {
		dispatch(setChannelById(id))
	}

	const getChannelById = (id: string) => {
		return channels?.find((channel) => channel.id === id)
	}
	const isEmptyItemSelected = useAppSelector((s) => s.tableDialogSlice.selectedEditItem).id <= 0

	const submitAction = isEmptyItemSelected ? onCreate : onEdit

	return {
		submitAction,
		editDialogIsOpen,
		onClose,
		onCreate,
		control,
		channels,
		form,
		errors,

		reminderOnChange,
		timeOnChange,
		channelOnChange,
		getChannelById,
	}
}
