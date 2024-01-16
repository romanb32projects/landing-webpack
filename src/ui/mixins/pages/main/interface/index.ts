import { initSlider } from '@/utils'

initSlider('#interface-cards', {
	isOnlyMobile: false,
	perView: 3,
	gap: 28,
	dragThreshold: false,
	breakpoints: {
		768: {
			perView: 1,
			dragThreshold: 120,
		},
		1024: {
			perView: 2,
		},
	},
})
