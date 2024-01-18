import { initSlider } from '@/utils'

initSlider('#advantages-cards', {
	breakpoints: {
		576: {
			perView: 1,
		},
		768: {
			perView: 2,
		},
		1024: {
			perView: 3,
		},
	},
})
