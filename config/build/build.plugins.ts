import path from 'path';

import { ProgressPlugin, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import type { Configuration } from 'webpack';

import type { IBuildOptions } from './types';
import { getFullFileName } from './utils';

export function buildPlugins({
	mode,
	paths,
	isAnalyzer,
	isWithHash,
	platform,
}: IBuildOptions): Configuration['plugins'] {
	const isDev = mode === 'development';

	const plugins: Configuration['plugins'] = [
		new ProgressPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve(paths.views, 'pages', 'index.pug'),
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
	];

	if (isDev) {
		plugins.push(
			new HotModuleReplacementPlugin(),
			// Выносит проверку типов в отдельный процесс: не нагружая сборку
			new ForkTsCheckerWebpackPlugin()
		);
	} else {
		const fileName = getFullFileName({ ext: 'css', isWithHash });

		plugins.push(
			new MiniCssExtractPlugin({
				filename: `css/${fileName}`,
				chunkFilename: `css/${fileName}`,
			})
		);
	}

	if (isAnalyzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}
