import { RequestParameters} from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import osm2geojson from 'osm2geojson-lite';
import protocolPathParser from './utils/protocolPathParser';
import getProtocolData from './utils/getProtocolData';

async function convertOSM(params: {
	filename: string;
	options: osm2geojson.Options;
}): Promise<FeatureCollection> {
	const options = params.options || {};

	// Use the csv2geojson library to convert the CSV to GeoJSON
	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
		getProtocolData(params.filename).then((rawData) => {
			const newData: FeatureCollection = osm2geojson(
				rawData,
				options
			) as FeatureCollection;

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
const OSMProtocolHandler = async (params: RequestParameters) => {
	const parsedParams = protocolPathParser(params.url);

	const data = await convertOSM(parsedParams);
	if (data !== undefined) {
		return { data: data };
	}
	throw new Error('OSM File not found ' + parsedParams.filename);
};

export { OSMProtocolHandler, convertOSM };
