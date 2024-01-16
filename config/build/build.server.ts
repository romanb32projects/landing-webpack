import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import type { IBuildOptions } from './types'

export function buildDevServer({ port, paths }: IBuildOptions): DevServerConfiguration {
	return {
		port: port ?? 5050,
		open: true,
		hot: true,
		historyApiFallback: true,
		watchFiles: {
			paths: paths.src, // ['src/**/*.*'],
			options: {
				usePolling: true,
			},
		},
	}
}
