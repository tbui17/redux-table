"use client"
import React from "react"
import { Button, type ButtonProps } from "primereact/button"

export const TableCancelButton = (props: ButtonProps) => {
	return <Button label="Cancel" icon="pi pi-times" outlined {...props} />
}
