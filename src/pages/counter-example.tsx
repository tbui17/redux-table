import Typography from "@mui/material/Typography"
import CounterButtonInterface from "../components/counter/CounterButtonInterface"
import CounterDisplay from "../components/counter/CounterDisplay"
import IntervalInput from "../components/counter/IntervalInput"
import Grid from "@mui/material/Unstable_Grid2"



export default function CounterExample() {
	return (
		<>
			<Grid container direction="column" spacing={4}>
				<Grid>
					<Typography className="mb-5" variant="h4">
						Interval Input
					</Typography>
					<IntervalInput />
				</Grid>

				<Grid>
					<Typography className="mb-5" variant="h4">
						Buttons
					</Typography>
					<CounterButtonInterface />
				</Grid>

				<Grid>
					<Typography className="mb-5" variant="h4">
						Counter 1
					</Typography>
					<CounterDisplay />
				</Grid>
				<Grid>
					<Typography className="mb-5" variant="h4">
						Counter 2
					</Typography>
					<CounterDisplay />
				</Grid>
			</Grid>
		</>
	)
}
