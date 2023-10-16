import { createSelector, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { type GetReminderOutput, type GetReminderOutputNotNull } from "../../types/router"
import { type RootState } from "./store"
import { z } from "zod"

interface InitialState {
	editDialogIsOpen: boolean
	deleteSingleDialogIsOpen: boolean
	deleteMultipleDialogIsOpen: boolean
	selectedEditItem: GetReminderOutputNotNull
	selectedTableRows: GetReminderOutputNotNull[]
	fullSearchTextInputValue: string
}

const emptyItem: GetReminderOutputNotNull = {
	discord_channels: {
		discord_guilds: {
			name: "",
		},
		id: "",
		name: "",
	},
	id: 0,
	channel_id: "",
	reminder_message: "",
	time: new Date(),
}

const initialState: InitialState = {
	editDialogIsOpen: false,
	deleteSingleDialogIsOpen: false,
	deleteMultipleDialogIsOpen: false,
	selectedEditItem: emptyItem,
	selectedTableRows: [],
	fullSearchTextInputValue: "",
}

const tableDialogSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		reset: () => {
			return initialState
		},

		closeAllDialogsAndUnselectAll: (state) => {
			state.selectedTableRows = []
			state.selectedEditItem = emptyItem
			state.editDialogIsOpen = false
			state.deleteSingleDialogIsOpen = false
			state.deleteMultipleDialogIsOpen = false
		},

		beginCreateNewItem: (state) => {
			state.selectedEditItem = initialState.selectedEditItem
			state.editDialogIsOpen = true
		},

		beginEditItem: (state, action: PayloadAction<GetReminderOutputNotNull>) => {
			if (!action.payload) {
				throw new Error()
			}
			state.selectedEditItem = action.payload
			state.editDialogIsOpen = true
		},

		cancelEditItem: (state) => {
			state.selectedEditItem = emptyItem
			state.editDialogIsOpen = false
		},

		confirmIfWantToDelete: (state, action: PayloadAction<GetReminderOutputNotNull>) => {
			state.selectedEditItem = action.payload
			state.deleteSingleDialogIsOpen = true
		},

		/** Unselects all rows in the table */
		unselectAll: (s) => {
			s.selectedTableRows = []
		},

		closeAllDialogs: (s) => {
			s.editDialogIsOpen = false
			s.deleteSingleDialogIsOpen = false
			s.deleteMultipleDialogIsOpen = false
		},

		//base

		openEditDialog: (state) => {
			state.editDialogIsOpen = true
		},
		closeEditDialog: (state) => {
			state.editDialogIsOpen = false
		},
		openSingleDeleteDialog: (state) => {
			state.deleteSingleDialogIsOpen = true
		},
		closeSingleDeleteDialog: (state) => {
			state.deleteSingleDialogIsOpen = false
		},
		hideDeleteEditDialog: (state) => {
			state.editDialogIsOpen = false
		},
		hideSingleDeleteDialog: (state) => {
			state.deleteSingleDialogIsOpen = false
		},
		openMultipleDeleteDialog: (state) => {
			state.deleteMultipleDialogIsOpen = true
		},
		hideMultipleDeleteDialog: (state) => {
			state.deleteMultipleDialogIsOpen = false
		},
		closeMultipleDeleteDialog: (state) => {
			state.deleteMultipleDialogIsOpen = false
		},
		setEditingItem: (state, action: PayloadAction<GetReminderOutputNotNull>) => {
			state.selectedEditItem = action.payload
		},
		setSelectedTableRows: (state, action: PayloadAction<GetReminderOutputNotNull[]>) => {
			state.selectedTableRows = action.payload
		},
		setFullSearchTextInputValue: (state, action: PayloadAction<string>) => {
			state.fullSearchTextInputValue = action.payload
		},

		// edit dialog fields

		setReminderMessage: (state, action: PayloadAction<string>) => {
			if (!state.selectedEditItem) return
			state.selectedEditItem.reminder_message = action.payload
		},

		setReminderTime: (state, action: PayloadAction<Date>) => {
			if (!state.selectedEditItem) return
			state.selectedEditItem.time = action.payload
		},

		setChannelById: (state, action: PayloadAction<string>) => {
			if (!state.selectedEditItem) return
			state.selectedEditItem.channel_id = action.payload
		},
	},
})

const stateSelector = (s: RootState) => s.tableDialogSlice
export const shouldShowSingleDeleteConfirmationSelector = (s: RootState) =>
	s.tableDialogSlice.deleteSingleDialogIsOpen

export const shouldDisableDeleteButtonSelector = createSelector(
	stateSelector,
	(state) => state.selectedTableRows.length <= 0
)

export const {
	reset,
	beginCreateNewItem,
	beginEditItem,
	confirmIfWantToDelete,
	unselectAll,
	openEditDialog,
	closeEditDialog,
	openSingleDeleteDialog,
	closeSingleDeleteDialog,
	hideDeleteEditDialog,
	hideSingleDeleteDialog,
	openMultipleDeleteDialog,
	hideMultipleDeleteDialog,
	closeMultipleDeleteDialog,
	setEditingItem,
	setSelectedTableRows,
	setFullSearchTextInputValue,
	setReminderMessage,
	setReminderTime,
	closeAllDialogs,
	closeAllDialogsAndUnselectAll,
	cancelEditItem,
	setChannelById,
} = tableDialogSlice.actions

export default tableDialogSlice.reducer
