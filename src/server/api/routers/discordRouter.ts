import { createTRPCRouter, discordUserProcedure } from "~/server/api/trpc"

export const discordRouter = createTRPCRouter({
	getGuildsAndTextBasedChannelsOfUser: discordUserProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.discord_guilds.findMany({
			where: {
				members: {
					some: {
						id: ctx.userProviderId,
					},
				},
			},
			select: {
				discord_channels: {
					select: {
						id: true,
						name: true,
						webhooks: true,
					},
					where: {
						webhooks: {
							some: {},
						},
					},
				},
				id: true,
				name: true,
			},
		})

		return res.flatMap((guild) => {
			return guild.discord_channels!.map((channel) => ({
				id: channel.id,
				name: channel.name,
				label: channel.name,
				guildName: guild.name,
			}))
		})
	}),
})
