import type { Configuration } from 'webpack'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

import { buildDevServer } from './build.server'
import { buildLoaders } from './build.loaders'
import { buildPlugins } from './build.plugins'
import { buildResolvers } from './build.resolvers'
import type { IBuildOptions } from './types'

import { name } from '../../package.json'

export function buildWebpack(options: IBuildOptions): Configuration {
	const { mode, paths } = options

	const isDev = mode === 'development'

	const config: Configuration = {
		mode: mode ?? 'development',
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			publicPath: `/${name}/`,
			clean: !isDev,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map', // 'inline-source-map'
		devServer: isDev ? buildDevServer(options) : undefined,
	}

	if (!isDev) {
		config.optimization = {
			minimizer: [
				new CssMinimizerPlugin(),
				new ImageMinimizerPlugin({
					minimizer: {
						implementation: ImageMinimizerPlugin.imageminMinify,
						options: {
							plugins: [
								['gifsicle', { interlaced: true }],
								['jpegtran', { progressive: true }],
								['optipng', { optimizationLevel: 5 }],
								['svgo', { name: 'preset-default' }],
							],
						},
					},
				}),
			],
		}
	}

	return config
}
