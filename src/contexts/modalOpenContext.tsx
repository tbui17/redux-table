import { contextFactory } from "./contextFactory"

import { useReducer } from "react"
type StateSetter = (value: "OPEN" | "CLOSE") => void

const reducer = (state: boolean, action: "OPEN" | "CLOSE"): boolean => {
	switch (action) {
		case "OPEN":
			return true
		case "CLOSE":
			return false
		default:
			return state
	}
}

function useStateReducer(initialValue: boolean): [boolean, StateSetter] {
	const [state, dispatch] = useReducer(reducer, initialValue)

	const setState: StateSetter = (value: "OPEN" | "CLOSE") => {
		dispatch(value)
	}

	return [state, setState]
}

const ctx = contextFactory<[boolean, StateSetter]>(undefined, "ReminderModalOpenState")

export const useReminderModalOpenStateContext = ctx.useHook

export const ReminderModalOpenStateProvider = ({ children }: { children: React.ReactNode }) => {
	const state = useStateReducer(false)
	return (
		<>
			<ctx.Provider value={state}>{children}</ctx.Provider>
		</>
	)
}
