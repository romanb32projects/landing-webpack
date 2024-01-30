export const initCloseBtn = () => {
	const closeElements = document.querySelectorAll<HTMLDivElement>('.close-menu');
	const mobileMenu = document.querySelector<HTMLDivElement>('#mobile-menu');

	closeElements.forEach((el) => {
		el.addEventListener('click', () => {
			mobileMenu?.classList.toggle('hidden');
			document.body.classList.toggle('sm:overflow-hidden');
		});
	});
};

initCloseBtn();
