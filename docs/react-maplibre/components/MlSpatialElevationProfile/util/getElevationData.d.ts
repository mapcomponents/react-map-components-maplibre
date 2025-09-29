import { FeatureCollection } from 'geojson';
interface geometry {
    coordinates: Array<number>;
}
interface line {
    geometry: geometry;
}
interface _geojsonInfo {
    line: line;
    min: number;
}
export default function getElevationData(_geojsonInfo: _geojsonInfo, elevationFactor: number): FeatureCollection;
export {};
//# sourceMappingURL=getElevationData.d.ts.map