import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"

import { useFormContext } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import {
	type GetReminderOutputNotNull,
	type GetGuildsAndTextBasedChannelsOfUserOutputSingle,
} from "../../types/router"
import { AutocompleteElement, TextFieldElement } from "react-hook-form-mui"
import { type ReminderUpdateFormData } from "../../models/reminder-frontend"
import { useGetChannels } from "../../hooks/useReminderDatabaseService"

import DeleteButton from "../interactions/DeleteButton"
import SubmitButton from "../interactions/SubmitButton"
import LoadingBackdrop from "../loading/LoadingBackdrop"
import { useModalAction } from "../../hooks/useModalAction"
import { ReminderDateTimePicker } from "./ReminderDateTimePicker"

const DevToolWrapper = () => {
	const { control } = useFormContext()
	return <DevTool control={control} placement="top-right" />
}

interface ReminderEditModalProps {
	type: "create" | "update"
	data: GetReminderOutputNotNull
	open: boolean
	onClose: () => void
}

export default function ReminderEditModal({ type, open, onClose, data }: ReminderEditModalProps) {
	const { channels, findChannel } = useFindChannel()
	const { onCancel, onDelete, getSubmitAction, anyLoading } = useModalAction(onClose, data.id)
	const onSubmit = getSubmitAction(type)
	const groupBy = (opt: GetGuildsAndTextBasedChannelsOfUserOutputSingle) => {
		return findChannel(opt.id) ?? ""
	}

	const title = type === "create" ? "Create Reminder" : "Edit Reminder"

	return (
		<>
			<LoadingBackdrop open={anyLoading} />
			<Dialog open={open} onClose={onCancel}>
				<DialogTitle align="center">{title}</DialogTitle>
				<DialogContent>
					<TextFieldElement<ReminderUpdateFormData>
						name="reminder_message"
						label="Message"
						sx={{
							width: 400,
							maxHeight: 200,
						}}
						multiline
						FormHelperTextProps={{
							sx: { textOverflow: "ellipsis", maxWidth: "100%" },
						}}
						minRows={3}
						maxRows={3}
					/>
					<ReminderDateTimePicker />
					<AutocompleteElement<ReminderUpdateFormData>
						name="channel_id"
						label="Channels"
						options={channels ?? []}
						matchId
						autocompleteProps={{
							groupBy,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<SubmitButton onClick={onSubmit} />
					{type === "update" && <DeleteButton onDeleteAction={onDelete} />}
				</DialogActions>
			</Dialog>
			<DevToolWrapper />
		</>
	)
}

const useFindChannel = () => {
	const channels = useGetChannels()
	const findChannel = (id: string) => {
		return channels?.find((guild) => guild.id === id)?.guildName
	}
	return {
		channels,
		findChannel,
	}
}

