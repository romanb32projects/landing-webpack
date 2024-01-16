import path from 'path'

import { buildWebpack } from './config/build/build.webpack'
import type { TEnvVariables, TBuildMode, TBuildPlatform } from './config/build/types'

require('dotenv').config({ path: './.env' }) // TODO without require dotenv ???

export default (env: TEnvVariables) => {
	const { NODE_ENV, PLATFORM, PORT, ANALYZER, BABEL } = process.env

	const envMode = env.mode ?? (NODE_ENV as TBuildMode | undefined)
	const envPlatform = env.platform ?? (PLATFORM as TBuildPlatform | undefined)
	const envPort = Number(env.port ?? PORT)
	const envAnalyzer = ANALYZER ? ANALYZER === 'true' : env.analyzer
	const envABabel = BABEL ? BABEL === 'true' : env.babel

	return buildWebpack({
		port: envPort || 5050,
		mode: envMode ?? 'development',
		paths: {
			output: path.resolve(__dirname, 'dist'),
			entry: path.resolve(__dirname, 'src', 'index.ts'),
			html: path.resolve(__dirname, 'src', 'index.pug'),
			public: path.resolve(__dirname, 'public'),
			src: path.resolve(__dirname, 'src'),
		},
		analyzer: envAnalyzer,
		platform: envPlatform ?? 'desktop',
		babel: envABabel,
	})
}
