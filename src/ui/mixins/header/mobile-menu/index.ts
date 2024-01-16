export const initCloseBtn = () => {
	const closeBtn = document.querySelector('#close-btn')
	const mobileMenu = document.querySelector('#mobile-menu')

	closeBtn.addEventListener('click', () => {
		mobileMenu?.classList.toggle('hidden')
		document.body.classList.toggle('overflow-hidden')
	})
}

initCloseBtn()
