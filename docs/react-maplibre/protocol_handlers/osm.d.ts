import { RequestParameters } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
declare function convertOSM(params: {
    filename: string;
    options: osm2geojson.Options;
}): Promise<FeatureCollection>;
declare const OSMProtocolHandler: (params: RequestParameters) => Promise<{
    data: FeatureCollection<import('geojson').Geometry, import('geojson').GeoJsonProperties>;
}>;
export { OSMProtocolHandler, convertOSM };
//# sourceMappingURL=osm.d.ts.map