function createPolygonAroundLine(line, offsetDistance) {
  function offsetPoint(point, angle, distance) {
    return [
      point[0] + Math.cos(angle) * distance,
      point[1] + Math.sin(angle) * distance
    ];
  }

  function angleBetweenPoints(p1, p2) {
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
  }

  const leftOffsetPoints = [];
  const rightOffsetPoints = [];

  for (let i = 0; i < line.length - 1; i++) {
    const p1 = line[i];
    const p2 = line[i + 1];
    const angle = angleBetweenPoints(p1, p2);
    const leftAngle = angle + Math.PI / 2;
    const rightAngle = angle - Math.PI / 2;

    leftOffsetPoints.push(offsetPoint(p1, leftAngle, offsetDistance));
    rightOffsetPoints.push(offsetPoint(p1, rightAngle, offsetDistance));
  }

  // Add the last point with the same angle as the second last segment
  const lastAngle = angleBetweenPoints(line[line.length - 2], line[line.length - 1]);
  const lastLeftAngle = lastAngle + Math.PI / 2;
  const lastRightAngle = lastAngle - Math.PI / 2;

  leftOffsetPoints.push(offsetPoint(line[line.length - 1], lastLeftAngle, offsetDistance));
  rightOffsetPoints.push(offsetPoint(line[line.length - 1], lastRightAngle, offsetDistance));

  // Combine points to form the polygon
  const polygon = [...leftOffsetPoints, ...rightOffsetPoints.reverse()];
  return { type: 'Polygon', coordinates: [polygon] };
}

export default createPolygonAroundLine;
