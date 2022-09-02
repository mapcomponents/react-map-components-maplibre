export default mapEventToBoundingBox;
/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
/**
 * Returns a bounding box representing the event's location.
 *
 * @param {Event} mapEvent - Mapbox GL JS map event, with a point properties.
 * @return {Array<Array<number>>} Bounding box.
 */
declare function mapEventToBoundingBox(mapEvent: Event, buffer?: number): Array<Array<number>>;
