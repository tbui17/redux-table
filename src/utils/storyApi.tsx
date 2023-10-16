/* eslint-disable react/display-name */
import type { PropsWithChildren } from "react"
import { useState } from "react"
import { createTRPCReact, httpBatchLink } from "@trpc/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import superjson from "superjson"

import { type AppRouter } from "~/server/api/root"

// reference: https://stackoverflow.com/questions/75464909/how-to-use-storybook-with-trpc

const getBaseUrl = () => {
	if (typeof window !== "undefined") return "" // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}



export const mockedTrpc = createTRPCReact<AppRouter>()
export const StorybookTrpcProvider = ({ children }: PropsWithChildren) => {
	const reactQueryClient = new QueryClient({ defaultOptions: { queries: { staleTime: Infinity } } })
	const [queryClient] = useState(
		reactQueryClient
	)
	const [trpcClient] = useState(() =>
		mockedTrpc.createClient({
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
			transformer: superjson,
		})
	)
	return (
		<mockedTrpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</mockedTrpc.Provider>
	)
}

type TrpcContext = ReturnType<(typeof mockedTrpc)["useContext"]>

// Hack to be able to access trpcContext
const ActOnTrpcContext = ({
	callback,
	children,
}: PropsWithChildren<{
	callback: (trpcContext: TrpcContext) => void
}>) => {
	const trpcContext = mockedTrpc.useContext()
	callback(trpcContext)
	return <>{children}</>
}

export const withTrpcContext = (callback: (context: TrpcContext) => void) => (Story: React.FC) => (
	<ActOnTrpcContext callback={callback}>
		<Story />
	</ActOnTrpcContext>
)
