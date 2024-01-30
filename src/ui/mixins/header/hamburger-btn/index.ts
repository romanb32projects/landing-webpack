export const initHamburgerBtn = () => {
	const hamburgerBtn = document.querySelectorAll('.hamburger-btn');
	const mobileMenu = document.querySelector('#mobile-menu');

	hamburgerBtn.forEach((btn) => {
		btn.addEventListener('click', () => {
			mobileMenu?.classList.toggle('hidden');
			document.body.classList.toggle('sm:overflow-hidden');
		});
	});
};

initHamburgerBtn();
