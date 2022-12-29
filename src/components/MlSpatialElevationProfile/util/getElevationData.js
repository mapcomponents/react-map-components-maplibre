import { useCallback } from 'react';
import { distance, lineOffset } from '@turf/turf';
import { polygon, lineString, featureCollection } from '@turf/helpers';





export default function getElevationData(line, currentMap, layerName, elevationFactor) {

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
    

    const heights = line.geometry.coordinates.map((coordinate) => {
        return coordinate[2];
    });

    const min = Math.min(...heights);

    let max = Math.max(...heights) - min;

    max = max === 0 ? 1 : max;

    currentMap.setPaintProperty(layerName, 'fill-extrusion-color', [
        'interpolate',
        ['linear'],
        ['get', 'height'],
        0,
        'rgb(0,255,55)',
        max * elevationFactor,
        'rgb(255,0,0)',
    ]);
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const points = [];

    line.geometry.coordinates.forEach((coordinate, index) => {
        //const point = createPoint(coordinate[0],coordinate[1],coordinate[2]-min);
        //points.push(point);
        if (line.geometry.coordinates[index + 1]) {
            const wayLength = distance(
                [coordinate[0], coordinate[1]],
                [line.geometry.coordinates[index + 1][0], line.geometry.coordinates[index + 1][1]],
                { units: 'kilometers' }
            );
            let listLength = ~~((wayLength * 1000) / 10);
            listLength = listLength < 1 ? 1 : listLength;
            for (let i = 0; i < listLength; i++) {
                const x = lerp(
                    line.geometry.coordinates[index][0],
                    line.geometry.coordinates[index + 1][0],
                    i / listLength
                );
                const y = lerp(
                    line.geometry.coordinates[index][1],
                    line.geometry.coordinates[index + 1][1],
                    i / listLength
                );
                const z = lerp(
                    line.geometry.coordinates[index][2] - min,
                    line.geometry.coordinates[index + 1][2] - min,
                    i / listLength
                );

                const x2 = lerp(
                    line.geometry.coordinates[index][0],
                    line.geometry.coordinates[index + 1][0],
                    (i + 1) / listLength
                );
                const y2 = lerp(
                    line.geometry.coordinates[index][1],
                    line.geometry.coordinates[index + 1][1],
                    (i + 1) / listLength
                );

                const point = createStep(x, y, z, x2, y2);
                points.push(point);
            }
        }
    });

    const newData = featureCollection(points);
    console.log(newData)

    return newData
}

