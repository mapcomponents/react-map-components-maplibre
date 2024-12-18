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
export default function getElevationData(_geojsonInfo: _geojsonInfo, elevationFactor: number): import("@turf/turf").FeatureCollection<import("geojson").Geometry, {
    [name: string]: any;
}>;
export {};
