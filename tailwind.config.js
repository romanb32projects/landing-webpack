module.exports = {
	content: ['./src/**/*.pug', './dist/*.html'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#621fbe',
					light: '#e1d1f1',
					brightest: '#f3eff9',
				},
				dark: {
					DEFAULT: '#121212',
					grizzly: '#4e4e53',
				},
				white: {
					DEFAULT: '#faf8fb',
					opacity: '#f2eff833',
					light: '#f0eff8',
					standard: '#fff',
				},
				grizzly: {
					DEFAULT: '#acacb5',
					dark: '#9797b2',
				},
				yellow: {
					DEFAULT: '#f9b15c',
					light: '#e3ae6f',
				},
			},
			fontFamily: {
				notoSans: ['"NotoSans"', 'Arial', 'sans-serif'],
			},
			letterSpacing: {
				wide: '0.75rem',
				widest: '1.5rem',
			},
			spacing: {
				'50%': '50%',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
}
