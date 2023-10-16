import { type Providers } from "../../types/auth"
import { Prisma } from "@prisma/client"

import { TransactionException } from "transaction-exception"

const extendUser = Prisma.defineExtension((prisma) => {
	return prisma.$extends({
		model: {
			account: {
				async authenticateRLS(
					userId: string,
					providerAccountId: string,
					provider: Providers
				) {
					const res = await prisma.account.findFirst({
						where: {
							userId,
							provider,
						},
						select: {
							providerAccountId: true,
						},
					})
					if (!res) {
						return new TransactionException({
							status: 404,
							message:
								"User does not have registered account or does not have an account registered with that provider.",
						})
					}
					if (res.providerAccountId !== providerAccountId) {
						return new TransactionException({
							status: 403,
							message:
								"User is not authorized to access the resource belonging to that provider account.",
						})
					}
					return true
				},
				async getUserProviderAccountId(userId: string, provider: Providers) {
					const res = await prisma.account.findFirst({
						where: {
							userId,
							provider,
						},
						select: {
							providerAccountId: true,
						},
					})
					if (!res) {
						return new TransactionException({
							status: 404,
							message:
								"User does not have registered account or does not have an account registered with that provider.",
						})
					}
					return res.providerAccountId
				},
			},
		},
	})
})
export default extendUser
