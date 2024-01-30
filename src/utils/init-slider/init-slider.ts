import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type TBreakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const baseBreakpoints: Record<TBreakpoints, number> = {
	xs: 320,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
};

export const initSwiperSlider = (containerName: string, options: SwiperOptions = {}) => {
	const { breakpoints, pagination, modules = [], ...swiperOptions } = options;

	const paginationOptions = typeof pagination === 'object' ? pagination : {};

	const swiperModules = [Navigation, Pagination, Autoplay];
	swiperModules.push(...modules);

	const swiper = new Swiper(containerName, {
		modules: swiperModules,
		slidesPerView: 4,
		spaceBetween: 24,
		autoplay: {
			delay: 5000,
		},
		pagination: {
			clickable: true,
			el: '.swiper-pagination',
			bulletClass: 'group w-3 h-3',
			bulletActiveClass: 'nav-active',
			renderBullet(index, className) {
				return `
					<button class="${className}">
						<span class="inline-block w-full h-full duration-200 rounded-full bg-primary-brightest hover:bg-primary group-[.nav-active]:bg-primary"></span> 
					</button>
				`;
			},
			...paginationOptions,
		},
		navigation: {
			nextEl: `.arrow-right-${containerName.replace(/[#.]/gm, '')}`,
			prevEl: `.arrow-left-${containerName.replace(/[#.]/gm, '')}`,
			disabledClass: 'nav-disabled',
		},
		breakpoints: {
			[baseBreakpoints.xs]: {
				slidesPerView: 1,
			},
			[baseBreakpoints.sm]: {
				slidesPerView: 2,
			},
			[baseBreakpoints.md]: {
				slidesPerView: 3,
			},
			[baseBreakpoints.xl]: {
				slidesPerView: 4,
				spaceBetween: 24,
			},
			...breakpoints,
		},
		...swiperOptions,
	});

	return swiper;
};
