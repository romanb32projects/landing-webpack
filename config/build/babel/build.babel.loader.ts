export function buildBabelLoader() {
	return {
		test: /\.ts?$/,
		exclude: /node_modules/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env', '@babel/preset-typescript'],
			},
		},
	}
}
