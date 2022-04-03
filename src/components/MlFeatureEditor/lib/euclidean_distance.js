/**
 * Code from https://github.com/mapbox/mapbox-gl-draw
 * and licensed under ISC
 */
export default function(a, b) {
  const x = a.x - b.x;
  const y = a.y - b.y;
  return Math.sqrt((x * x) + (y * y));
}
