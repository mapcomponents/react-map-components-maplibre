import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
import osm2geojson from 'osm2geojson-lite';
declare function convertOSM(params: {
    filename: string;
    options: osm2geojson.Options;
}): Promise<FeatureCollection>;
declare const OSMProtocolHandler: (params: RequestParameters, callback: ResponseCallback<any>) => {
    cancel: () => void;
};
export { OSMProtocolHandler, convertOSM };
