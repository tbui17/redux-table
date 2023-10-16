import { AddCircle } from "@mui/icons-material"
import { Button, type ButtonProps } from "@mui/material"

type CreateButtonProps = { onClick: () => void } & ButtonProps

export const CreateButton = ({ onClick, ...rest }: CreateButtonProps) => {
	return (
		<Button
			variant="outlined"
			title="CREATE"
			name="CREATE"
			onClick={onClick}
			startIcon={<AddCircle />}
			{...rest}
		>
			Create
		</Button>
	)
}
