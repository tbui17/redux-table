import SuperJSON from "superjson"

import { api } from "~/utils/api"

export default function Home() {
	// const hello = api.example.hello.useQuery({ text: "from tRPC" });
	
	
	
	const { data } = api.example.TESTGETALLREMINDERS.useQuery()
	const html = data?.map((reminder) => {
		return (
			<div key={reminder.id.toString()}>
				<h1>{reminder.reminder_message}</h1>
				<p>{reminder.time.toLocaleDateString()}</p>
				<p>{SuperJSON.stringify(reminder)}</p>
			</div>
		)
	})
	return (
		<>
			<main>{html}</main>
		</>
	)
}

// function AuthShowcase() {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// }
