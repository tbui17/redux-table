"use client"
import { SessionProvider, useSession } from "next-auth/react"
import AppProvider from "../providers/AppProvider"
import SuperJSON from "superjson"

export default function RootLayout(props: { children: React.ReactNode; session: any }) {
	const { children } = props
	return (
		<SessionProvider>
			<AppProvider>
				<html lang="en">
					<body>{children}</body>
				</html>
			</AppProvider>
		</SessionProvider>
	)
}
