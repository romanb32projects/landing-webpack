import { initSwiperSlider, baseBreakpoints } from '@/utils';

initSwiperSlider('.payments-cards', {
	loop: true,
	breakpoints: {
		[baseBreakpoints.xs]: {
			slidesPerView: 2,
			spaceBetween: 16,
		},
	},
});
