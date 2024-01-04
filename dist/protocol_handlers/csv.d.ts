import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
import * as csv2geojsonType from './csv2geojson';
declare function convertCsv(filename: string, options: csv2geojsonType.csvOptions): Promise<FeatureCollection>;
declare const CSVProtocolHandler: (params: RequestParameters, callback: ResponseCallback<any>) => {
    cancel: () => void;
};
export { CSVProtocolHandler, convertCsv };
