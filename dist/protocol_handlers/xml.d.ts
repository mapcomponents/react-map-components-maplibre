import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
declare function convertXML(params: {
    filename: string;
    protocolId: string;
}): Promise<FeatureCollection>;
declare const XMLProtocolHandler: (params: RequestParameters, callback: ResponseCallback<any>) => {
    cancel: () => void;
};
export { XMLProtocolHandler, convertXML };
