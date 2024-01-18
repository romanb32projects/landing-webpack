import path from 'path'

import type { Configuration } from 'webpack'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import { buildDevServer } from './build.server'
import { buildLoaders } from './build.loaders'
import { buildPlugins } from './build.plugins'
import { buildResolvers } from './build.resolvers'
import type { IBuildOptions } from './types'

import { name } from '../../package.json'

export function buildWebpack(options: IBuildOptions): Configuration {
	const { mode, paths, isMinimizeImage, isDeploy } = options

	const isDev = mode === 'development'

	const config: Configuration = {
		mode: mode ?? 'development',
		entry: {
			main: paths.entry,
			header: path.resolve(paths.src, 'ui', 'mixins', 'header', 'index.ts'),
		},
		output: {
			path: paths.output,
			filename: 'js/[name].[contenthash].js',
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

	if (!isDev && isDeploy) {
		config.output.publicPath = `/${name}/`
	}

	if (!isDev) {
		config.optimization = {
			minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],

			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name(module: { context: string }) {
							const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

							return packageName.replace('@', '')
						},
					},
				},
			},
		}

		if (isMinimizeImage) {
			config.optimization.minimizer.push(
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
				})
			)
		}
	}

	return config
}
