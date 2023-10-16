import React, { useState } from "react"

import { DataView } from "primereact/dataview"



import { Dropdown, type DropdownChangeEvent } from "primereact/dropdown"

import "primereact/resources/primereact.min.css"

import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import { PrimeReactProvider } from "primereact/api"
import { type GetReminderOutputNotNull } from "../../types/router"
const sortOptions = [
	{ label: "id descending", value: "!id" },
	{ label: "id ascending", value: "id" },
]

type ReminderDataViewProps = {
	itemTemplate: React.ComponentProps<typeof DataView>["itemTemplate"]
	data: GetReminderOutputNotNull[]
}

export default function ReminderDataView({ itemTemplate, data }: ReminderDataViewProps) {
	const [sortKey, setSortKey] = useState("")
	const [sortOrder, setSortOrder] = useState<0 | 1 | -1>(0)
	const [sortField, setSortField] = useState("")
	const onSortChange = (event: DropdownChangeEvent) => {
		const value = event.value

		if (value.indexOf("!") === 0) {
			setSortOrder(-1)
			setSortField(value.substring(1, value.length))
			setSortKey(value)
		} else {
			setSortOrder(1)
			setSortField(value)
			setSortKey(value)
		}
	}

	return (
		<PrimeReactProvider>
			<div className="col-12">
				<Dropdown
					options={sortOptions}
					value={sortKey}
					optionLabel="label"
					placeholder="Sort by..."
					onChange={onSortChange}
					className="sm:w-14rem mb-4 w-full"
				/>
				<DataView
					value={data}
					itemTemplate={itemTemplate}
					paginator
					rows={10}
					sortField={sortField}
					sortOrder={sortOrder}
				/>
			</div>
		</PrimeReactProvider>
	)
}
