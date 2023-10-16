import { zodResolver } from "@hookform/resolvers/zod"
import { FormContainer } from "react-hook-form-mui"
import {
	type ReminderUpdateFormData,
	remindersUpdateFormSchema,
} from "../../models/reminder-frontend"

import { FormProvider } from "react-hook-form"

import { type GetReminderOutputNotNull } from "../../types/router"

import { createDefaultReminderFieldValues } from "../../lib/createDefaultReminderFieldValues"

import { ReminderDataContextProvider } from "../../contexts/reminderDataContext"
import { reminderFormConfigs, useReminderForm } from "../../hooks/useReminderForm"
import React, { type ReactNode, ReactPropTypes, memo } from "react"
import { type WrappedComponent, type PropsAreEqual, type HocReturn } from "../../types/types"
import { BoxProps } from "@mui/system"

function ReminderFormProviderMUI({
	children,
}: {
	children: React.ReactNode
	defaultValues: ReminderUpdateFormData
}) {
	return <FormContainer {...reminderFormConfigs}>{children}</FormContainer>
}

export type ReminderDialogFormProviderProps = {
	children: React.ReactNode
	defaultValues?: ReminderUpdateFormData
	data: GetReminderOutputNotNull
}

export function ReminderDialogFormProvider({
	children,
	defaultValues = createDefaultReminderFieldValues(),
	data,
}: ReminderDialogFormProviderProps) {
	return (
		<ReminderDataContextProvider initialValues={data}>
			<ReminderFormProviderMUI defaultValues={defaultValues}>
				{children}
			</ReminderFormProviderMUI>
		</ReminderDataContextProvider>
	)
}

export function ReminderFormProvider({
	children,
	defaultValues,
}: {
	children: React.ReactNode
	defaultValues: ReminderUpdateFormData
}) {
	const form = useReminderForm({
		defaultValues,
	})
	return <FormProvider {...form}>{children}</FormProvider>
}

// export function withReminderFormProvider<P extends object>(
// 	Component: React.ComponentType<P>,
// 	defaultValues: ReminderUpdateFormData = createDefaultReminderFieldValues()
// ) {
// 	return function WithReminderFormProvider(props: P) {
// 		return (
// 			<ReminderFormProvider defaultValues={defaultValues}>
// 				<Component {...props} />
// 			</ReminderFormProvider>
// 		)
// 	}
// }

export const withReminderFormProvider = <P extends object>(
	Component: WrappedComponent<P>,
	propsAreEqual?: PropsAreEqual<P> | false,
	defaultValues: ReminderUpdateFormData = createDefaultReminderFieldValues(),

	componentName = Component.displayName ?? Component.name
): HocReturn<P> => {
	function WithReminderFormProvider(props: P) {
		return (
			<ReminderFormProvider defaultValues={defaultValues}>
				<Component {...props} />
			</ReminderFormProvider>
		)
	}

	WithReminderFormProvider.displayName = `withHoC(${componentName})`

	const wrappedComponent =
		propsAreEqual === false
			? WithReminderFormProvider
			: memo(WithReminderFormProvider, propsAreEqual)

	return wrappedComponent as typeof WithReminderFormProvider
}

