type OmitKey<T, K extends keyof T> = {
	[P in keyof T as P extends K ? never : P]: T[P];
};

export default function omitKey<T extends Record<string, any>, K extends keyof T>(obj: T, key: K | K[]): OmitKey<T, K> {
	const result = { ...obj };
	const keysToOmit = Array.isArray(key) ? key : [key];

	keysToOmit.forEach(k => {
		delete result[k];
	});

	for (const key in result) {
		if (result[key] === undefined) {
			delete result[key]; // remove undefined values
		}
	}

	return result;
}
