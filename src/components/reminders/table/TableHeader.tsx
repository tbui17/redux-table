"use client"
import React from "react"
import { InputText } from "primereact/inputtext"

import { useSetFullSearchTextField } from "../../../hooks/tableHooks"

export function TableHeader() {
	const handleChange = useSetFullSearchTextField()
	return (
		<div className="align-items-center justify-content-between flex flex-wrap gap-2">
			<h4 className="m-0">Reminders</h4>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<InputText
					type="search"
					placeholder="Search..."
					onInput={(e) => {
						const target = e.target as HTMLInputElement
						handleChange(target.value)
					}}
				/>
			</span>
		</div>
	)
}
