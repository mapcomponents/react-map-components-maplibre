/**
 * Normalizes URL parameter keys to uppercase to avoid duplicates when merging WMS parameters
 * @param params - Object or URLSearchParams to normalize
 * @param filterFn - Optional filter function to exclude certain key-value pairs
 * @returns Object with uppercase keys
 */
export declare function normalizeWmsParams(params: {
    [key: string]: string | number;
} | URLSearchParams | undefined, filterFn?: (key: string, value: string) => boolean): {
    [key: string]: string | number;
};
//# sourceMappingURL=wmsUtils.d.ts.map