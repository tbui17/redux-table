"use client"

import "primereact/resources/primereact.min.css"
import "primereact/resources/themes/arya-blue/theme.css"
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import { useRef, type ComponentType } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"

import { EditDialog } from "./EditDialog"
import { withReminderFormProvider } from "../../../providers/reminderFormProvider"

import { type GetReminderOutputNotNull } from "../../../types/router"
import { useGetAllReminders } from "../../../hooks/useReminderDatabaseService"
import { useAtom } from "jotai"
import { atomWithImmer } from "jotai-immer"
import { useAppSelector } from "../../../models/reduxStore/store"
import { LeftToolbar } from "./ActionBody"

import { TableHeader } from "./TableHeader"
import { ExportCSVButton } from "./ExportCSVButton"
import {
	useOnSelectionChange,
	useSelectedEditItem,
	useSelectedRow,
} from "../../../hooks/tableHooks"
import RowActionTemplate from "./RowActionTemplate"
import { DeleteDialog } from "./DeleteDialog"
import { DeleteMultipleDialog } from "./DeleteMultipleDialog"
import { api } from "../../../utils/api"

export default function ReminderTable() {
	const { data } = useGetAllReminders()
	const data2 = data?.map((d) => {
		return {
			...d,
			time: d.time.toLocaleString(),
		}
	}) as typeof data

	return <>{data2 && <Wrapped data={data2} />}</>
}

const Wrapped = withReminderFormProvider(ReminderTable_)

type Props = {
	data: GetReminderOutputNotNull[]
}

const selectedAtom = atomWithImmer<GetReminderOutputNotNull>(
	null as any as GetReminderOutputNotNull
)

export function useSelectedAtom() {
	if (!selectedAtom) {
		throw new Error("selectedAtom was not initialized with an initial value before using it.")
	}
	const [selected, setSelected] = useAtom(selectedAtom)
	return [selected, setSelected] as const
}

export function useSelectedAtomWithInit(initialValue: GetReminderOutputNotNull) {
	const [selected, setSelected] = useSelectedAtom()
	setSelected(initialValue)
	return [selected, setSelected] as const
}

function ReminderTable_({ data }: Props) {
	const onSelectionChange = useOnSelectionChange()
	const selectedRows = useSelectedRow()
	const fullSearchTextInputValue = useAppSelector(
		(state) => state.tableDialogSlice.fullSearchTextInputValue
	)

	const toast = useRef<Toast>(null)
	const dt = useRef<DataTable<GetReminderOutputNotNull[]>>(null)

	const exportCSV = () => {
		dt.current?.exportCSV()
	}

	return (
		<div>
			<Toast ref={toast} />
			<div className="card">
				<Toolbar
					className="mb-4"
					start={LeftToolbar}
					end={<ExportCSVButton exportCSV={exportCSV} />}
				></Toolbar>

				<DataTable
					selectionMode="multiple"
					ref={dt}
					metaKeySelection={true}
					value={data}
					selection={selectedRows}
					onSelectionChange={(e) => {
						if (Array.isArray(e.value)) {
							onSelectionChange(e.value)
						}
					}}
					dataKey="id"
					paginator
					rows={10}
					rowsPerPageOptions={[5, 10, 25]}
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
					globalFilter={fullSearchTextInputValue}
					header={<TableHeader />}
				>
					{/* <Column selectionMode="multiple" exportable={false}></Column> */}
					<Column field="id" header="id" sortable style={{ minWidth: "12rem" }}></Column>
					<Column
						field="reminder_message"
						header="Reminder Message"
						sortable
						style={{ minWidth: "16rem" }}
					></Column>
					<Column
						field="time"
						header="Time"
						sortable
						style={{ minWidth: "16rem" }}
					></Column>

					<Column
						body={RowActionTemplate}
						exportable={false}
						dataType="Date"
						style={{ minWidth: "12rem" }}
					></Column>
				</DataTable>
			</div>

			<EditDialog />

			<DeleteDialog />

			<DeleteMultipleDialog />
		</div>
	)
}

