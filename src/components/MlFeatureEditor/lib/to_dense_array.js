/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
/**
 * Derive a dense array (no `undefined`s) from a single value or array.
 *
 * @param {any} x
 * @return {Array<any>}
 */
function toDenseArray(x) {
  return [].concat(x).filter(y => y !== undefined);
}

export default toDenseArray;
