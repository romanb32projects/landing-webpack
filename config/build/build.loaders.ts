import path from 'path'

import type { ModuleOptions } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { buildBabelLoader } from './babel/build.babel.loader'
import type { IBuildOptions } from './types'

export function buildLoaders({ mode, isBabel }: IBuildOptions): ModuleOptions['rules'] {
	const isDev = mode === 'development'

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
		generator: {
			filename: path.join('images', '[name].[contenthash][ext]'),
		},
	}

	const fontLoader = {
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
	}

	const svgLoader = {
		test: /\.svg$/,
		type: 'asset/resource',
		generator: {
			filename: path.join('icons', '[name].[contenthash][ext]'),
		},
	}

	const pugLoader = {
		test: /\.pug$/,
		loader: 'pug-loader',
	}

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			// style-loader - внедряет CSS в DOM
			isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
			// загрузчик CSS-файлов (в том числе интерпретирует @import и url() внутри CSS)
			'css-loader',
			// загрузчик CSS файлов для пост-обработки
			'postcss-loader',
			// 'sass-loader' - загрузчик файлов Sass/SCSS
			{
				loader: 'sass-loader',
				options: {
					additionalData: '@import "@/styles/index";',
				},
			},
		],
	}

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.ts?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: isDev, // без проверок типов - только компиляция
				},
			},
		],
	}

	const babelLoader = buildBabelLoader()

	return [
		assetLoader,
		fontLoader,
		svgLoader,
		pugLoader,
		scssLoader,
		isBabel ? babelLoader : tsLoader,
	]
}
