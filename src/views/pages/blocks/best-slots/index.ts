import { initSwiperSlider } from '@/utils';

const sliders = document.querySelectorAll<HTMLDivElement>('.slots-cards');

sliders.forEach(({ id }) => {
	if (id) {
		initSwiperSlider(`#${id}`, {
			loop: true,
		});
	}
});
