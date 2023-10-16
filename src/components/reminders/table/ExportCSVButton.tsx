"use client"
import React from "react"
import { Button } from "primereact/button"

export function ExportCSVButton({ exportCSV }: { exportCSV: () => void }) {
	return (
		<Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
	)
}
