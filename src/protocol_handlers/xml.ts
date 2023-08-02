import { RequestParameters, ResponseCallback } from 'maplibre-gl';
import { FeatureCollection, Geometry, GeometryCollection, Properties } from '@turf/turf';
import * as externParser from '@tmcw/togeojson';
import toGeoJSON from '../hooks/useGpx/lib/gpxConverter';
import protocolPathParser from './utils/protocolPathParser';
import getProtocolData from './utils/getProtocolData';


async function convertXML(params: { filename: string }): Promise<FeatureCollection> {

	const extension = params.filename.substring(params.filename.length - 3);

	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
		getProtocolData(params.filename).then((rawData) => {
			var newData = () => {

				// use an extern converter for tcx files

				if (extension === 'tcx') {
					return externParser[extension](
						new DOMParser().parseFromString(rawData, 'text/xml')
					) as FeatureCollection<Geometry | GeometryCollection, Properties>;

				// use the projects gpxConverter function for gpx and kml files

				} else {
					return toGeoJSON[extension](
						new DOMParser().parseFromString(rawData, 'text/xml')
					) as FeatureCollection<Geometry | GeometryCollection, Properties>;
				}
			};

			if (!newData()) {
				reject('Conversion failed');
			} else {
				resolve(newData());
			}
		});
	});

	return geojson;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const XMLProtocolHandler = (params: RequestParameters, callback: ResponseCallback<any>) => {
	const parsedParams = protocolPathParser(params.url);

	convertXML(parsedParams).then((data) => {
		if (data !== undefined) {
			callback(null, data, null, null);
		} else {
			callback(new Error('XML not found'));
		}
	});
	return { cancel: () => {} };
};

export { XMLProtocolHandler, convertXML};
