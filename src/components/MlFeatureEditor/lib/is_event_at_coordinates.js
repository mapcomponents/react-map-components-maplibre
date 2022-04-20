/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
function isEventAtCoordinates(event, coordinates) {
  if (!event.lngLat) return false;
  return event.lngLat.lng === coordinates[0] && event.lngLat.lat === coordinates[1];
}

export default isEventAtCoordinates;
