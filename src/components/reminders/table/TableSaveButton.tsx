"use client"
import React from "react"
import { Button, type ButtonProps } from "primereact/button"

export const TableSaveButton: React.FC<ButtonProps> = (props) => (
	<Button label="Save" icon="pi pi-check" {...props} />
)
