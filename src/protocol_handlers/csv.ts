import { RequestParameters } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import * as csv2geojsonType from './csv2geojson';
import * as csv2geojson from 'csv2geojson';
import protocolPathParser from './utils/protocolPathParser';
import getProtocolData from './utils/getProtocolData';

async function convertCsv(filename: string, options: csv2geojsonType.csvOptions ): Promise<FeatureCollection> {


	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
	
		const useOptions: csv2geojsonType.csvOptions= options || {};
	   	const extension = filename.substring(filename.length -3)

						
		if(extension === 'tsv'){
			options.delimiter = '\t';
		}

		getProtocolData(filename).then((rawData) => {
		// Use the csv2geojson library to convert the CSV to GeoJSON	
		
		csv2geojson.csv2geojson(rawData, useOptions, (err: string, data: FeatureCollection) => {
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
const CSVProtocolHandler = async (params: RequestParameters) => {
	const parsedParams = protocolPathParser(params.url);

	const data = await convertCsv(parsedParams.filename, parsedParams.options);
		if (data !== undefined) {
			return {data:data}
		}
			throw new Error('CSV not found ' + parsedParams.filename);
};

export { CSVProtocolHandler, convertCsv };
