export const initFaq = () => {
	const wrapper = document.querySelector('.questions')

	if (!wrapper) {
		return
	}

	const questions = wrapper.querySelectorAll('.question')
	const questionContents = wrapper.querySelectorAll('.question-content')
	const questionMobileContents = wrapper.querySelectorAll('.question-mobile-content')

	const changeStateOfQuestion = (questionEl: Element | null) => {
		if (!questionEl) {
			return
		}

		const title = questionEl.querySelector('.question-title')
		const arrowWrapper = questionEl.querySelector('.arrow-wrapper')

		if (arrowWrapper) {
			arrowWrapper.classList.toggle('text-grizzly-dark')
			arrowWrapper.classList.toggle('text-white')
			arrowWrapper.classList.toggle('rotate-90')
			arrowWrapper.classList.toggle('-rotate-90')

			const arrow = arrowWrapper.querySelector('.more-arrow')
			arrow?.classList.toggle('bg-white-light')
			arrow?.classList.toggle('bg-primary')
		}

		title?.classList.toggle('font-semibold')
		// title?.classList.toggle('basis-9/12')
	}

	questions.forEach((question) => {
		question.addEventListener('click', () => {
			const questionNumber = question.getAttribute('data-question')
			const questionContent = questionContents.item(Number(questionNumber))
			const questionMobileContent = question.querySelector('.question-mobile-content')

			changeStateOfQuestion(question)
			question.classList.toggle('bg-primary-brightest')

			questions.forEach((el) => {
				if (el !== question && el.classList.contains('bg-primary-brightest')) {
					changeStateOfQuestion(el)

					el.classList.toggle('bg-primary-brightest')
				}
			})

			questionContents.forEach((el) => {
				if (el !== questionContent) {
					el.classList.add('hidden')
				}
			})
			questionContent?.classList.toggle('hidden')

			questionMobileContents.forEach((el) => {
				if (el !== questionMobileContent) {
					el.classList.add('hidden')
				}
			})
			questionMobileContent?.classList.toggle('hidden')
		})
	})
}

initFaq()
