import { RequestParameters } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
declare function convertTopojson(params: {
    filename: string;
}): Promise<FeatureCollection>;
declare const TopojsonProtocolHandler: (params: RequestParameters) => Promise<{
    data: FeatureCollection<import('geojson').Geometry, import('geojson').GeoJsonProperties>;
}>;
export { TopojsonProtocolHandler, convertTopojson };
//# sourceMappingURL=topojson.d.ts.map