/**
 * Normalizes URL parameter keys to uppercase to avoid duplicates when merging WMS parameters
 * @param params - Object or URLSearchParams to normalize
 * @param filterFn - Optional filter function to exclude certain key-value pairs
 * @returns Object with uppercase keys
 */
export function normalizeWmsParams(
	params: { [key: string]: string | number } | URLSearchParams | undefined,
	filterFn?: (key: string, value: string) => boolean
): { [key: string]: string | number } {
	if (!params) {
		return {};
	}

	const entries =
		params instanceof URLSearchParams ? Array.from(params.entries()) : Object.entries(params);

	const filtered = filterFn ? entries.filter(([key, value]) => filterFn(key, value)) : entries;

	return Object.fromEntries(filtered.map(([key, value]) => [key.toUpperCase(), value]));
}
