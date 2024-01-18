import path from 'path'

import { ProgressPlugin, DefinePlugin, HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import type { Configuration } from 'webpack'

import type { IBuildOptions } from './types'

export function buildPlugins({
	mode,
	paths,
	isAnalyzer,
	platform,
}: IBuildOptions): Configuration['plugins'] {
	const isDev = mode === 'development'

	const plugins: Configuration['plugins'] = [
		new ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(paths.views, 'pages', 'index.pug'),
			filename: 'index.html',
			favicon: path.resolve(paths.src, 'assets', 'favicons', 'favicon.ico'),
			minify: {
				removeComments: false,
			},
		}),
		// new Dotenv({
		// 	path: './.env',
		// 	safe: true,
		// }),
		new DefinePlugin({
			__ENV__: JSON.stringify(mode),
			__PLATFORM__: JSON.stringify(platform),
		}),
	]

	if (isDev) {
		plugins.push(
			new HotModuleReplacementPlugin(),
			// Выносит проверку типов в отдельный процесс: не нагружая сборку
			new ForkTsCheckerWebpackPlugin()
		)
	} else {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash].css',
				chunkFilename: 'css/[name].[contenthash].css',
			})
		)
	}

	if (isAnalyzer) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	return plugins
}
