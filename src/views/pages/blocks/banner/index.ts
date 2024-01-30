import type { Swiper } from 'swiper/types';

import { initSwiperSlider, baseBreakpoints } from '@/utils';

import './banner.scss';

const breakpoint = window.matchMedia(`(min-width:${baseBreakpoints.lg}px)`);

let mySwiper: Swiper | undefined;

const breakpointChecker = () => {
	if (breakpoint.matches) {
		mySwiper?.destroy(true, true);
	} else {
		return enableSwiper();
	}
};

const enableSwiper = () => {
	mySwiper = initSwiperSlider('.banner-cards', {
		navigation: false,
		slidesPerView: 3,
	});
};

breakpoint.onchange = breakpointChecker;
breakpointChecker();
