// Taken from https://stackoverflow.com/questions/19352921/how-to-use-direction-angle-and-speed-to-calculate-next-times-latitude-and-longi
// with small modifications to fit our usecase

/**
 * Returns the destination point from a given point, having travelled the given distance
 * on the given initial bearing.
 *
 * @param   {number} lat - initial latitude in decimal degrees (eg. 50.123)
 * @param   {number} lon - initial longitude in decimal degrees (e.g. -4.321)
 * @param   {number} distance - Distance travelled (metres).
 * @param   {number} bearing - Initial bearing (in degrees from north).
 * @returns {array} destination point as [longitude,latitude] (e.g. [50.123, -4.321])
 *
 * @example
 *     var p = destinationPoint(51.4778, -0.0015, 7794, 300.7); // 51.5135°N, 000.0983°W
 */
export default function destinationPoint(lon, lat, distance, bearing) {
  var radius = 6371e3; // (Mean) radius of earth

  var toRadians = function (v) {
    return (v * Math.PI) / 180;
  };
  var toDegrees = function (v) {
    return (v * 180) / Math.PI;
  };

  // sinφ2 = sinφ1·cosδ + cosφ1·sinδ·cosθ
  // tanΔλ = sinθ·sinδ·cosφ1 / cosδ−sinφ1·sinφ2
  // see mathforum.org/library/drmath/view/52049.html for derivation

  var δ = Number(distance) / radius; // angular distance in radians
  var θ = Number(bearing);

  var φ1 = toRadians(Number(lat));
  var λ1 = toRadians(Number(lon));

  var sinφ1 = Math.sin(φ1),
    cosφ1 = Math.cos(φ1);
  var sinδ = Math.sin(δ),
    cosδ = Math.cos(δ);
  var sinθ = Math.sin(θ),
    cosθ = Math.cos(θ);

  var sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ;
  var φ2 = Math.asin(sinφ2);
  var y = sinθ * sinδ * cosφ1;
  var x = cosδ - sinφ1 * sinφ2;
  var λ2 = λ1 + Math.atan2(y, x);

  return [((toDegrees(λ2) + 540) % 360) - 180, toDegrees(φ2)]; // normalise to −180..+180°
}
