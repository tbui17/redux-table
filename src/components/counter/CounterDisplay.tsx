import Card from "@mui/material/Card"
import { useCounterStore } from "../../models/counterStore/counter"
import Typography from "@mui/material/Typography"
export default function CounterDisplay() {
	const count = useCounterStore((s) => s.count)

	return (
		<Card sx={{ maxWidth: 100 }}>
			<Typography variant="body1" title="Count display" data-testid="count" align="center">
				{count}
			</Typography>
		</Card>
	)
}
