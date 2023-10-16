import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api"

import SuperJSON from "superjson"
import { DateTime } from "luxon"

import AppProvider from "../providers/AppProvider"

import "~/styles/globals.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { Provider } from "react-redux"
import { store } from "../models/reduxStore/store"

SuperJSON.registerCustom<DateTime, string>(
	{
		isApplicable: (v): v is DateTime => DateTime.isDateTime(v),
		serialize: (v) => v.toJSON() ?? "",
		deserialize: (v) => DateTime.fromISO(v),
	},
	"DateTime"
)

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<Provider store={store}>
			<SessionProvider session={session}>
				<AppProvider>
					<Component {...pageProps} />
				</AppProvider>
			</SessionProvider>
		</Provider>
	)
}

export default api.withTRPC(MyApp);
