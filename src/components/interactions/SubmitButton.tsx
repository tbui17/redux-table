import { FileDownload } from "@mui/icons-material"
import { Button, type ButtonProps } from "@mui/material"
import React from "react"

type Props = ButtonProps & {
	onClick: () => void
}

const SubmitButton = (props: Props) => {
	return (
		<Button
			aria-label="submit"
			onClick={props.onClick}
			startIcon={<FileDownload />}
			variant="outlined"
		>
			SUBMIT
		</Button>
	)
}

export default SubmitButton
