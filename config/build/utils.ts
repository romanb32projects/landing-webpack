export const getFullFileName = ({
	fileName = '[name]',
	isWithHash = true,
	ext,
}: {
	fileName?: string;
	isWithHash?: boolean;
	ext?: string;
}) => {
	const nameParts = [fileName];

	if (isWithHash) {
		nameParts.push('[contenthash]');
	}

	if (ext) {
		nameParts.push(ext);
	}

	return nameParts.join('.');
};
