const createAndAppendMenuElement = (
	locale: string,
	localeLink: string,
	localeUpper: string,
	localeList: HTMLDivElement
) => {
	return new Promise((resolve) => {
		const listEl = document.createElement('li');
		const linkEl = document.createElement('a');

		const listElClasses = [
			'font-notoSans',
			'relative',
			'flex',
			'items-center',
			'gap-x-6',
			'rounded-lg',
			'p-2',
			'text-sm',
			'font-semibold',
			'text-white',
			'hover:bg-white',
			'hover:text-dark',
			'lg:hover:bg-transparent',
			'lg:hover:text-dark-grizzly',
			'lg:font-bold',
			'lg:rounded-none',
			'lg:text-dark',
		];
		listEl.classList.add(...listElClasses);

		listEl.setAttribute('id', `menu-item-lang-${locale}`);
		linkEl.setAttribute('href', localeLink);

		linkEl.append(localeUpper);
		listEl.append(linkEl);

		localeList?.append(listEl);

		resolve(localeList);
	});
};

export const initLocales = async () => {
	const links = document.querySelectorAll<HTMLLinkElement>('link[hreflang]');
	const switchers = document.querySelectorAll<HTMLDivElement>('.lang-switcher');
	const currentUrl = window.location.href;

	if (!links.length || links.length < 2) {
		switchers.forEach((el) => el.classList.add('hidden'));
		return;
	}

	switchers.forEach((el) => {
		const dropdownToggle = el.querySelector('a.dropdown-toggle');

		dropdownToggle?.addEventListener('click', (e) => {
			e.preventDefault();
		});
	});

	for (let i = 0; i < links.length; i++) {
		const link = links[i];
		const locale = link.getAttribute('hreflang');
		const localeLink = link.getAttribute('href');

		if (!locale || !localeLink) {
			continue;
		}

		const localeUpper = locale.toUpperCase();

		if (currentUrl.includes(localeLink)) {
			switchers.forEach((el) => {
				const dropdownToggle = el.querySelector('a.dropdown-toggle');

				dropdownToggle?.prepend(localeUpper);
			});
		}

		for (let s = 0; s < switchers.length; s++) {
			const switcher = switchers[s];
			const switcherMenu = switcher.querySelector<HTMLDivElement>('.dropdown-menu');

			await createAndAppendMenuElement(locale, localeLink, localeUpper, switcherMenu);
		}
	}
};

initLocales();
