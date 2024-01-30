import { baseBreakpoints } from '@/utils';

export const initDropdownMenuItems = () => {
	const dropdownMenuItems = document.querySelectorAll<HTMLDivElement>('.dropdown');

	dropdownMenuItems.forEach((item) => {
		const link = item.querySelector('a.dropdown-toggle');
		const dropdownMenu = item.querySelector('.dropdown-menu');
		const dropdownArrow = item.querySelector('.dropdown-arrow');

		link?.addEventListener('click', (e) => {
			e.preventDefault();

			const currentWindowWidth = window.innerWidth;

			if (currentWindowWidth < baseBreakpoints.xl) {
				const isWithoutResponsive = link.classList.contains('without-responsive');

				if (!isWithoutResponsive) {
					link.classList.toggle('bg-white');

					link.classList.toggle('text-white');
					link.classList.toggle('text-dark');
				}

				dropdownArrow?.classList.toggle('rotate-180');

				dropdownMenu?.classList.toggle(isWithoutResponsive ? 'invisible' : 'hidden');
			}
		});
	});
};

initDropdownMenuItems();
