import { signIn, signOut, useSession } from "next-auth/react"
import { api } from "../utils/api"

function LoginData() {
	const { data: sessionData } = useSession()
	return (
		sessionData && <div data-testid="user-session" data-username={sessionData.user.name}></div>
	)
}

export default function SignIn() {
	const { data: sessionData } = useSession()

	const { data: secretMessage } = api.example.getSecretMessage.useQuery(
		undefined, // no input
		{ enabled: sessionData?.user !== undefined }
	)

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<LoginData />
			<p className="text-center text-2xl text-white" id="logged-in">
				{sessionData && <span>Logged in as {sessionData.user?.name}</span>}
				{secretMessage && <span> - {secretMessage}</span>}
			</p>
			<button
				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
				onClick={sessionData ? () => void signOut() : () => void signIn()}
			>
				{sessionData ? "Sign out" : "Sign in"}
			</button>
		</div>
	)
}
