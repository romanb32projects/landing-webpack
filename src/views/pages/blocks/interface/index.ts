import { initSwiperSlider, baseBreakpoints } from '@/utils';

initSwiperSlider('.interface-cards', {
	loop: true,
	autoplay: false,
	breakpoints: {
		[baseBreakpoints.sm]: {
			slidesPerView: 1,
		},
		[baseBreakpoints.md]: {
			slidesPerView: 2,
		},
		[baseBreakpoints.xl]: {
			slidesPerView: 3,
		},
	},
});

export const initLightBoxes = () => {
	const modal = document.querySelector<HTMLDivElement>('#light-modal');
	const slideImages = document.querySelectorAll<HTMLImageElement>('.slide-image');
	const modalImg = modal.querySelector<HTMLImageElement>('#light-modal-img');
	const modalClose = modal.querySelectorAll<HTMLButtonElement>('.light-modal-close');

	slideImages.forEach((el) => {
		el.addEventListener('click', () => {
			modal.classList.toggle('hidden');
			modalImg.src = el.src;
			modalImg.alt = el.alt;
		});
	});

	modalClose.forEach((el) =>
		el.addEventListener('click', () => {
			modal.classList.toggle('hidden');
		})
	);
};

initLightBoxes();
