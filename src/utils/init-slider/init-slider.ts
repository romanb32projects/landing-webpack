import type { Options } from '@glidejs/glide'
import Glide from '@glidejs/glide'

// import { getDimensions } from '../get-dimensions'

type TSliderOptions = Partial<Options> & { isOnlyMobile?: boolean }

export const initSlider = (containerName: string, options: TSliderOptions = {}) => {
	const mdWidth = 768
	const lgWidth = 1024

	const { isOnlyMobile = true, breakpoints, ...glideOptions } = options

	const slider = new Glide(containerName, {
		perView: 1,
		type: 'carousel',
		gap: 16,
		autoplay: 5000,
		breakpoints: {
			[mdWidth]: {
				perView: 1,
			},
			[lgWidth]: {
				perView: 2,
			},
			...breakpoints,
		},
		classes: {
			direction: {
				ltr: 'glide--ltr',
				rtl: 'glide--rtl',
			},
			nav: {
				active: 'nav-active',
			},
			swipeable: 'glide--swipeable',
			dragging: 'glide--dragging',
			type: {
				slider: 'glide--slider',
				carousel: 'glide--carousel',
			},
			slide: {
				active: 'glide__slide--active',
				clone: 'glide__slide--clone',
			},
			arrow: {
				disabled: 'glide__arrow--disabled',
			},
		},
		...glideOptions,
	})

	const initWidth = window.innerWidth

	if (!isOnlyMobile) {
		slider.mount()
	} else if (initWidth <= lgWidth) {
		slider.mount()
	}

	// getDimensions(500, () => {
	// 	const currentWidth = window.innerWidth

	// 	if (currentWidth <= lgWidth) {
	// 		slider.mount()
	// 	} else if (!isOnlyMobile) {
	// 		// slider.disable()
	// 		slider.destroy()
	// 	}
	// })
}
