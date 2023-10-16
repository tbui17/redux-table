import type { Preview } from "@storybook/react"
import React from "react"
import AppProvider from "../src/providers/AppProvider"

// import { createTheme } from "@mui/material"
// import "primereact/resources/primereact.min.css"
// import "primereact/resources/themes/vela-blue/theme.css"
// import "primeflex/primeflex.css"
// import "primeicons/primeicons.css"

// import { blueGrey, cyan, pink } from "@mui/material/colors"
import "../src/styles/globals.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"


const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
}

export default preview
export const decorators = [
	(Story: any) => {
		return (
			<>
				<AppProvider>
					<Story />
				</AppProvider>
			</>
		)
	},
]

// const lightTheme = createTheme({
// 	palette: {
// 		mode: "light",
// 		background: {
// 			default: blueGrey["50"],
// 			paper: blueGrey["100"],
// 		},
// 		text: {
// 			primary: pink[100],
// 		},
// 		primary: {
// 			main: cyan["A200"],
// 		},
// 		secondary: {
// 			main: pink["A400"],
// 		},
// 	},
// })

// const darkTheme = createTheme({
// 	palette: {
// 		common: {
// 			white: "#ffffff",
// 			black: "#000000",
// 		},
// 		mode: "dark",
// 		text: {
// 			primary: pink[100],
// 		},
// 		primary: {
// 			main: pink["A200"],
// 		},
// 		secondary: {
// 			main: cyan["A400"],
// 		},
// 		background: {
// 			default: blueGrey["800"],
// 			paper: blueGrey["700"],
// 		},
// 	},
// })


// const settings2 = [
// 	withThemeFromJSXProvider({
// 		themes: {
// 			dark: darkTheme,
// 			light: lightTheme,
// 		},
// 		defaultTheme: "dark",
// 		Provider: ThemeProvider,
// 		GlobalStyles: CssBaseline,
// 	}),
// 	withThemeByClassName({
// 		themes: {
// 			light: "light",
// 			dark: "dark",
// 		},
// 		defaultTheme: "dark",
// 	}),
// ] as const



// export const globalTypes = {
// 	theme: {
// 		name: "Theme",
// 		title: "Theme",
// 		description: "Theme for your components",
// 		defaultValue: "light",
// 		toolbar: {
// 			icon: "paintbrush",
// 			dynamicTitle: true,
// 			items: [
// 				{ value: "light", left: "☀️", title: "Light mode" },
// 				{ value: "dark", left: "🌙", title: "Dark mode" },
// 			],
// 		},
// 	},
// }
