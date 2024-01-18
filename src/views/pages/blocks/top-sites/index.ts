import { initSlider } from '@/utils'

initSlider('#sites-cards', {
	isOnlyMobile: false,
	perView: 4,
	dragThreshold: false,
	breakpoints: {
		1536: {
			dragThreshold: 120,
		},
	},
})
