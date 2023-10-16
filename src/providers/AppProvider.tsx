"use client"
import {
	type Components,
	ThemeProvider,
	createTheme,
	responsiveFontSizes,
} from "@mui/material/styles"

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { type ReactNode } from "react"
import CssBaseline from "@mui/material/CssBaseline"

declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		delete: true
	}
}

const defaultComponentProps: Components = {
	MuiStack: {
		defaultProps: {
			spacing: 4,
		},
	},
	MuiTextField: {
		defaultProps: {
			size: "small",
			margin: "dense",
		},
	},
	MuiButton: {
		variants: [
			{
				props: { variant: "delete" },
				style: {
					color: "#fff",
					backgroundColor: "#f44336",
					outline: "none",
				},
			},
		],
	},
}

let darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	components: defaultComponentProps,
})
darkTheme = responsiveFontSizes(darkTheme)

function MuiProvider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
		</ThemeProvider>
	)
}

export default function AppProvider({ children }: { children: ReactNode }) {
	return (
		<>
			<MuiProvider>{children}</MuiProvider>
		</>
	)
}
