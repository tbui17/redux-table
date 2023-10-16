import { ModeEdit } from "@mui/icons-material"
import { Button, type ButtonProps } from "@mui/material"

type EditButtonProps = ButtonProps & { onClick: () => void }

export const EditButton: React.FC<EditButtonProps> = ({ onClick, ...rest }) => {
	return (
		<Button
			variant="outlined"
			title="EDIT"
			name="EDIT"
			onClick={onClick}
			startIcon={<ModeEdit />}
			{...rest}
		>
			Edit
		</Button>
	)
}
