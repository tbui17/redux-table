import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type ICounter = {
	count: number
	interval: number
	add: () => void
	subtract: () => void
	setInterval: (qty: number | string) => void
}

export const useCounterStore = create(
	immer<ICounter>((set) => ({
		count: 0,
		interval: 1,
		add: () =>
			set((state) => {
				state.count += state.interval
			}),
		subtract: () =>
			set((state) => {
				state.count -= state.interval
			}),
		setInterval: (qty) =>
			set((state) => {
				qty = typeof qty === "string" ? parseInt(qty) : qty
				qty = isNaN(qty) ? 1 : qty
				state.interval = qty
			}),
	}))
)


