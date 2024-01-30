import { initSwiperSlider, baseBreakpoints } from '@/utils';

initSwiperSlider('.advantages-cards', {
	loop: true,
	breakpoints: {
		[baseBreakpoints.xs]: {
			slidesPerView: 1,
		},
		[baseBreakpoints.sm]: {
			slidesPerView: 3,
		},
		[baseBreakpoints.md]: {
			slidesPerView: 4,
		},
		[baseBreakpoints.xl]: {
			slidesPerView: 5,
		},
	},
});
