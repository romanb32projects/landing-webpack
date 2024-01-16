import { initSlider } from '@/utils'

initSlider('#interface-cards', {
	isOnlyMobile: false,
	perView: 3,
	gap: 28,
	dragThreshold: false,
	breakpoints: {
		1536: {
			dragThreshold: 120,
		},
	},
})
