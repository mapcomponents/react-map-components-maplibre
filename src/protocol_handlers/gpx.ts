import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection, Geometry, GeometryCollection, Properties } from '@turf/turf';
import toGeoJSON from '../hooks/useGpx//lib/gpxConverter';


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

async function convertGPX(params: { filename: string }): Promise<FeatureCollection> {
	// Use the csv2geojson library to convert the CSV to GeoJSON
	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
		getData(params.filename).then((rawData) => {
			var newData: FeatureCollection;
			newData = toGeoJSON.gpx(
				new DOMParser().parseFromString(rawData, 'text/xml')
			) as FeatureCollection<Geometry | GeometryCollection, Properties>;

			if (!newData) {
				reject('Conversion failed');
			} else {
				resolve(newData);
			}
		});
	});

	return geojson;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GPXProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = parseParams(params.url);

	convertGPX(parsedParams).then((data) => {
		if (data !== undefined) {
			console.log(data);
			callback(null, data, null, null);
		} else {
			callback(new Error('CSV not found'));
		}
	});
	return { cancel: () => {} };
};

export { GPXProtocolHandler, convertGPX, getData, parseParams };
