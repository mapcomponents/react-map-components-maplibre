import { RequestParameters } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import * as csv2geojsonType from './csv2geojson';
declare function convertCsv(filename: string, options: csv2geojsonType.csvOptions): Promise<FeatureCollection>;
declare const CSVProtocolHandler: (params: RequestParameters) => Promise<{
    data: FeatureCollection<import('geojson').Geometry, import('geojson').GeoJsonProperties>;
}>;
export { CSVProtocolHandler, convertCsv };
//# sourceMappingURL=csv.d.ts.map