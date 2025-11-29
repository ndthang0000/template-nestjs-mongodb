function sortObject(obj: any): any {
	const sorted: Record<string, string> = {};
	const keys: string[] = Object.keys(obj);
	keys.sort();
	for (const key of keys) {
		sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, '+');
	}
	return sorted;
}

export default sortObject;
