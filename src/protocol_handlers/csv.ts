import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
import * as csv2geojson from 'csv2geojson';
import protocolPathParser from './utils/protocolPathParser';
import getProtocolData from './utils/getProtocolData';


async function convertCsv(params: { filename: string, options: csv2geojson.csvOptions }): Promise<FeatureCollection> {

	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
	
		let options: csv2geojson.csvOptions= params.options || {};
		const extension = params.filename.substring(params.filename.length -3)
				
		if(extension === 'tsv'){
			options.delimiter = '\t';
		}

		getProtocolData(params.filename).then((rawData) => {
		// Use the csv2geojson library to convert the CSV to GeoJSON	
		console.log(options);
		csv2geojson.csv2geojson(rawData, options, (err: string, data: FeatureCollection) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	});

	return geojson;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CSVProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = protocolPathParser(params.url);

	convertCsv(parsedParams).then((data) => {
		if (data !== undefined) {
			callback(null, data, null, null);
		} else {
			callback(new Error('CSV not found'));
		}
	});
	return { cancel: () => {} };
};

export { CSVProtocolHandler, convertCsv };
