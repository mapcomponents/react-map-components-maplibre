/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
import * as Constants from "./constants";

/**
 * Returns GeoJSON for a Point representing the
 * vertex of another feature.
 *
 * @param {string} parentId
 * @param {Array<number>} coordinates
 * @param {string} path - Dot-separated numbers indicating exactly
 *   where the point exists within its parent feature's coordinates.
 * @param {boolean} selected
 * @return {GeoJSON} Point
 */
const create_vertex = function (parentId, coordinates, path, selected) {
  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: {
      meta: Constants.meta.VERTEX,
      parent: parentId,
      coord_path: path,
      active: selected
        ? Constants.activeStates.ACTIVE
        : Constants.activeStates.INACTIVE,
    },
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates,
    },
  };
};
export default create_vertex;
