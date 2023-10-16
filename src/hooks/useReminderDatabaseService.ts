import { api } from "../utils/api"

const refetchOnWindowFocus = false

const useReminderInvalidate = () => {
	const utils = api.useContext()
	return () => {
		void utils.reminders.get.invalidate()
	}
}

export const useReminderMutations = () => {
	const onSuccess = useReminderInvalidate()

	return {
		createReminder: api.reminders.post.createReminder.useMutation({
			onSuccess,
		}),
		updateReminder: api.reminders.patch.updateReminder.useMutation({
			onSuccess,
		}),
		deleteReminder: api.reminders.delete.deleteReminder.useMutation({
			onSuccess,
		}),
		deleteReminders: api.reminders.delete.deleteReminders.useMutation({
			onSuccess,
		}),
	}
}

export function useGetChannels() {
	return api.discordRouter.getGuildsAndTextBasedChannelsOfUser.useQuery(undefined, {
		refetchOnWindowFocus,
	}).data
}

export function useGetReminders(id: number[]) {
	return api.reminders.get.getReminders.useQuery(id, {
		refetchOnWindowFocus,
	})
}

export function useGetReminder(id: number) {
	return api.reminders.get.getReminder.useQuery(id, {
		refetchOnWindowFocus,
	})
}

export function useGetAllReminders() {
	return api.reminders.get.getAllReminders.useQuery(undefined, {
		refetchOnWindowFocus,
	})
}

export function useGetReminderFormDefaults(id: number) {
	return useGetReminder(id)
}