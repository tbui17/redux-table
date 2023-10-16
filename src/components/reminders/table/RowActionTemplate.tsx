import { type GetReminderOutputNotNull } from "../../../types/router"
import { TableDeleteButton } from "./TableConfirmDeleteButton"
import { TableEditButton } from "./TableEditButton"

const RowActionTemplate = (rowData: GetReminderOutputNotNull) => {
	return (
		<>
			<TableEditButton rowData={rowData} />
			<TableDeleteButton rowData={rowData} />
		</>
	)
}

export default RowActionTemplate
