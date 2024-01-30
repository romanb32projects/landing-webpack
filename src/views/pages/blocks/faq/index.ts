export const initFaq = () => {
	const wrapper = document.querySelector('.questions');

	if (!wrapper) {
		return;
	}

	const questions = wrapper.querySelectorAll<HTMLDivElement>('.question');
	const questionContents = wrapper.querySelectorAll('.question-content');
	const questionDesktopContent = wrapper.querySelector('.question-desktop-content');
	const questionDesktopTitle = questionDesktopContent?.querySelector('h5');
	const questionDesktopText = questionDesktopContent?.querySelector('p');

	const changeStateOfQuestion = (questionEl: HTMLDivElement | null) => {
		if (!questionEl) {
			return;
		}

		const title = questionEl.querySelector('.question-title');
		const arrowWrapper = questionEl.querySelector('.arrow-wrapper');
		const questionContent = questionEl.querySelector('.question-content');

		if (arrowWrapper) {
			arrowWrapper.classList.toggle('text-grizzly-dark');
			arrowWrapper.classList.toggle('text-white');
			arrowWrapper.classList.toggle('rotate-90');
			arrowWrapper.classList.toggle('-rotate-90');

			const arrow = arrowWrapper.querySelector('.more-arrow');
			arrow?.classList.toggle('bg-white-light');
			arrow?.classList.toggle('bg-primary');
		}

		questionContent?.classList.toggle('hidden');
		title?.classList.toggle('font-semibold');
	};

	const itemHandler = (questionEl: HTMLDivElement | null) => {
		const questionContent = questionEl.querySelector('.question-content');
		const questionTitle = questionEl.querySelector('.question-title');

		changeStateOfQuestion(questionEl);
		questionEl.classList.toggle('bg-primary-brightest');

		if (questionEl.classList.contains('bg-primary-brightest')) {
			questionDesktopTitle.innerHTML = questionTitle.innerHTML;
			questionDesktopText.innerHTML = questionContent.innerHTML;
		} else {
			questionDesktopTitle.innerHTML = '';
			questionDesktopText.innerHTML = '';
		}

		questions.forEach((el) => {
			if (el !== questionEl && el.classList.contains('bg-primary-brightest')) {
				changeStateOfQuestion(el);

				el.classList.toggle('bg-primary-brightest');
			}
		});

		questionContents.forEach((el) => {
			if (el !== questionContent) {
				el.classList.add('hidden');
			}
		});
	};

	if (questions.length) {
		itemHandler(questions[0]);
	}

	questions.forEach((question) => {
		question.addEventListener('click', () => itemHandler(question));
	});
};

initFaq();
