import { PrismaClient } from "@prisma/client"

function findDuplicates<T extends { id: number }>(data: T[]) {
	const ids = new Set<string | number>()
	const duplicates = new Set<string | number>()
	for (const item of data) {
		if (ids.has(item.id)) {
			duplicates.add(item.id)
		} else {
			ids.add(item.id)
		}
	}
	return duplicates
}

async function findNotExistentChannelId<T extends { channel_id: string } & Record<string, any>>(
	data: T[]
) {
	const prisma = new PrismaClient()
	const ids = await prisma.discord_channels
		.findMany({ select: { id: true } })
		.then((res) => res.map((obj) => obj.id))
	for (const item of data) {
		if (!ids.includes(item.channel_id)) {
			const chosen = pickRandomItem(ids)
			item.channel_id = chosen
		}
	}
	console.log(data)
}

function pickRandomItem(data: any[]) {
	return data[Math.floor(Math.random() * data.length)]
}

async function main() {}
void main()
