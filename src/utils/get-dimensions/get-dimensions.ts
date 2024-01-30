export const getDimensions = (delay: number, cb: () => void) => {
	let throttled = false;

	window.addEventListener('resize', function () {
		if (!throttled) {
			cb();

			throttled = true;
			setTimeout(function () {
				throttled = false;
			}, delay);
		}
	});
};
