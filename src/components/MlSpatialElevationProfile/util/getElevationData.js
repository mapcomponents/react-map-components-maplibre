import { useCallback } from 'react';
import { distance, lineOffset } from '@turf/turf';
import { polygon, lineString, featureCollection } from '@turf/helpers';

export default function getElevationData(_geojsonInfo, elevationFactor) {

    const createStep =  (x, y, z, x2, y2) => {
            //const summand = 0.0002;
            const line = lineString([
                [x, y],
                [x2, y2],
            ]);
            const offsetLine = lineOffset(line, 5, { units: 'meters' });
            const x3 = offsetLine.geometry.coordinates[0][0];
            const y3 = offsetLine.geometry.coordinates[0][1];
            const x4 = offsetLine.geometry.coordinates[1][0];
            const y4 = offsetLine.geometry.coordinates[1][1];
    
            return polygon(
                [
                    [
                        [x, y],
                        [x2, y2],
    
                        [x4, y4],
                        [x3, y3],
                        [x, y],
                    ],
                ],
                { height: z * elevationFactor }
            );
        };
    
        const lerp = (x, y, a) => x * (1 - a) + y * a;
		const points = [];

		_geojsonInfo.line.geometry.coordinates.forEach((coordinate, index) => {
			//const point = createPoint(coordinate[0],coordinate[1],coordinate[2]-min);
			//points.push(point);
			if (_geojsonInfo.line.geometry.coordinates[index + 1]) {
				const wayLength = distance(
					[coordinate[0], coordinate[1]],
					[
						_geojsonInfo.line.geometry.coordinates[index + 1][0],
						_geojsonInfo.line.geometry.coordinates[index + 1][1],
					],
					{ units: 'kilometers' }
				);
				let listLength = ~~((wayLength * 1000) / 10);
				listLength = listLength < 1 ? 1 : listLength;
				for (let i = 0; i < listLength; i++) {
					const x = lerp(
						_geojsonInfo.line.geometry.coordinates[index][0],
						_geojsonInfo.line.geometry.coordinates[index + 1][0],
						i / listLength
					);
					const y = lerp(
						_geojsonInfo.line.geometry.coordinates[index][1],
						_geojsonInfo.line.geometry.coordinates[index + 1][1],
						i / listLength
					);
					const z = lerp(
						_geojsonInfo.line.geometry.coordinates[index][2] - _geojsonInfo.min,
						_geojsonInfo.line.geometry.coordinates[index + 1][2] - _geojsonInfo.min,
						i / listLength
					);

					const x2 = lerp(
						_geojsonInfo.line.geometry.coordinates[index][0],
						_geojsonInfo.line.geometry.coordinates[index + 1][0],
						(i + 1) / listLength
					);
					const y2 = lerp(
						_geojsonInfo.line.geometry.coordinates[index][1],
						_geojsonInfo.line.geometry.coordinates[index + 1][1],
						(i + 1) / listLength
					);

					const point = createStep(x, y, z, x2, y2);
					points.push(point);
				}
			}
		});

		const output = featureCollection(points);

		return output;
  
}

