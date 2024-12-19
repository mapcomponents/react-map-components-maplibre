import { RequestParameters } from 'maplibre-gl';
import { FeatureCollection} from 'geojson';
import * as externParser from '@tmcw/togeojson';
import toGeoJSON from '../hooks/useGpx/lib/gpxConverter';
import protocolPathParser from './utils/protocolPathParser';
import getProtocolData from './utils/getProtocolData';

async function convertXML(params: {
	filename: string;
	protocolId: string;
}): Promise<FeatureCollection> {
	const geojson = await new Promise<FeatureCollection>((resolve, reject) => {
		getProtocolData(params.filename).then((rawData) => {
			const newData = () => {
				// use an extern converter for tcx files

				if (params.protocolId === 'tcx') {
					return externParser[params.protocolId](
						new DOMParser().parseFromString(rawData, 'text/xml')
					) as FeatureCollection;

					// use the projects gpxConverter function for gpx and kml files
				} else {
					return toGeoJSON[params.protocolId](
						new DOMParser().parseFromString(rawData, 'text/xml')
					) as FeatureCollection;
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
const XMLProtocolHandler = async (params: RequestParameters) => {
	const parsedParams = protocolPathParser(params.url);

	const data = await convertXML(parsedParams);
	if (data !== undefined) {
		return { data: data };
	}
	throw new Error('XML not found ' + parsedParams.filename);
};

export { XMLProtocolHandler, convertXML };
