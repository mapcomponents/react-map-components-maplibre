export default mouseEventPoint;
/**
 * Returns a Point representing a mouse event's position
 * relative to a containing element.
 *
 * @param {MouseEvent} mouseEvent
 * @param {Node} container
 * @returns {Point}
 */
declare function mouseEventPoint(mouseEvent: MouseEvent, container: Node): Point;
import Point from "@mapbox/point-geometry";
