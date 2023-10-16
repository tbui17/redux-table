import { type UseControllerProps, useController, useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createDefaultReminderFieldValues } from "../lib/createDefaultReminderFieldValues"
import { type ReminderUpdateFormData, remindersUpdateFormSchema } from "../models/reminder-frontend"

export const reminderFormConfigs = {
	resolver: zodResolver(remindersUpdateFormSchema),
	defaultValues: createDefaultReminderFieldValues(),
}

export const useReminderForm = ({
	resolver = reminderFormConfigs.resolver,
	defaultValues = reminderFormConfigs.defaultValues,
} = {}) => {
	return useForm<ReminderUpdateFormData>({
		resolver,
		defaultValues,
	})
}

export const useReminderFormContext = () => {
	return useFormContext<ReminderUpdateFormData>()
}

export const useReminderFormController = (props: UseControllerProps<ReminderUpdateFormData>) => {
	return useController(props)
}
