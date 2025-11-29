export const validateSortBy = (enumString: string[], sortBys: string): boolean => {
	if (!sortBys) {
		return true;
	}

	const sortByString = sortBys.split(',');
	for (let i = 0; i < sortByString.length; i++) {
		if (!enumString.includes(sortByString[i])) {
			return false;
		}
	}

	return true;
};

export const ConvertSortBy = (sortBys: string) => {
	if (!sortBys) {
		return {};
	}
	const result = {};

	const sortByString = sortBys.split(',');
	for (let i = 0; i < sortByString.length; i++) {
		const sortByEl = sortByString[i].split(':');
		result[sortByEl[0]] = sortByEl[1];
	}

	return result;
};
