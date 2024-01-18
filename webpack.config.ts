import path from 'path'

import { buildWebpack } from './config/build/build.webpack'
import type { TEnvVariables, TBuildMode, TBuildPlatform } from './config/build/types'

require('dotenv').config({ path: './.env' }) // TODO without require dotenv ???

export default (env: TEnvVariables<string>) => {
	const { NODE_ENV, PLATFORM, PORT, ANALYZER, BABEL, MINIMIZE_IMAGE } = process.env

	const envMode = env.mode ?? (NODE_ENV as TBuildMode | undefined)
	const envPlatform = env.platform ?? (PLATFORM as TBuildPlatform | undefined)
	const envPort = Number(env.port ?? PORT)
	const envAnalyzer = ANALYZER ? ANALYZER === 'true' : env.isAnalyzer === 'true'
	const envABabel = BABEL ? BABEL === 'true' : env.isBabel === 'true'
	const envMinimizeImage = MINIMIZE_IMAGE
		? MINIMIZE_IMAGE === 'true'
		: env.isMinimizeImage === 'true'

	return buildWebpack({
		port: envPort || 5050,
		mode: envMode ?? 'development',
		paths: {
			output: path.resolve(__dirname, 'dist'),
			entry: path.resolve(__dirname, 'src', 'index.ts'),
			views: path.resolve(__dirname, 'src', 'views'),
			src: path.resolve(__dirname, 'src'),
		},
		isAnalyzer: envAnalyzer,
		isBabel: envABabel,
		isMinimizeImage: envMinimizeImage,
		isDeploy: env.isDeploy === 'true',
		platform: envPlatform ?? 'desktop',
	})
}
