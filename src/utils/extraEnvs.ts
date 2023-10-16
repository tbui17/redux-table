/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { config } from "dotenv"
import envs from "runtimeEnvs.json"
import { z } from "zod"

config()

/**
 * @template T
 * @param {T} zodSchema
 * @returns {{envZodValidators: { [K in keyof typeof envs]?: T }, envProcessStrings: { [K in keyof typeof envs]?: string }}}
 */
function createEnvProperties(zodSchema) {
	const envZodValidators = {}
	const envProcessStrings = {}

	for (const key of Object.keys(envs)) {
		envZodValidators[key] = zodSchema
		envProcessStrings[key] = process.env[key]
	}

	return {
		envZodValidators,
		envProcessStrings,
	}
}

export default createEnvProperties(z.string())
