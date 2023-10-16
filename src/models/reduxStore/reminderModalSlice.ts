import { type PayloadAction, createSlice, createSelector } from "@reduxjs/toolkit"
import { type GetReminderOutputNotNull } from "../../types/router"
import { createDefaultReminderFieldValues } from "../../providers/reminderFormProvider"

type ReminderModalState = {
	open: boolean
	type: "create" | "update"
	data: GetReminderOutputNotNull
	initialFormData: ReturnType<typeof createDefaultReminderFieldValues>
}

const initialState: ReminderModalState = {
	open: false,
	type: "create",
	data: {} as GetReminderOutputNotNull,
	initialFormData: createDefaultReminderFieldValues(),
}

export const reminderModalSlice = createSlice({
	name: "reminderModal",
	initialState,
	reducers: {
		init: (s, a: PayloadAction<GetReminderOutputNotNull>) => {
			s.data = a.payload
		},
		openModal: (s) => {
			s.open = true
		},
		closeModal: (s) => {
			s.open = false
		},
		startEditing: (s) => {
			s.open = true
			s.type = "update"
			s.initialFormData = createDefaultReminderFieldValues(s.data)
		},
		startCreating: (s) => {
			openModal()
			s.type = "create"
			s.initialFormData = createDefaultReminderFieldValues()
		},
	},
})

const selector = (state: ReminderModalState) => state

export const selectReminderModalState = createSelector(selector, (s) => s)

export const { openModal, closeModal, startEditing } = reminderModalSlice.actions
export default reminderModalSlice.reducer
