import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
declare function convertTopojson(params: {
    filename: string;
}): Promise<FeatureCollection>;
declare const TopojsonProtocolHandler: (params: RequestParameters, callback: ResponseCallback<any>) => {
    cancel: () => void;
};
export { TopojsonProtocolHandler, convertTopojson };
