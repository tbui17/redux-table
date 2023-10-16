"use client"
import { classNames } from "primereact/utils"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import {
	type GetReminderOutputNotNull,
	type GetGuildsAndTextBasedChannelsOfUserOutputSingle,
} from "../../../types/router"

import {
	Controller,
	useController,
	type FieldErrors,
	type FieldValues,
	useFormContext,
} from "react-hook-form"
import { DateTimePicker } from "@mui/x-date-pickers"
import { z } from "zod"
import { Dropdown } from "primereact/dropdown"

import { useEditDialog, useSelectedEditItem } from "../../../hooks/tableHooks"
import { useReminderFormContext, useReminderFormController } from "../../../hooks/useReminderForm"
import { TableCancelButton } from "./TableCancelButton"
import { TableSaveButton } from "./TableSaveButton"
import { FormLabel } from "./FormLabel"
import { InputTextarea } from "primereact/inputtextarea"

import { ReminderUpdateFormData } from "../../../models/reminder-frontend"

const FormErrorMessageHandler = <T extends keyof R, R extends FieldValues>({
	name,
	errors,
}: {
	name: T
	errors: FieldErrors<R>
}) => {
	const msg = errors[name]?.message
	if (!msg) {
		return <small className="p-error">&nbsp;</small>
	}

	if (typeof msg !== "string") {
		return <small className="p-error">&nbsp;</small>
	}
	return <small className="p-error">{msg}</small>
}

export function EditDialog() {
	const item = useSelectedEditItem()

	return <EditDialogImpl item={item} />
}

function EditDialogImpl({ item }: { item: GetReminderOutputNotNull }) {
	const {
		control,
		getChannelById,
		submitAction,
		channels,
		channelOnChange,
		reminderOnChange,
		timeOnChange,
		errors,
		editDialogIsOpen,
		onClose,
	} = useEditDialog(item)

	return (
		<Dialog
			visible={editDialogIsOpen}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header="Reminder Details"
			modal
			className="p-fluid"
			onHide={onClose}
		>
			<form onSubmit={submitAction}>
				<div className="field">
					<label htmlFor="reminder_message" className="font-bold">
						Message
					</label>
					<Controller
						control={control}
						name="reminder_message"
						render={({ field, fieldState }) => {
							return (
								<InputTextarea
									id="reminder_message"
									required
									autoFocus
									rows={3}
									style={{ resize: "none" }}
									className={classNames({
										"p-invalid": fieldState.error,
									})}
									{...field}
									value={item.reminder_message}
									onChange={(e) => {
										field.onChange(e)
										reminderOnChange(e.target.value)
									}}
								/>
							)
						}}
					/>

					<FormErrorMessageHandler name="reminder_message" errors={errors} />
				</div>

				<div className="field">
					<FormLabel labelForField="time" labelDisplay="Time" />
					<Controller
						name="time"
						control={control}
						render={({ field }) => {
							return (
								<>
									<div id={field.name}>
										<DateTimePicker
											{...field}
											onChange={(e) => {
												const ev = z.date().parse(e)

												field.onChange(ev)
												timeOnChange(ev)
											}}
											sx={{
												maxHeight: 200,
											}}
										/>
									</div>
								</>
							)
						}}
					/>
					<FormErrorMessageHandler name="time" errors={errors} />
				</div>

				<div className="field">
					<FormLabel labelForField="channel_id" labelDisplay="Channel" className="mb-2" />
					<Controller
						name="channel_id"
						control={control}
						render={({ field, fieldState }) => {
							const res = getChannelById(item.channel_id)
							return (
								<>
									<Dropdown
										id={field.name}
										value={res}
										optionLabel="label"
										placeholder="Select a channel"
										options={channels}
										focusInputRef={field.ref}
										onChange={(e) => {
											const val: GetGuildsAndTextBasedChannelsOfUserOutputSingle =
												e.value
											field.onChange(val.id)
											channelOnChange(val.id)
										}}
										className={classNames({ "p-invalid": fieldState.error })}
									/>
								</>
							)
						}}
					/>
					<FormErrorMessageHandler name="channel_id" errors={errors} />
				</div>
				<section className="grid pt-4">
					<div className="col-8" />
					<div className="col-4">
						<TableSaveButton type="submit" />
					</div>
				</section>
			</form>
			{/* <div className="field">
				<label className="mb-3 font-bold">Category</label>
			</div> */}
		</Dialog>
	)
}
