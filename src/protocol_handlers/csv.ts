import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection } from '@turf/turf';
import * as csv2geojson from 'csv2geojson';


const parseParams = (url: string) => {
	const urlParts = url.split('://');
	const csvUrl = urlParts[1];
	const csvParts = csvUrl.split('/');
	const filename = csvParts.join('/');

	return {
		filename,
	};
};

async function getData(path: string) {
	try {
		const response = await fetch(path);
		const rawData = await response.text();
		return rawData;
	} catch (error) {
		console.error('File could not be loaded: ', error);
		return error;
	}
}

async function convertCsv(params: { filename: string }): Promise<FeatureCollection> {

	// Use the csv2geojson library to convert the CSV to GeoJSON
	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {

		let options: csv2geojson.csvOptions= {};
		const extension = params.filename.substring(params.filename.length -3)
		
		if(extension === 'tsv'){
			options.delimiter = '\t';
		}

		getData(params.filename).then((rawData) => {
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
	const parsedParams = parseParams(params.url);

	convertCsv(parsedParams).then((data) => {
		if (data !== undefined) {
			callback(null, data, null, null);
		} else {
			callback(new Error('CSV not found'));
		}
	});
	return { cancel: () => {} };
};

export { CSVProtocolHandler, convertCsv, getData, parseParams };
