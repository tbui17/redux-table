import { createContext, useContext } from "react"

export const contextFactory = <T>(
	initialValue?: T,
	fallbackDisplayName = "NO FALLBACK DISPLAY NAME"
) => {
	const ctx = createContext<T | null>(initialValue ?? null)
	const useHook = () => {
		const ctxValue = useContext(ctx)
		if (!ctxValue) {
			throw new Error(
				`use${ctx.displayName ?? fallbackDisplayName}Context must be used within a ${
					ctx.displayName ?? fallbackDisplayName
				}Provider`
			)
		}
		return ctxValue
	}
	return {
		Provider: ctx.Provider,
		useHook,
	}
}
