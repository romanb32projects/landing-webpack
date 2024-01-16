const setRating = (stars: NodeListOf<Element>, rating: number) => {
	// const select = document.querySelector('.comment-rating-hidden')

	const classActive = 'text-yellow'
	const classInactive = 'text-grizzly'

	let currentRating = rating

	if (currentRating < 1) {
		// is clear
		for (let i = currentRating; i < stars.length; ++i) {
			const star = stars[i].querySelector('.star')
			star?.classList.toggle(classInactive)
		}

		return
	}

	if (currentRating > 5) {
		currentRating = 5
	}

	// set active stars before currentRating
	for (let i = 0; i < currentRating; i++) {
		const star = stars[i].querySelector('.star')

		if (!star?.classList.contains(classActive)) {
			star.classList.toggle(classInactive)
			star.classList.toggle(classActive)
		}
	}

	// set inactive stars after currentRating
	for (let i = currentRating; i < stars.length; i++) {
		const star = stars[i].querySelector('.star')

		if (star?.classList.contains(classActive)) {
			star.classList.toggle(classInactive)
			star.classList.toggle(classActive)
		}
	}
}

export const executeRating = () => {
	const stars = document.querySelectorAll('.comment-star')

	let currentRating

	stars.forEach((star, index) => {
		star.addEventListener('click', () => {
			currentRating = index + 1

			setRating(stars, currentRating)
		})
	})
}

executeRating()
