import { Typography, Paper, Grid, Divider } from "@mui/material"
import { mockedTrpc } from "../utils/storyApi"
import { indigo } from "@mui/material/colors"

type DataForComponent = {
	label: string
	data: string
}

type Props = {
	input?: string
}

// The component to be showcased
export const MockTrpcIntegratedComponent = ({ input }: Props) => {
	const data = useData(input)

	return (
		<>
			<Paper sx={{ bgcolor: "background.paper" }}>
				<GroupGrid>
					{data.map((item, index) => {
						return <DataItem {...item} key={index} />
					})}
				</GroupGrid>
			</Paper>
		</>
	)
}

function GroupGrid({ children }: { children: React.ReactNode }) {
	return (
		<Grid role="group" container>
			{children}
		</Grid>
	)
}

function DataItem({ label, data }: DataForComponent) {
	const colorProps = {
		color: indigo[900],
	}

	return (
		<>
			<Grid textAlign={"center"}>
				<Typography color="skyblue" sx={{ fontWeight: "bold", minWidth: 60 }} title={label}>
					{label}
				</Typography>
			</Grid>
			<Grid>
				<Divider {...colorProps} orientation="vertical" />
			</Grid>

			<Grid>
				<Typography ml={1.5} title={`${label} data`}>
					{data}
				</Typography>
			</Grid>

			<Grid xs={12}>
				<Divider {...colorProps} />
			</Grid>
		</>
	)
}

function useData(input?: string) {
	if (input === "" || input === undefined || input === null) {
		input = "No input provided to prop"
	}
	const query = mockedTrpc.example.hello.useQuery({ text: "johnny" })
	const query2 = mockedTrpc.reminders.get.getAllReminders.useQuery()
	const query3 = mockedTrpc.example.TESTGETALLREMINDERS.useQuery()

	const data: DataForComponent[] = [
		{
			label: "id",
			data: "1",
		},
		{
			label: "status",
			data: query.status,
		},
		{
			label: "name",
			data: query.data?.greeting ?? "no data",
		},
		{
			label: "data",
			data:
				JSON.stringify(
					query2.data?.map((data) => {
						return {
							...data,
							time: data.time.toLocaleString(),
						}
					})[0]
				) ?? "no data",
		},
		{
			label: "data2",
			data:
				JSON.stringify(query3.data) ??
				"no data because mock was not provided for this query",
		},
		{
			label: "input",
			data: input,
		},
	]
	const result = data.map((item, i) => {
		return {
			...item,
			id: `${i}-${Math.random()}`,
		}
	})
	return result
}
