/* eslint-disable no-undef */
const postcssPresetEnv = require('postcss-preset-env')

const tailwindcss = require('tailwindcss')

const autoprefixer = require('autoprefixer')

const tailwindConfig = require('./tailwind.config.js')

module.exports = {
	plugins: [
		// postcss-preset-env - плагин для PostCSS, который конвертирует современный CSS в код,
		// понятный большинству браузеров, включением необходимых полифилов
		postcssPresetEnv({ browsers: 'last 2 versions' }), // 'postcss-preset-env',
		tailwindcss,
		tailwindConfig,
		autoprefixer,
	],
}
