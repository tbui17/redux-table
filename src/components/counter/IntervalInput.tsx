import { useCounterStore } from "../../models/counterStore/counter"

export default function IntervalInput() {
	const interval = useCounterStore((s) => s.interval)
	const setInterval = useCounterStore((s) => s.setInterval)

	return (
		<>
			<input
				type="number"
				data-testid="interval-input"
				className="block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				value={interval}
				title="Interval Input"
				onChange={(e) => {
					const ans = parseInt(e.target.value)
					setInterval(isNaN(ans) ? 0 : ans)
				}}
			/>
		</>
	)
}
