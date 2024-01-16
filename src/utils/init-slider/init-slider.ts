import type { Options } from '@glidejs/glide'
import Glide from '@glidejs/glide'

// import { getDimensions } from '../get-dimensions'

type TSliderOptions = Partial<Options> & { isOnlyMobile?: boolean }

export const initSlider = (containerName: string, options: TSliderOptions = {}) => {
	const mdWidth = 768

	const { isOnlyMobile = true, ...glideOptions } = options

	const slider = new Glide(containerName, {
		perView: 1,
		type: 'carousel',
		gap: 16,
		autoplay: 5000,
		...glideOptions,
	})

	const initWidth = window.innerWidth

	if (!isOnlyMobile) {
		slider.mount()
	} else if (initWidth <= mdWidth) {
		slider.mount()
	}

	// getDimensions(500, () => {
	// 	const currentWidth = window.innerWidth

	// 	if (currentWidth <= mdWidth) {
	// 		slider.mount()
	// 	} else if (!isOnlyMobile) {
	// 		// slider.disable()
	// 		slider.destroy()
	// 	}
	// })
}
