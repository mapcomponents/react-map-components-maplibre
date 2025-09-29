import { RequestParameters } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
declare function convertXML(params: {
    filename: string;
    protocolId: string;
}): Promise<FeatureCollection>;
declare const XMLProtocolHandler: (params: RequestParameters) => Promise<{
    data: FeatureCollection<import('geojson').Geometry, import('geojson').GeoJsonProperties>;
}>;
export { XMLProtocolHandler, convertXML };
//# sourceMappingURL=xml.d.ts.map