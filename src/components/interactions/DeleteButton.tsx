import { Delete } from "@mui/icons-material"
import { Button, type ButtonProps } from "@mui/material"
import React from "react"

const DeleteButton: React.FC<
	{
		onDeleteAction: () => void
	} & ButtonProps
> = ({ onDeleteAction }) => (
	<Button
		title="delete"
		onClick={onDeleteAction}
		variant="outlined"
		color="error"
		startIcon={<Delete />}
	>
		Delete
	</Button>
)

export default DeleteButton
