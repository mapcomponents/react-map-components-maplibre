import { LngLat, RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection, Geometry, GeometryCollection, Properties } from '@turf/turf';
import toGeoJSON from '../hooks/useGpx/lib/gpxConverter'; 
import * as externParser from '@tmcw/togeojson';	




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

async function convertXML(params: { filename: string }): Promise<FeatureCollection> {
	// Use the csv2geojson library to convert the CSV to GeoJSON
	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
		getData(params.filename).then((rawData) => {
            const extension = params.filename.substring(params.filename.length -3)
			
			var newData: FeatureCollection;
			newData = externParser[extension](
				new DOMParser().parseFromString(rawData, 'text/xml')
			) as FeatureCollection<Geometry | GeometryCollection, Properties>;

// if(extension === 'tcx'){
// newData.features.forEach((el)=> 
// el.geometry.coordinates.forEach((coord: number[])=>coord.splice(2) ))
// }

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
const XMLProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = parseParams(params.url);

	convertXML(parsedParams).then((data) => {
		if (data !== undefined) {
			console.log(data);
			callback(null, data, null, null);
		} else {
			callback(new Error('CSV not found'));
		}
	});
	return { cancel: () => {} };
};

export { XMLProtocolHandler, convertXML, getData, parseParams };
