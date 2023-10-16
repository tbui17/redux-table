import { type UseAutocompleteProps } from "@mui/material"

export type DefaultUseAutocompleteProps<T> = UseAutocompleteProps<
	T,
	undefined,
	undefined,
	undefined
>


export type GetArrayItem<T> = T extends Array<infer U> ? U : never

export type ParametersO<T> = T extends (...args: infer U) => any ? U[0] : never

export type ReminderTableProps = {
	title?: string
	modalEditingTitle?: string
}

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

export type PropsAreEqual<P> = (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean

export type WrappedComponent<P> = {
	(props: P): Exclude<React.ReactNode, undefined>
	displayName?: string
}

export type HocReturn<P> = {
	(props: P): React.JSX.Element
	displayName: string
}