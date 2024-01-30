export const initSubscribeBlock = () => {
	const form = document.querySelector<HTMLFormElement>('#subscribe-form');
	const button = form.querySelector<HTMLButtonElement>('#subscribe-btn');

	button.addEventListener('click', () => {
		form.reset();
	});
};

initSubscribeBlock();
