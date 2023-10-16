import { type Providers } from "./../../types/auth"
import { Prisma } from "@prisma/client"


export function bypassRLS() {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', TRUE)`,
							query(args),
						])
						return result
					},
				},
			},
		})
	)
}

export function withProviderRLS(provider: Providers) {
	return Prisma.defineExtension((prisma) =>
		prisma.$extends({
			query: {
				$allModels: {
					async $allOperations({ args, query }) {
						const [, result] = await prisma.$transaction([
							prisma.$executeRaw`SELECT set_config('app.current_company_id', ${provider}, TRUE)`,
							query(args),
						])
						return result
					},
				},
			},
		})
	)
}

export function withReminderRLS(userId: string) {
	return Prisma.defineExtension((prisma) => {
		
		return prisma.$extends({
			query: {
				reminders: {
					async $allOperations({ args, query }) {
						if ("where" in args && args.where) {
							args.where.user_id = userId
						}

						return query(args)
					},
				},
			},
		})
	})
}
