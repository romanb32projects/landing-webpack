import path from 'path';

import type { Configuration } from 'webpack';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { buildDevServer } from './build.server';
import { buildLoaders } from './build.loaders';
import { buildPlugins } from './build.plugins';
import { buildResolvers } from './build.resolvers';
import type { IBuildOptions } from './types';

import { name } from '../../package.json';
import { getFullFileName } from './utils';

const mixinsDir = ['ui', 'mixins'];
const pageBlocksDir = ['views', 'pages', 'blocks'];

export function buildWebpack(options: IBuildOptions): Configuration {
	const { mode, paths, isMinimizeImage, isDeploy, isWithHash } = options;

	const isDev = mode === 'development';

	const outputFileName = getFullFileName({ ext: 'js', isWithHash });

	const config: Configuration = {
		mode: mode ?? 'development',
		entry: {
			main: paths.entry,
			header: path.resolve(paths.src, ...mixinsDir, 'header', 'index.ts'),
			feedback: path.resolve(paths.src, ...pageBlocksDir, 'feedback', 'index.ts'),
			subscribe: path.resolve(paths.src, ...pageBlocksDir, 'subscribe', 'index.ts'),
			faq: path.resolve(paths.src, ...pageBlocksDir, 'faq', 'index.ts'),
		},
		output: {
			path: paths.output,
			filename: `js/${outputFileName}`,
			clean: !isDev,
		},
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
		devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map', // 'inline-source-map'
		devServer: isDev ? buildDevServer(options) : undefined,
	};

	if (!isDev && isDeploy) {
		config.output.publicPath = `/${name}/`;
	}

	if (!isDev) {
		config.optimization = {
			minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],

			// splitChunks: {
			// 	chunks: 'all',
			// 	maxInitialRequests: Infinity,
			// 	minSize: 0,
			// 	cacheGroups: {
			// 		vendor: {
			// 			test: /[\\/]node_modules[\\/]/,
			// 			name(module: { context: string }) {
			// 				const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]

			// 				return packageName.replace('@', '')
			// 			},
			// 		},
			// 	},
			// },
		};

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
			);
		}
	}

	return config;
}
