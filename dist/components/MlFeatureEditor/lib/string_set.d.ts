export default StringSet;
/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
declare function StringSet(items: any): void;
declare class StringSet {
    /**
     * Code from https://github.com/mapbox/mapbox-gl-draw
     * and licensed under ISC
     */
    constructor(items: any);
    _items: {};
    _nums: {};
    _length: any;
    add(x: any): StringSet;
    delete(x: any): StringSet;
    has(x: any): boolean;
    values(): any[];
    clear(): StringSet;
}
