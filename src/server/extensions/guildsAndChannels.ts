import { Prisma } from "@prisma/client"

export default Prisma.defineExtension((prisma) => {
	return prisma.$extends({
		//TODO: Make package out of extensions
		name: "channelGuildExtension",
		model: {
			discord_channels: {
				async getGuildsAndTextBasedChannelsOfUser(userId: string) {
					return await prisma.discord_guilds.findMany({
						where: {
							members: {
								some: {
									id: userId,
								},
							},
						},
						select: {
							discord_channels: {
								select: {
									id: true,
									name: true,
								},
							},
							id: true,
							name: true,
							_count: {
								select: {
									discord_channels: true,
								},
							},
						},
					})
				},
			},
		},
	})
})
