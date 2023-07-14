import { useState } from 'react';
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

/**
 * Example usage:
 * getDataFromCSV({ filename: 'csv/restaurants.csv'}).then(
 * 	(result) => {
 * 		console.log(result);
 * 	}
 * );
 */
// function getDatafromCSV(params: { filename: string }) {
// 	// Define options for the csv2geojson library

// 	const [geojson, setGeojson] = useState<FeatureCollection>();

// 	let options: csv2geojson.csvOptions = {};

// 	fetch(params.filename)
// 		.then((response) => response.text())
// 		.then((rawData) => {
// 			csv2geojson.csv2geojson(rawData, options, (err: String, data: FeatureCollection) => {
// 				setGeojson(data);
// 				if (err) {
// 					console.log(err);
// 				}
// 			});
// 		});

// 	return new Promise((resolve, reject) => {
// 		try {
// 			resolve(geojson);
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CSVProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = parseParams(params.url);

	//getDatafromCSV(parsedParams).
	fetch(parsedParams.filename)
		.then((response) => response.text())
		.then((rawData) => {
			csv2geojson.csv2geojson(rawData, {}, (err: String, data: FeatureCollection) => {
				if (err) {
					console.log(err);
				}

				if (data !== null) {
				// See if the callback takes only an bufferArray or it can also take a JSON object 
				//	let binData: Uint8Array;

					callback(null, data, null, null);
				} else {
					callback(new Error('CSV not found'));
				}
			});
		});

	return { cancel: () => {} };
};

export { CSVProtocolHandler, parseParams };
